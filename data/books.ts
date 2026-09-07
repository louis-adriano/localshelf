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
