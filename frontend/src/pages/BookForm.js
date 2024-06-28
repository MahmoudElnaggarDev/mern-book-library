import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useAuthContext } from "../hooks/useAuthContext";

const BookForm = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [pages, setPages] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const book = { name, author, cover, pages, done: false, read: 0 };

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("لابد من تسجيل الدخول أولًا");
      return;
    }

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        setError(false);
        setEmptyFields([]);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative md:flex overflow-x-hidden gap-6 justify-between px-8 md:px-40 pt-16 pb-28 w-full h-screen bg-[#eeeeee]">
      <div
        className="absolute top-6 left-10 text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBackCircleOutline />
      </div>
      <form className="flex-col">
        <label>اسم الكتاب</label>
        <input
          className={
            emptyFields.includes("name")
              ? "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-1 ring-red-500"
              : "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-0"
          }
          type="text"
          placeholder="ex. Atomic Habits"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>المؤلف</label>
        <input
          className={
            emptyFields.includes("author")
              ? "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-1 ring-red-500"
              : "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-0"
          }
          type="text"
          placeholder="ex. James Clear"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <label>رابط الغلاف</label>
        <input
          className={
            emptyFields.includes("cover")
              ? "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-1 ring-red-500"
              : "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-0"
          }
          type="text"
          placeholder="ex. https://images.com/image"
          onChange={(e) => setCover(e.target.value)}
          value={cover}
        />
        <label>عدد صفح الكتاب</label>
        <input
          className={
            emptyFields.includes("pages")
              ? "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-1 ring-red-500"
              : "mt-1 mb-3 w-full bg-white rounded-md border outline-none py-2 px-4 focus:ring-1 focus:ring-gray-500 duration-100 ring-0"
          }
          type="number"
          placeholder="ex. 320"
          onChange={(e) => setPages(e.target.value)}
          value={pages}
        />
        {error && (
          <div className="w-full rounded-md text-red-900 bg-red-100 border border-red-600 p-2 text-center">
            {error}
          </div>
        )}
        <div className="w-full pt-8 pb-5 px-16">
          <img className="w-full md:hidden rounded-xl" src={cover} alt={name} />
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 text-white bg-black rounded-md"
            onClick={handleAddBook}
          >
            أضف الكتاب
          </button>
        </div>
      </form>
      <div className="flex overflow-hidden w-full justify-end">
        <img className="hidden md:block object-cover" src={cover} alt={name} />
      </div>
    </div>
  );
};

export default BookForm;
