-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- to create the books table and seed it with demo data.

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  bookstore_name text,
  state text not null,
  city text not null,
  genre text not null,
  format text not null check (format in ('Digital', 'Print')),
  price numeric(10, 2) not null,
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  description text not null,
  cover_color text not null,
  created_at timestamptz not null default now()
);

alter table public.books enable row level security;

create policy "Books are publicly readable"
  on public.books
  for select
  using (true);

insert into public.books
  (title, author, bookstore_name, state, city, genre, format, price, rating, review_count, description, cover_color)
values
  ('The Bookseller of Fitzroy', 'Margaret Ellery', 'Brunswick St Books', 'VIC', 'Fitzroy', 'Literary Fiction', 'Print', 24.99, 4.6, 128,
   'A quietly devastating novel about a secondhand bookshop owner in inner Melbourne who inherits more than just stock when her estranged mother passes away. Ellery''s prose lingers on the small rituals of shelving, selling, and letting go.',
   '#7B3F61'),
  ('Sandstone Streets', 'Daniel Okafor', 'King Street Readers', 'NSW', 'Newtown', 'Poetry', 'Digital', 12.50, 4.2, 64,
   'A collection of urban poetry mapping the terraces and laneways of inner-Sydney life, from share-house dinners to 4am train platforms. Okafor''s voice is sharp, funny, and unflinchingly local.',
   '#2F6B4F'),
  ('Brisbane River Nights', 'Priya Chandran', 'Riverside Book Co.', 'QLD', 'West End', 'Mystery', 'Print', 22.50, 4.4, 97,
   'When a body is found drifting near the Go Between Bridge, off-duty detective Nadia Reyes is pulled into a case that reaches deep into Brisbane''s riverside underworld. A tense, humid thriller steeped in local landmarks.',
   '#A5462B'),
  ('Fremantle Tides', 'Callum Reeve', 'Cappuccino Strip Books', 'WA', 'Fremantle', 'Historical Fiction', 'Print', 19.00, 4.7, 156,
   'Spanning three generations of a fishing family on the Fremantle waterfront, this saga traces the port town''s transformation from whaling outpost to creative hub. Rich with salt air and hard-won hope.',
   '#3E5C76'),
  ('Adelaide Hills Almanac', 'Sophie Nguyen', 'Hills Hollow Books', 'SA', 'Stirling', 'Memoir', 'Digital', 9.99, 3.9, 41,
   'Part memoir, part seasonal diary, this collection follows a year of foraging, winemaking, and slow living in the Adelaide Hills. Nguyen writes with warmth about starting over in unfamiliar soil.',
   '#6B7D3D'),
  ('Cradle Mountain Ghosts', 'Elsie Rowntree', 'Mountain Peak Bookshop', 'TAS', 'Sheffield', 'Fantasy', 'Print', 23.50, 4.8, 203,
   'A haunting fantasy set among the peaks and button-grass plains of the Tasmanian highlands, where an apprentice ranger discovers the mountain''s oldest stories are still very much alive. Atmospheric and beautifully strange.',
   '#8B4A62'),
  ('Carlton Corner Stories', 'Marcus Iversen', 'Lygon Street Letters', 'VIC', 'Carlton', 'Short Stories', 'Digital', 14.00, 4.1, 52,
   'A dozen interlinked stories set around a single Carlton street corner over the course of one Melbourne winter — a laundromat, a milk bar, a share house, and the lives that pass through them.',
   '#4A5859'),
  ('Harbourside Whispers', 'Isla Fitzgerald', 'The Corso Bookstore', 'NSW', 'Manly', 'Romance', 'Print', 18.50, 4.5, 89,
   'Two rival ferry-route booksellers, one harbour, and a slow-burn romance that unfolds over a summer of sea mist, secondhand paperbacks, and Sunday markets on the Manly esplanade.',
   '#9C5B2E'),
  ('Sunshine Coast Secrets', 'Ben Whitlock', 'Hastings Street Reads', 'QLD', 'Noosa', 'Thriller', 'Digital', 16.75, 4.3, 73,
   'A missing persons case in a sleepy Noosa holiday town unravels a decades-old secret buried beneath the dunes. Whitlock builds tension with the slow menace of an off-season beach town.',
   '#2E5C5C'),
  ('Margaret River Vines', 'Isabelle Cho', 'Vine & Verse Books', 'WA', 'Margaret River', 'Contemporary Fiction', 'Print', 21.00, 4.6, 110,
   'A vineyard inheritance forces three estranged siblings back to the family property in Margaret River for one harvest season. Warm, wry, and soaked in the scent of crushed grapes.',
   '#6E2C3B');
