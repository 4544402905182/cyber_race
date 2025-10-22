export interface Car {
  id: string;
  brand: string;
  model: string;
  image: string;
  specs: {
    speed: number;
    acceleration: number;
    handling: number;
    durability: number;
  };
  price: string;
}

export const cars: Car[] = [
  {
    id: "bmw-m3",
    brand: "BMW",
    model: "M3 Competition",
    image: "/src/assets/bmw-rally.jpg",
    specs: {
      speed: 92,
      acceleration: 88,
      handling: 85,
      durability: 80
    },
    price: "2.5 ETH"
  },
  {
    id: "bmw-m4",
    brand: "BMW",
    model: "M4 CSL",
    image: "/src/assets/bmw-rally.jpg",
    specs: {
      speed: 94,
      acceleration: 90,
      handling: 88,
      durability: 82
    },
    price: "2.8 ETH"
  },
  {
    id: "bmw-m5",
    brand: "BMW",
    model: "M5 CS",
    image: "/src/assets/bmw-rally.jpg",
    specs: {
      speed: 95,
      acceleration: 91,
      handling: 86,
      durability: 84
    },
    price: "3.2 ETH"
  },
  {
    id: "mercedes-amg-gt",
    brand: "Mercedes-AMG",
    model: "GT Black Series",
    image: "/src/assets/mercedes-rally.jpg",
    specs: {
      speed: 97,
      acceleration: 93,
      handling: 89,
      durability: 85
    },
    price: "3.5 ETH"
  },
  {
    id: "mercedes-amg-c63",
    brand: "Mercedes-AMG",
    model: "C63 S E Performance",
    image: "/src/assets/mercedes-rally.jpg",
    specs: {
      speed: 93,
      acceleration: 90,
      handling: 87,
      durability: 83
    },
    price: "2.9 ETH"
  },
  {
    id: "mercedes-amg-a45",
    brand: "Mercedes-AMG",
    model: "A45 S",
    image: "/src/assets/mercedes-rally.jpg",
    specs: {
      speed: 90,
      acceleration: 94,
      handling: 91,
      durability: 82
    },
    price: "2.3 ETH"
  },
  {
    id: "honda-civic-type-r",
    brand: "Honda",
    model: "Civic Type R",
    image: "/src/assets/honda-rally.jpg",
    specs: {
      speed: 88,
      acceleration: 92,
      handling: 93,
      durability: 86
    },
    price: "2.0 ETH"
  },
  {
    id: "honda-nsx",
    brand: "Honda",
    model: "NSX Type S",
    image: "/src/assets/honda-rally.jpg",
    specs: {
      speed: 96,
      acceleration: 95,
      handling: 94,
      durability: 87
    },
    price: "4.0 ETH"
  },
  {
    id: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3 RS",
    image: "/src/assets/mercedes-rally.jpg",
    specs: {
      speed: 98,
      acceleration: 94,
      handling: 96,
      durability: 86
    },
    price: "4.5 ETH"
  }
];

export interface CarPart {
  id: string;
  name: string;
  category: 'engine' | 'transmission' | 'suspension' | 'wheels' | 'body' | 'exhaust';
  boost: {
    speed?: number;
    acceleration?: number;
    handling?: number;
    durability?: number;
  };
  price: string;
}

export const carParts: CarPart[] = [
  {
    id: "turbo-v1",
    name: "Stage 1 Turbocharger",
    category: "engine",
    boost: { speed: 5, acceleration: 3 },
    price: "0.5 ETH"
  },
  {
    id: "turbo-v2",
    name: "Stage 2 Turbocharger",
    category: "engine",
    boost: { speed: 8, acceleration: 5 },
    price: "0.8 ETH"
  },
  {
    id: "turbo-v3",
    name: "Stage 3 Turbocharger",
    category: "engine",
    boost: { speed: 12, acceleration: 8 },
    price: "1.2 ETH"
  },
  {
    id: "trans-sport",
    name: "Sport Transmission",
    category: "transmission",
    boost: { acceleration: 5, handling: 3 },
    price: "0.6 ETH"
  },
  {
    id: "trans-race",
    name: "Racing Transmission",
    category: "transmission",
    boost: { acceleration: 8, handling: 5 },
    price: "1.0 ETH"
  },
  {
    id: "susp-sport",
    name: "Sport Suspension",
    category: "suspension",
    boost: { handling: 5, durability: 2 },
    price: "0.4 ETH"
  },
  {
    id: "susp-race",
    name: "Racing Suspension",
    category: "suspension",
    boost: { handling: 8, durability: 4 },
    price: "0.7 ETH"
  },
  {
    id: "wheels-sport",
    name: "Sport Wheels",
    category: "wheels",
    boost: { handling: 4, speed: 2 },
    price: "0.3 ETH"
  },
  {
    id: "wheels-carbon",
    name: "Carbon Fiber Wheels",
    category: "wheels",
    boost: { handling: 6, speed: 4, acceleration: 2 },
    price: "0.9 ETH"
  },
  {
    id: "body-aero",
    name: "Aerodynamic Body Kit",
    category: "body",
    boost: { speed: 6, handling: 3 },
    price: "0.5 ETH"
  },
  {
    id: "body-carbon",
    name: "Carbon Fiber Body Kit",
    category: "body",
    boost: { speed: 8, handling: 5, acceleration: 3 },
    price: "1.5 ETH"
  },
  {
    id: "exhaust-sport",
    name: "Sport Exhaust",
    category: "exhaust",
    boost: { speed: 3, acceleration: 2 },
    price: "0.3 ETH"
  },
  {
    id: "exhaust-titanium",
    name: "Titanium Exhaust System",
    category: "exhaust",
    boost: { speed: 5, acceleration: 4 },
    price: "0.8 ETH"
  }
];
