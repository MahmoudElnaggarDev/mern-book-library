import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookDetails from "../components/BookDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const BookList = () => {
  const [books, setBooks] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [books, user]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 md:gap-10 py-24 px-16 md:px-22 lg:px-32 lg:pt-32 bg-[#eeeeee]">
        {books &&
          books.map((book) => <BookDetails key={book._id} book={book} />)}
      </div>
    </>
  );
};

export default BookList;
