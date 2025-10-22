import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Zap } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Zap className="w-8 h-8 text-primary animate-neon-pulse" />
            <span className="text-2xl font-orbitron font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              CYBERRACE
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-orbitron font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'text-primary shadow-neon-cyan' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/garage" 
              className={`font-orbitron font-medium transition-all duration-300 ${
                isActive('/garage') 
                  ? 'text-primary shadow-neon-cyan' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              GARAGE
            </Link>
            <Link 
              to="/customize" 
              className={`font-orbitron font-medium transition-all duration-300 ${
                isActive('/customize') 
                  ? 'text-primary shadow-neon-cyan' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              CUSTOMIZE
            </Link>
            <Link 
              to="/race" 
              className={`font-orbitron font-medium transition-all duration-300 ${
                isActive('/race') 
                  ? 'text-primary shadow-neon-cyan' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              RACE
            </Link>
            
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
