import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ 
        backgroundColor: "var(--color-bg-main)",
        color: "var(--color-text-dark)"
      }}
    >
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default RootLayout;
