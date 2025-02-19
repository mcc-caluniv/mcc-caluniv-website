import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import LoaderComponent from "./components/global/LoaderComponent";
import AdminHomePage from "./pages/admin/Admin.HomePage";
import SignupPage from "./pages/admin/SignupPage";
import LoginPage from "./pages/admin/LoginPage";
import Navbar from "./components/global/Navbar";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/global/Footer";
import ResetPassword from "./pages/admin/ResetPasswordPage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <LoaderComponent />;
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        //ADMIN ROUTES
        <Route
          path="/admin/"
          element={
            authUser ? <AdminHomePage /> : <Navigate to={"/admin/login"} />
          }
        />
        <Route
          path="/admin/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/admin"} />}
        />
        <Route
          path="/admin/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/admin"} />}
        />
        <Route
          path="/admin/reset-password"
          element={!authUser ? <ResetPassword /> : <Navigate to={"/admin"} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
