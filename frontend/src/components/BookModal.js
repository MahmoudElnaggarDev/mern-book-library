import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext";

const BookModal = ({ book, editModalOpen, setEditModalOpen }) => {
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);
  const [cover, setCover] = useState(book.cover);
  const [pages, setPages] = useState(book.pages);
  const [read, setRead] = useState(book.read);
  const [showAlert, setShowAlert] = useState(null);
  const { user } = useAuthContext();

  const handleEditBook = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const updatedBook = { name, author, cover, pages, read };

    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedBook),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setEditModalOpen(false);
      } else {
        console.error("Failed to update book:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while updating book:", error);
    }
  };

  const handleShowAlert = (e) => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handleDeleteBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setEditModalOpen(false);
        setShowAlert(false);
      } else {
        console.error("Failed to delete book:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while deleting book:", error);
    }
  };

  return (
    <>
      {editModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex fixed top-0 left-0 z-40 justify-center items-center py-10 px-4 md:px-32 w-full h-screen bg-black bg-opacity-50"
        >
          <motion.div className="flex overflow-x-hidden overflow-y-scroll relative gap-10 md:gap-2 justify-between items-center w-full h-full bg-white rounded-3xl">
            <div
              className="absolute top-5 right-5 flex-col text-3xl cursor-pointer"
              onClick={() => setEditModalOpen(false)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <div className="md:flex md:gap-10 px-10 py-16 w-full h-full">
              <form className="w-full">
                <label>اسم الكتاب</label>
                <input
                  className="mt-1 mb-3 w-full bg-[#eeeeee] rounded-md outline-none py-2 px-4"
                  type="text"
                  placeholder="ex. Atomic Habits"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label>المؤلف</label>
                <input
                  className="mt-1 mb-3 w-full bg-[#eeeeee] rounded-md outline-none py-2 px-4"
                  type="text"
                  placeholder="ex. Atomic Habits"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
                <label>رابط الغلاف</label>
                <input
                  className="mt-1 mb-3 w-full bg-[#eeeeee] rounded-md outline-none py-2 px-4"
                  type="text"
                  placeholder="ex. Atomic Habits"
                  onChange={(e) => setCover(e.target.value)}
                  value={cover}
                />
                <label>عدد صفح الكتاب</label>
                <input
                  className="mt-1 mb-3 w-full bg-[#eeeeee] rounded-md outline-none py-2 px-4"
                  type="number"
                  placeholder="ex. 320"
                  onChange={(e) => setPages(e.target.value)}
                  value={pages}
                />
                <label>عدد الصفح المقروءة</label>
                <input
                  className="mt-1 mb-3 w-full bg-[#eeeeee] rounded-md outline-none py-2 px-4"
                  type="number"
                  placeholder="ex. 150"
                  onChange={(e) => setRead(e.target.value)}
                  value={read}
                />
                <div className="flex gap-4 justify-between mt-5 w-full">
                  <button
                    onClick={handleEditBook}
                    className="px-4 py-2 font-bold text-white bg-black rounded-md"
                  >
                    حفظ التعديلات
                  </button>
                  <button
                    onClick={handleShowAlert}
                    className="px-4 py-2 font-bold text-red-600 rounded-md"
                  >
                    حذف الكتاب
                  </button>
                </div>
              </form>
              <div className="flex justify-center items-center px-4 py-14 md:p-0 w-full md:w-[600px]">
                <img className="h-full" src={cover} alt={name} />
              </div>
            </div>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowAlert(false)}
                className="flex fixed top-0 left-0 z-40 justify-center items-center px-6 md:px-40 w-full h-screen bg-black bg-opacity-50"
              >
                <div className="p-6 bg-white rounded-xl">
                  <h1 className="text-3xl font-bold text-center">
                    هل تريد حذف هذا الكتاب؟ "{book.name}"
                  </h1>
                  <div className="flex justify-between items-center mt-10 w-full">
                    <button
                      onClick={() => setShowAlert(false)}
                      className="px-3 py-2 font-bold text-white bg-black rounded-md"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleDeleteBook}
                      className="px-3 py-2 font-bold text-red-600 rounded-md"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default BookModal;
