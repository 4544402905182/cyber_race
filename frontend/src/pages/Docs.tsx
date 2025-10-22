import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Rocket, Wrench, Trophy, Lock, Sparkles, Calendar } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Documentation
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Welcome to EncryptedRally Championship - The future of privacy-preserving racing
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Wrench className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl text-white">Current Development Stage</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    Early Access Demo - Car Customization Preview
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Alpha v0.1
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                We are currently in the early development phase. At this stage, you can experience the core car
                customization mechanics including:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Selecting from 9 high-performance racing cars (BMW, Mercedes-AMG, Porsche, Honda)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Customizing 6 core components: Engine, Transmission, Suspension, Wheels, Body Kit, Exhaust</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Experiencing FHE (Fully Homomorphic Encryption) technology for private car setup storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Testing wallet integration and on-chain transactions on Sepolia testnet</span>
                </li>
              </ul>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-yellow-400">ℹ️</span>
                  <span>
                    This is a demonstration version. Your car configurations are encrypted and stored on-chain,
                    but racing mechanics are not yet implemented.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="bg-slate-800" />

          {/* Future Development - Cars & Parts */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl text-white">Upcoming: Massive Expansion</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    Hundreds of cars and thousands of parts
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  Phase 2
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Our vision is to create the most comprehensive and realistic virtual racing customization
                experience, mirroring real-world motorsport tuning:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏎️</span>
                    Expanded Car Roster
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Rally legends (Subaru WRX, Lancia Delta, Ford Focus RS)</li>
                    <li>• GT supercars (Ferrari, Lamborghini, McLaren)</li>
                    <li>• Drift machines (Nissan GT-R, Toyota Supra, Mazda RX-7)</li>
                    <li>• Electric hypercars (Rimac, Lucid, Porsche Taycan)</li>
                    <li>• Classic muscle cars and vintage racers</li>
                  </ul>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔧</span>
                    Extensive Parts Catalog
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Authentic manufacturer parts (Brembo, Öhlins, Recaro)</li>
                    <li>• Performance tiers (Street, Sport, Race, Pro, Elite)</li>
                    <li>• Aerodynamic components (Spoilers, diffusers, splitters)</li>
                    <li>• Interior upgrades (Seats, steering wheels, roll cages)</li>
                    <li>• Livery customization and wrap designs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-purple-400">✨</span>
                  <span>
                    <strong className="text-white">Realistic Tuning:</strong> Every part will have real-world
                    performance characteristics. Weight reduction vs. durability, power vs. reliability,
                    handling vs. comfort - just like actual motorsport engineering.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="bg-slate-800" />

          {/* Future Development - Racing System */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl text-white">Upcoming: Competitive Racing</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    FHE-powered private races with Chainlink VRF
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                  Phase 3
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                The championship racing system will introduce competitive gameplay where drivers can compete
                for rewards while keeping their car setups completely private:
              </p>

              <div className="space-y-3 mt-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">FHE-Encrypted Racing</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Your car setup remains encrypted throughout the race. Competitors cannot see your
                        tuning choices, creating true strategic depth. Race results are computed on encrypted
                        data using Zama's Fully Homomorphic Encryption technology.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Chainlink VRF Randomness</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Fair and verifiable random race conditions powered by Chainlink VRF. Weather, track
                        temperature, tire wear, and mechanical randomness ensure every race is unique and
                        unpredictable - just like real motorsport.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Rewards & Rare Parts</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Win races to earn cryptocurrency rewards and unlock exclusive limited-edition parts.
                        Top performers in championship seasons will receive NFT trophies and access to
                        ultra-rare tuning components unavailable in the regular market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-6">
                <div className="text-center p-4 bg-slate-950/50 border border-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-1">Daily Races</div>
                  <div className="text-xs text-slate-500">Quick matches, instant rewards</div>
                </div>
                <div className="text-center p-4 bg-slate-950/50 border border-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 mb-1">Tournaments</div>
                  <div className="text-xs text-slate-500">Multi-stage competitions</div>
                </div>
                <div className="text-center p-4 bg-slate-950/50 border border-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-1">Championships</div>
                  <div className="text-xs text-slate-500">Seasonal leaderboards</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="bg-slate-800" />

          {/* Roadmap Timeline */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white">Development Roadmap</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-0.5 h-full bg-slate-800"></div>
                  </div>
                  <div className="pb-6">
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 mb-2">
                      Current
                    </Badge>
                    <h4 className="font-semibold text-white mb-1">Phase 1: Core Customization (Alpha)</h4>
                    <p className="text-sm text-slate-400">FHE encryption, wallet integration, basic car tuning</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div className="w-0.5 h-full bg-slate-800"></div>
                  </div>
                  <div className="pb-6">
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2">
                      Next
                    </Badge>
                    <h4 className="font-semibold text-white mb-1">Phase 2: Content Expansion (Beta)</h4>
                    <p className="text-sm text-slate-400">100+ cars, 1000+ parts, realistic physics engine</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-2">
                      Future
                    </Badge>
                    <h4 className="font-semibold text-white mb-1">Phase 3: Competitive Launch</h4>
                    <p className="text-sm text-slate-400">Racing system, Chainlink VRF, tournaments, NFT rewards</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">
              Follow our progress on GitHub and join our community to stay updated on development milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
