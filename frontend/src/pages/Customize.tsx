import { useState } from "react";
import Navigation from "@/components/Navigation";
import { carParts, CarPart, cars, Car } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ShoppingCart, Car as CarIcon, Lock } from "lucide-react";
import { toast } from "sonner";
import bmwImage from "@/assets/bmw-rally.jpg";
import mercedesImage from "@/assets/mercedes-rally.jpg";
import hondaImage from "@/assets/honda-rally.jpg";
import { encryptCarSetup } from "@/lib/fhe";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";

const Customize = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [selectedParts, setSelectedParts] = useState<CarPart[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });
  
  const categories = ['engine', 'transmission', 'suspension', 'wheels', 'body', 'exhaust'] as const;
  
  const getPartsByCategory = (category: string) => {
    return carParts.filter(part => part.category === category);
  };
  
  const handleAddPart = (part: CarPart) => {
    const existingPart = selectedParts.find(p => p.category === part.category);
    if (existingPart) {
      setSelectedParts(selectedParts.map(p => p.category === part.category ? part : p));
      toast.info(`Replaced ${existingPart.name} with ${part.name}`);
    } else {
      setSelectedParts([...selectedParts, part]);
      toast.success(`Added ${part.name}`);
    }
  };
  
  const handleRemovePart = (part: CarPart) => {
    setSelectedParts(selectedParts.filter(p => p.id !== part.id));
    toast.info(`Removed ${part.name}`);
  };
  
  const getTotalBoost = () => {
    return selectedParts.reduce((acc, part) => {
      return {
        speed: acc.speed + (part.boost.speed || 0),
        acceleration: acc.acceleration + (part.boost.acceleration || 0),
        handling: acc.handling + (part.boost.handling || 0),
        durability: acc.durability + (part.boost.durability || 0),
      };
    }, { speed: 0, acceleration: 0, handling: 0, durability: 0 });
  };

  const getCarImage = (car: Car) => {
    // Map image path to imported asset
    if (car.image.includes("mercedes")) return mercedesImage;
    if (car.image.includes("honda")) return hondaImage;
    return bmwImage;
  };

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
    setSelectedParts([]);
    toast.success(`Selected ${car.brand} ${car.model}`);
  };

  const handlePurchaseUpgrades = async () => {
    if (selectedParts.length === 0) {
      toast.error("Please select at least one upgrade");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      // First check if user is registered
      toast.info("Checking registration status...");
      const isRegistered = await publicClient?.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'isRegistered',
        args: [address]
      });

      console.log("Registration check:", isRegistered);

      // If not registered, register first
      if (!isRegistered) {
        toast.info("🎮 Registering as driver...");

        const registerTx = await writeContractAsync({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'registerDriver'
        });

        toast.info("⏳ Waiting for registration confirmation...");

        if (publicClient) {
          await publicClient.waitForTransactionReceipt({
            hash: registerTx,
            confirmations: 2
          });
        }

        toast.success("✅ Registered successfully!");
      }

      // Map selected parts to encrypted values matching contract parameters
      const getPartBoost = (category: string, stat: string) => {
        const part = selectedParts.find(p => p.category === category);
        return part?.boost[stat as keyof typeof part.boost] || 0;
      };

      // Contract expects: engineTuning, suspensionBalance, aeroPackage, tireCompound, boostResponse, brakeBias, tractionControl
      const engineTuning = getPartBoost('engine', 'speed') + getPartBoost('engine', 'acceleration');
      const suspensionBalance = getPartBoost('suspension', 'handling') + getPartBoost('suspension', 'durability');
      const aeroPackage = getPartBoost('body', 'speed') + getPartBoost('body', 'handling');
      const tireCompound = getPartBoost('wheels', 'handling') + getPartBoost('wheels', 'speed');
      const boostResponse = getPartBoost('transmission', 'acceleration'); // Maps to boost/acceleration response
      const brakeBias = getPartBoost('wheels', 'durability'); // Maps to brake durability/bias
      const tractionControl = getPartBoost('transmission', 'handling'); // Maps to traction/handling

      toast.info("🔒 Encrypting setup with FHE...");

      // Encrypt car setup using FHE
      const encryptedData = await encryptCarSetup(
        engineTuning,
        suspensionBalance,
        aeroPackage,
        tireCompound,
        boostResponse,
        brakeBias,
        tractionControl,
        CONTRACT_ADDRESS,
        address
      );

      toast.success("✅ Setup encrypted successfully!");

      console.log("Encrypted Setup:", encryptedData);
      console.log("Selected Car Model:", `${selectedCar.brand} ${selectedCar.model}`);

      // Submit to smart contract
      toast.info("📝 Submitting to smart contract...");
      const carModel = `${selectedCar.brand} ${selectedCar.model}`;

      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'updateCarSetup',
        args: [
          carModel,
          encryptedData.engineTuningHandle as `0x${string}`,
          encryptedData.suspensionBalanceHandle as `0x${string}`,
          encryptedData.aeroPackageHandle as `0x${string}`,
          encryptedData.tireCompoundHandle as `0x${string}`,
          encryptedData.boostResponseHandle as `0x${string}`,
          encryptedData.brakeBiasHandle as `0x${string}`,
          encryptedData.tractionControlHandle as `0x${string}`,
          encryptedData.signature as `0x${string}`
        ]
      });

      console.log("Transaction hash:", tx);
      setTxHash(tx);
      toast.info(`⏳ Transaction submitted: ${tx.substring(0, 10)}...`);
      toast.info("Waiting for confirmation...");

      // Wait for transaction receipt
      if (publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: tx,
          confirmations: 2
        });

        console.log("Transaction receipt:", receipt);

        if (receipt.status === 'success') {
          toast.success(`🎉 Car setup updated successfully!`);
          toast.success(`View on Etherscan: https://sepolia.etherscan.io/tx/${tx}`);
        } else {
          toast.error(`❌ Transaction failed! Check Etherscan for details.`);
          toast.error(`https://sepolia.etherscan.io/tx/${tx}`);
        }
      }

    } catch (error) {
      console.error("Failed to encrypt setup:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to encrypt car setup: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalBoost = getTotalBoost();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-orbitron font-black mb-4">
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              CUSTOMIZE
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your car and upgrade with performance parts
          </p>
        </div>

        {/* Car Selection Section */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <CarIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-orbitron font-bold">SELECT YOUR CAR</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {cars.map(car => (
              <Card
                key={car.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedCar.id === car.id
                    ? 'border-primary shadow-neon-cyan'
                    : 'border-primary/20 hover:border-primary/50'
                }`}
                onClick={() => handleSelectCar(car)}
              >
                <CardContent className="p-4">
                  <img
                    src={getCarImage(car)}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-24 object-cover rounded mb-3"
                  />
                  <h3 className="font-orbitron font-bold text-sm mb-1">{car.brand}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{car.model}</p>
                  <Badge variant="outline" className="text-xs font-orbitron text-primary border-primary">
                    {car.price}
                  </Badge>
                  <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                    <div className="text-muted-foreground">SPD: {car.specs.speed}</div>
                    <div className="text-muted-foreground">ACC: {car.specs.acceleration}</div>
                    <div className="text-muted-foreground">HND: {car.specs.handling}</div>
                    <div className="text-muted-foreground">DUR: {car.specs.durability}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron">{selectedCar.brand} {selectedCar.model}</CardTitle>
                <CardDescription>Current Configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  key={selectedCar.id}
                  src={getCarImage(selectedCar)}
                  alt={`${selectedCar.brand} ${selectedCar.model}`}
                  className="w-full rounded-lg"
                />

                <div className="space-y-2">
                  <h4 className="font-orbitron font-bold text-primary">Base Stats</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Speed: {selectedCar.specs.speed}</div>
                    <div>Acceleration: {selectedCar.specs.acceleration}</div>
                    <div>Handling: {selectedCar.specs.handling}</div>
                    <div>Durability: {selectedCar.specs.durability}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-orbitron font-bold text-primary">Performance Boost</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-primary" />
                      <span>Speed: +{totalBoost.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-primary" />
                      <span>Accel: +{totalBoost.acceleration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-secondary" />
                      <span>Handle: +{totalBoost.handling}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-accent" />
                      <span>Durability: +{totalBoost.durability}</span>
                    </div>
                  </div>
                </div>
                
                {selectedParts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-orbitron font-bold text-primary">Installed Parts</h4>
                    <div className="space-y-2">
                      {selectedParts.map(part => (
                        <div key={part.id} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                          <span>{part.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemovePart(part)}
                            className="h-6 px-2"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary/90 font-orbitron shadow-neon-cyan"
                  onClick={handlePurchaseUpgrades}
                  disabled={isSubmitting || selectedParts.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Lock className="mr-2 w-4 h-4 animate-pulse" />
                      ENCRYPTING...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      PURCHASE UPGRADES
                    </>
                  )}
                </Button>
                {selectedParts.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Parts will be encrypted with FHE before submission
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Parts Selection */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="engine" className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="font-orbitron uppercase">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {getPartsByCategory(category).map(part => (
                    <Card key={part.id} className="border-primary/20 hover:border-primary transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="font-orbitron">{part.name}</CardTitle>
                            <CardDescription className="uppercase text-xs">{part.category}</CardDescription>
                          </div>
                          <Badge variant="outline" className="font-orbitron text-primary border-primary">
                            {part.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 text-sm">
                            {part.boost.speed && (
                              <span className="flex items-center gap-1">
                                <ArrowUp className="w-3 h-3 text-primary" />
                                Speed +{part.boost.speed}
                              </span>
                            )}
                            {part.boost.acceleration && (
                              <span className="flex items-center gap-1">
                                <ArrowUp className="w-3 h-3 text-primary" />
                                Accel +{part.boost.acceleration}
                              </span>
                            )}
                            {part.boost.handling && (
                              <span className="flex items-center gap-1">
                                <ArrowUp className="w-3 h-3 text-secondary" />
                                Handle +{part.boost.handling}
                              </span>
                            )}
                            {part.boost.durability && (
                              <span className="flex items-center gap-1">
                                <ArrowUp className="w-3 h-3 text-accent" />
                                Dura +{part.boost.durability}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => handleAddPart(part)}
                            className="bg-primary hover:bg-primary/90 font-orbitron"
                            disabled={selectedParts.some(p => p.id === part.id)}
                          >
                            {selectedParts.some(p => p.id === part.id) ? 'INSTALLED' : 'INSTALL'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
