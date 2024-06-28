import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="w-full h-screen px-4 flex justify-center items-center bg-black bg-opacity-15">
      <div className="w-[900px] h-[450px] bg-white rounded-2xl overflow-hidden flex justify-between items-center">
        <form className="w-full p-6 flex-col justify-center items-center">
          <label>الاسم</label>
          <input
            className="w-full rounded-md bg-white border mb-4 mt-1 px-4 py-2 focus:ring-1 focus-ring-gray-600 duration-150 outline-none"
            type="text"
            placeholder="الاسم باللغة العربية"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>البريد الإلكتروني</label>
          <input
            className="w-full rounded-md bg-white border mb-4 mt-1 px-4 py-2 focus:ring-1 focus-ring-gray-600 duration-150 outline-none"
            type="email"
            placeholder="البريد الإلكتروني باللغة الإنجليزية"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>كلمة المرور</label>
          <input
            className="w-full rounded-md bg-white border mb-4 mt-1 px-4 py-2 focus:ring-1 focus-ring-gray-600 duration-150 outline-none"
            type="password"
            placeholder="كلمة المرور باللغة الإنجليزية"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && (
            <div className="w-full rounded-md text-red-900 bg-red-100 border border-red-600 p-2 text-center">
              {error}
            </div>
          )}
          <div className="w-full text-center">
            <button
              className="rounded-md bg-black text-white py-2 px-3 mt-3 outline-none"
              disabled={loading}
              onClick={handleSignup}
            >
              أنشئ حساب
            </button>
          </div>
          <p className="mt-4 text-center">
            لديك حساب مسبقًا؟{" "}
            <Link to="/login" className="font-bold">
              سجل الدخول
            </Link>
          </p>
        </form>
        <img src="/book.jpeg" alt="book" className="h-full hidden md:block" />
      </div>
    </div>
  );
};

export default Signup;
