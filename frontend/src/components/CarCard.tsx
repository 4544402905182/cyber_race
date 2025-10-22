import { Car } from "@/data/cars";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface CarCardProps {
  car: Car;
  onSelect?: () => void;
}

const CarCard = ({ car, onSelect }: CarCardProps) => {
  return (
    <div className="group relative bg-card border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-neon-cyan animate-slide-up">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold text-primary">{car.brand}</h3>
          <p className="text-muted-foreground">{car.model}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Speed</span>
              <span className="text-primary font-orbitron">{car.specs.speed}</span>
            </div>
            <Progress value={car.specs.speed} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Acceleration</span>
              <span className="text-primary font-orbitron">{car.specs.acceleration}</span>
            </div>
            <Progress value={car.specs.acceleration} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Handling</span>
              <span className="text-secondary font-orbitron">{car.specs.handling}</span>
            </div>
            <Progress value={car.specs.handling} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Durability</span>
              <span className="text-accent font-orbitron">{car.specs.durability}</span>
            </div>
            <Progress value={car.specs.durability} className="h-2" />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-2xl font-orbitron font-bold text-primary">{car.price}</span>
          {onSelect && (
            <Button onClick={onSelect} className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron shadow-neon-cyan">
              SELECT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
