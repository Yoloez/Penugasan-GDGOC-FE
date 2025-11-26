import { Book, BookDetailResponse } from "../types";

const API_BASE_URL = "http://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1";

/**
 * Fetch detail buku berdasarkan ID
 * @param bookId - ID buku yang ingin diambil detailnya
 * @returns Promise<Book | null>
 */
export const fetchBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/book/${bookId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch book with id: ${bookId}`);
    }

    const data: BookDetailResponse = await response.json();
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};

/**
 * Fetch multiple books by their IDs
 * @param bookIds - Array of book IDs
 * @returns Promise<Book[]>
 */
export const fetchBooksByIds = async (bookIds: string[]): Promise<Book[]> => {
  try {
    const promises = bookIds.map((id) => fetchBookById(id));
    const results = await Promise.all(promises);
    return results.filter((book): book is Book => book !== null);
  } catch (error) {
    console.error("Error fetching multiple books:", error);
    return [];
  }
};
