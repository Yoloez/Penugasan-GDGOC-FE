import { Book } from "../types";

export const addToRecentlyViewed = (book: Book) => {
  try {
    // Get existing recently viewed books
    const saved = localStorage.getItem("recentlyViewed");
    let recentBooks: Book[] = saved ? JSON.parse(saved) : [];

    // Remove the book if it already exists
    recentBooks = recentBooks.filter((b) => b._id !== book._id);

    // Add the new book at the beginning
    recentBooks.unshift(book);

    // Keep only the last 8 books
    recentBooks = recentBooks.slice(0, 8);

    // Save back to localStorage
    localStorage.setItem("recentlyViewed", JSON.stringify(recentBooks));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("recentlyViewedUpdated"));
  } catch (error) {
    console.error("Error saving to recently viewed:", error);
  }
};

export const getRecentlyViewed = (): Book[] => {
  try {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading recently viewed:", error);
    return [];
  }
};
