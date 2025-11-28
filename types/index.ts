export type NoiseLevel = 'Quiet' | 'Moderate' | 'Loud';
export type Crowdedness = 'Low' | 'Medium' | 'High';
export type Category = 'indoor' | 'outdoor' | 'quiet' | 'cafe' | 'library';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StudyPlace {
  id: string;
  name: string;
  location: string;
  description: string;
  photo: string;
  rating: number;
  reviewCount: number;
  noiseLevel: NoiseLevel;
  crowdedness: Crowdedness;
  seatingAvailable: boolean;
  amenities: {
    wifi: boolean;
    outlets: boolean;
    foodNearby: boolean;
  };
  categories: Category[];
  reviews: Review[];
}

export interface FilterOptions {
  noiseLevel?: NoiseLevel;
  crowdedness?: Crowdedness;
  hasFood?: boolean;
  hasOutlets?: boolean;
  isIndoor?: boolean;
  seatingAvailable?: boolean;
}

