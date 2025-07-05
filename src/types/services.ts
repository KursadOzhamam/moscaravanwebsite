export interface ServiceDetails {
  title: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  details: ServiceDetails;
} 