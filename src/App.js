import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Todos from "./components/Todos";
import Admin from "./components/Admin";
import Users from "./components/Users";
import UserTodos from "./components/UserTodos";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import UserContext from "./contexts/userContext";
import auth from "./services/authService";
import Profile from "./components/Profile";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const user = auth.getCurrentUser();

  return (
    <UserContext.Provider value={user}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="todos" element={<Todos />} />
          {user?.isAdmin && (
            <>
              <Route path="admin" element={<Admin />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserTodos />} />
            </>
          )}
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
