export type AustralianState = 'VIC' | 'NSW' | 'QLD' | 'WA' | 'SA' | 'TAS';

export type BookFormat = 'Digital' | 'Print';

export type Book = {
  id: string;
  title: string;
  author: string;
  state: AustralianState;
  bookstoreName: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  coverColor: string;
};

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function buildMapEmbedUrl(lat: number, lng: number): string {
  const delta = 0.005;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${
    lat - delta
  }%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;
}
