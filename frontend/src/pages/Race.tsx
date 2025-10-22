import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Clock, Users } from "lucide-react";
import { toast } from "sonner";

interface RaceEvent {
  id: string;
  name: string;
  track: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  duration: string;
  players: number;
  reward: string;
}

const raceEvents: RaceEvent[] = [
  {
    id: "1",
    name: "Neon Circuit Sprint",
    track: "Tokyo Expressway",
    difficulty: "Easy",
    duration: "3 min",
    players: 8,
    reward: "0.1 ETH"
  },
  {
    id: "2",
    name: "Downtown Drift Challenge",
    track: "Neo Seoul Streets",
    difficulty: "Medium",
    duration: "5 min",
    players: 12,
    reward: "0.25 ETH"
  },
  {
    id: "3",
    name: "Cyber Highway Rush",
    track: "Shanghai Skyway",
    difficulty: "Hard",
    duration: "7 min",
    players: 16,
    reward: "0.5 ETH"
  },
  {
    id: "4",
    name: "Championship Finals",
    track: "Global Circuit",
    difficulty: "Expert",
    duration: "10 min",
    players: 24,
    reward: "2.0 ETH"
  }
];

const Race = () => {
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  
  const handleJoinRace = (raceId: string, raceName: string) => {
    setSelectedRace(raceId);
    toast.success(`Joined ${raceName}! Preparing vehicle...`);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 border-green-500';
      case 'Medium': return 'text-yellow-500 border-yellow-500';
      case 'Hard': return 'text-orange-500 border-orange-500';
      case 'Expert': return 'text-red-500 border-red-500';
      default: return 'text-primary border-primary';
    }
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />

      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 z-10 bg-background/95 backdrop-blur-sm flex items-center justify-center pt-20">
        <div className="text-center animate-slide-up">
          <div className="mb-8">
            <Trophy className="w-24 h-24 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-orbitron font-black mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                COMING SOON
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground mb-2">
              Race Arena Under Development
            </p>
            <p className="text-lg text-muted-foreground">
              High-stakes encrypted racing competitions are being prepared
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Badge className="text-lg px-6 py-2 font-orbitron bg-primary/20 text-primary border-primary">
              🔒 FHE-Powered Racing System
            </Badge>
            <p className="text-sm text-muted-foreground max-w-md">
              Experience fully private race results with Fully Homomorphic Encryption technology
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-orbitron font-black mb-4">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              RACE ARENA
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Compete in high-stakes races and earn rewards
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-orbitron font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Total Wins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-2xl font-orbitron font-bold">8.5</p>
                  <p className="text-sm text-muted-foreground">ETH Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-2xl font-orbitron font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Races Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-orbitron font-bold">#143</p>
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Race Events */}
        <div className="space-y-6">
          <h2 className="text-3xl font-orbitron font-bold">
            <span className="text-primary">AVAILABLE RACES</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {raceEvents.map((race) => (
              <Card key={race.id} className="border-primary/20 hover:border-primary transition-all hover:shadow-neon-cyan">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-orbitron text-xl">{race.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>{race.track}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={`font-orbitron ${getDifficultyColor(race.difficulty)}`}>
                      {race.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-orbitron font-bold text-primary">{race.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Players</p>
                      <p className="font-orbitron font-bold text-secondary">{race.players}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reward</p>
                      <p className="font-orbitron font-bold text-accent">{race.reward}</p>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 font-orbitron shadow-neon-cyan"
                    onClick={() => handleJoinRace(race.id, race.name)}
                    disabled={selectedRace === race.id}
                  >
                    {selectedRace === race.id ? (
                      <>
                        <Zap className="mr-2 w-4 h-4 animate-pulse" />
                        PREPARING...
                      </>
                    ) : (
                      <>
                        <Trophy className="mr-2 w-4 h-4" />
                        JOIN RACE
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Race;
