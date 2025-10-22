import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
import { toast } from "sonner";

const Garage = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  
  const handleSelectCar = (carId: string) => {
    setSelectedCar(carId);
    toast.success("Car selected! Ready to customize.");
    setTimeout(() => {
      navigate("/customize");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-orbitron font-black mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              YOUR GARAGE
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Select your legendary racing machine
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onSelect={() => handleSelectCar(car.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Garage;
