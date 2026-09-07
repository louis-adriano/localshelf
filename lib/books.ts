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

export async function fetchBookById(id: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRowToBook(data as BookRow) : null;
}
