import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import Services from "../components/Services";
import ServiceDetail from "../components/ServicesPage/ServiceDetail";
import AboutUs from "../components/AboutUs";
import FormModal from "../components/FormModal";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}> 
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="form" element={<FormModal isOpen={true} onClose={() => {}} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
