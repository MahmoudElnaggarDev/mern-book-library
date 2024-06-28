import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <BookList /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/book-form" element={<BookForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
