CREATE TABLE IF NOT EXISTS issues (
  n INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  season TEXT NOT NULL,
  color TEXT NOT NULL,
  blurb TEXT NOT NULL,
  label TEXT NOT NULL UNIQUE,
  current INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS authors (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  place TEXT NOT NULL,
  bio TEXT NOT NULL,
  network INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  dek TEXT NOT NULL DEFAULT '',
  pull_title TEXT,
  author TEXT NOT NULL,
  place TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  section TEXT NOT NULL,
  issue TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  motif TEXT NOT NULL DEFAULT 'terrace',
  image TEXT,
  native TEXT,
  native_lang TEXT,
  coords_lat REAL,
  coords_lng REAL,
  content TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_section ON posts(section);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_issue ON posts(issue);

CREATE TABLE IF NOT EXISTS letters (
  file_slug TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  author TEXT NOT NULL,
  section TEXT NOT NULL,
  post_slug TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  wechat TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_letters_post ON letters(post_slug);
CREATE INDEX IF NOT EXISTS idx_letters_author ON letters(author);
