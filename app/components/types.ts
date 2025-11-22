export interface Product {
  id: string;
  title: string;
  price: number;
  availability: string;
  description: string;
  pages: number;
  format: string;
  isbn: string;
  published: string;
  categories: string[];
  images: string[];
}

export interface BookAuthor {
  name: string;
  url: string;
}

export interface BookCategory {
  name: string;
  url: string;
}

export interface BookDetails {
  no_gm: string;
  isbn: string;
  price: string;
  total_pages: string;
  size: string;
  published_date: string;
  format: string;
}

export interface BookTag {
  name: string;
  url: string;
}

export interface BookBuyLink {
  store: string;
  url: string;
}

export interface Book {
  _id: string;
  title: string;
  cover_image: string;
  author: BookAuthor;
  category: BookCategory;
  summary: string;
  details: BookDetails;
  tags: BookTag[];
  buy_links: BookBuyLink[];
  publisher: string;
}

export interface ApiResponse {
  books: Book[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
