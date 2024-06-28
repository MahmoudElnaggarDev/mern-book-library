import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "../hooks/useAuthContext";

const NoteModal = ({book, noteModalOpen, setNoteModalOpen}) => {
  const [notes, setNotes] = useState("")
  const {user} = useAuthContext()

  useEffect(() => {
    setNotes(book.notes)
  }, [book.notes])

  if (!user) {
    return;
  }
  
  const handleSaveNotes = async () => {
    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({ notes }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })

      if (response.ok) {
        setNoteModalOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {noteModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-screen h-screen p-20 fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="relative p-4 pb-20 md:pb-4 pt-20 bg-white w-full h-full rounded-2xl">
            <div className="absolute top-0 left-0 w-full h-20 px-6 flex justify-between items-center">
              <IoClose className="text-2xl cursor-pointer" onClick={() => setNoteModalOpen(false)} />
              <p>ملاحظات كتاب <strong className="font-bold">{book.name}</strong></p>
              <button className="hidden md:block px-4 py-2 rounded-md bg-black text-white" onClick={handleSaveNotes}>حفظ الملاحظات</button>
            </div>
            <textarea onChange={(e) => setNotes(e.target.value)} value={notes} className="w-full h-full border-2 border-slate-300 outline-none p-3 text-lg focus:border-slate-400 focus:border-dashed duration-150 border-dashed rounded-2xl"></textarea>
            <div className="absolute bottom-0 left-0 w-full h-20 px-6 flex justify-center items-center">
              <button className="block md:hidden px-4 py-2 rounded-md bg-black text-white" onClick={handleSaveNotes}>حفظ الملاحظات</button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default NoteModal;