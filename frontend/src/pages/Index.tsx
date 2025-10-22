import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Car, Wrench, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-racing.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="CyberRace Championship" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-4 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-orbitron font-black">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-neon-pulse">
              CYBERRACE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Enter the ultimate blockchain racing championship. Customize legendary cars, compete in high-stakes races, and dominate the leaderboard.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="/garage">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron text-lg px-8 shadow-neon-cyan">
                <Zap className="mr-2" />
                START RACING
              </Button>
            </Link>
            <Link to="/customize">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-orbitron text-lg px-8 shadow-neon-magenta">
                <Wrench className="mr-2" />
                CUSTOMIZE
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CHAMPIONSHIP FEATURES
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-primary/20 rounded-lg p-8 hover:border-primary hover:shadow-neon-cyan transition-all duration-300">
              <Car className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-orbitron font-bold mb-3">LEGENDARY CARS</h3>
              <p className="text-muted-foreground">
                Collect and own iconic rally cars from BMW, Mercedes, Honda and more. Each vehicle is a unique NFT on the blockchain.
              </p>
            </div>
            
            <div className="bg-card border border-secondary/20 rounded-lg p-8 hover:border-secondary hover:shadow-neon-magenta transition-all duration-300">
              <Wrench className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-orbitron font-bold mb-3">DEEP CUSTOMIZATION</h3>
              <p className="text-muted-foreground">
                Upgrade engines, transmissions, suspension, wheels and more. Every part affects performance and appearance.
              </p>
            </div>
            
            <div className="bg-card border border-accent/20 rounded-lg p-8 hover:border-accent hover:shadow-neon-purple transition-all duration-300">
              <Trophy className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-orbitron font-bold mb-3">COMPETITIVE RACING</h3>
              <p className="text-muted-foreground">
                Compete in high-stakes races, climb the leaderboard, and earn cryptocurrency rewards for your victories.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold">
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              READY TO RACE?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your wallet and enter the cyberpunk racing revolution.
          </p>
          <Link to="/garage">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-orbitron text-lg px-12 shadow-neon-cyan">
              ENTER GARAGE
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
