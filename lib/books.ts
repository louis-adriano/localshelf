import { StateFilter } from '../components/StateFilterChips';
import { AustralianState, Book } from '../data/books';
import { supabase } from './supabase';

type BookRow = {
  id: string;
  title: string;
  author: string;
  bookstore_name: string;
  state: AustralianState;
  price: number;
  rating: number;
  review_count: number;
  description: string;
  cover_color: string;
};

const BOOK_COLUMNS =
  'id, title, author, bookstore_name, state, price, rating, review_count, description, cover_color';

function mapRowToBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    state: row.state,
    bookstoreName: row.bookstore_name,
    price: row.price,
    rating: row.rating,
    reviewCount: row.review_count,
    description: row.description,
    coverColor: row.cover_color,
  };
}

export async function fetchBooks(options: {
  state?: StateFilter;
  search?: string;
}): Promise<Book[]> {
  let query = supabase.from('books').select(BOOK_COLUMNS);

  if (options.state && options.state !== 'All') {
    query = query.eq('state', options.state);
  }

  const term = options.search?.trim();
  if (term) {
    const pattern = `%${term}%`;
    query = query.or(
      `title.ilike.${pattern},author.ilike.${pattern},bookstore_name.ilike.${pattern}`,
    );
  }

  const { data, error } = await query.order('title', { ascending: true });
  if (error) throw error;
  return (data as BookRow[]).map(mapRowToBook);
}

export async function fetchFeaturedBooks(limit: number = 3): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .order('rating', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as BookRow[]).map(mapRowToBook);
}

export async function fetchNewArrivals(limit: number = 3): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .order('id', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as BookRow[]).map(mapRowToBook);
}

export async function fetchTrendingBooks(limit: number = 4): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .order('review_count', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as BookRow[]).map(mapRowToBook);
}

export async function fetchBooksUnderPrice(
  maxPrice: number,
  limit: number = 4,
): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .lt('price', maxPrice)
    .order('price', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data as BookRow[]).map(mapRowToBook);
}

export async function fetchBooksByIds(ids: string[]): Promise<Book[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).in('id', ids);
  if (error) throw error;

  const books = (data as BookRow[]).map(mapRowToBook);
  const byId = new Map(books.map((book) => [book.id, book]));
  return ids.map((id) => byId.get(id)).filter((book): book is Book => book !== undefined);
}

export async function fetchBookById(id: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRowToBook(data as BookRow) : null;
}

const COVER_COLOR_PALETTE = ['#6B3A5C', '#2E5C3A', '#8B4A2A', '#2A4A6B', '#3A5C5C'];

function pickRandomCoverColor(): string {
  return COVER_COLOR_PALETTE[Math.floor(Math.random() * COVER_COLOR_PALETTE.length)];
}

function generateBookId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function insertBook(input: {
  title: string;
  author: string;
  price: number;
  state: AustralianState;
  description: string;
  bookstoreName?: string;
}): Promise<void> {
  const { error } = await supabase.from('books').insert({
    id: generateBookId(),
    title: input.title,
    author: input.author,
    price: input.price,
    state: input.state,
    description: input.description,
    bookstore_name: input.bookstoreName?.trim() || 'Independent Seller',
    cover_color: pickRandomCoverColor(),
    rating: 0,
    review_count: 0,
  });
  if (error) throw error;
}
