import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { GlobalStateProvider } from "./context/globalContext"
import Profile from "./pages/Profile"
import { useEffect } from "react"
import PageNotFound from "./pages/PageNotFound"

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/register') navigate('/');
  }, [location.pathname, navigate]);

  return (
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </GlobalStateProvider>
  )
}

export default App
