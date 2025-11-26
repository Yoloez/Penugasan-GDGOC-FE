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

export interface BookDetailResponse {
  book: Book;
}

// Helper function to convert Book to Product
export const convertBookToProduct = (book: Book): Product => {
  const priceString = book.details.price.replace(/[^0-9]/g, "");
  const priceIDR = parseInt(priceString) || 0;
  const priceUSD = priceIDR / 16654; 

  return {
    id: book._id,
    title: book.title,
    price: priceUSD,
    availability: "In Stock",
    description: book.summary,
    pages: parseInt(book.details.total_pages) || 0,
    format: book.details.format,
    isbn: book.details.isbn,
    published: book.details.published_date,
    categories: [book.category.name, ...book.tags.map((tag) => tag.name)],
    images: [book.cover_image],
  };
};
