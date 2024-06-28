import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import {motion} from "framer-motion"
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = ({ hideButton }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
    <div className="flex fixed top-0 left-0 z-30 justify-between items-center px-6 py-6 w-full bg-white shadow md:px-40">
      <h2 className="text-3xl font-bold">مرحبًا يا {user.name}</h2>
      {user && (
        <div className="flex justify-between items-center gap-6 md:gap-10">
          <Link to="/book-form">
            <button className="px-3 py-2 font-bold text-white bg-black rounded-md">
              أضف كتابًا
            </button>
          </Link>
          <div className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)}>
            <FaRegUserCircle />
          </div>
        </div>
      )}
    </div>
    {menuOpen && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="w-screen h-screen overflow-hidden bg-black fixed top-0 left-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex relative px-14 py-28 rounded-2xl bg-white">
            <IoClose className="absolute top-5 right-5 text-2xl cursor-pointer" onClick={() => {setMenuOpen(false)}} />
            <button className="py-2 px-4 rounded-md border-2 border-black hover:bg-black hover:text-white duration-150" onClick={handleLogout}>تسجيل الخروج</button>
          </div>
        </motion.div>
    )}
    </>
  );
};

export default Navbar;
