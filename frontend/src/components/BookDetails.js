import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import BookModal from "./BookModal";
import NoteModal from "./NoteModal";

const BookDetails = ({ book }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    let value = Math.floor((book.read / book.pages) * 100);
    setPercent(value);

    if (value === 0) {
      setStatus("لم تبدأ القراءة بعد");
      setColor("#F94144");
    } else if (value > 0 && value <= 30) {
      setStatus("استمر وستصل");
      setColor("#F94144");
    } else if (value > 30 && value <= 60) {
      setStatus("أنت تحرز تقدمًا");
      setColor("#F8961E");
    } else if (value > 60 && value < 100) {
      setStatus("قاربت على الإنتهاء");
      setColor("#F9C74F");
    } else if (value === 100) {
      setStatus("تم الإنتهاء من قراءته");
      setColor("#90BE6D");
    }
  }, [book]);

  return (
    <>
      <div
        className="relative md:flex w-full rounded-2xl overflow-hidden bg-white shadow-lg mt-20 md:mt-6"
      >
        <div className="absolute top-3 left-3 text-white bg-black bg-opacity-35 p-2 rounded-full cursor-pointer" onClick={() => setEditModalOpen(true)}>
          <FaPen />
        </div>
        <div className="absolute top-3 right-3 md:left-3 md:bottom-3 text-white bg-black bg-opacity-35 p-2 rounded-full cursor-pointer" onClick={() => setNoteModalOpen(true)}>
          <FaNoteSticky />
        </div>
        <img className="w-full md:w-[100px]" src={book.cover} alt={book.name} />
        <div className="py-3 px-5">
          <p>
            اسم الكتاب: <strong className="w-bold">{book.name}</strong>
          </p>
          <p>مؤلف الكتاب: {book.author}</p>
          <p>عدد صفح الكتاب: {book.pages}</p>
          <p>عدد الصفح التي قرأتها: {book.read}</p>
          <p>التقدم: {status}</p>
          <div className="w-full mt-2 border h-[12px] rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{ width: `${percent}%`, background: color }}
            ></div>
          </div>
        </div>
      </div>

      {editModalOpen && (
        <BookModal
          book={book}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
        />
      )}
      {noteModalOpen && (
        <NoteModal
          book={book}
          noteModalOpen={noteModalOpen}
          setNoteModalOpen={setNoteModalOpen}
        />
      )}
    </>
  );
};

export default BookDetails;
