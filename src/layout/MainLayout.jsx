import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style/mainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="content-area">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
