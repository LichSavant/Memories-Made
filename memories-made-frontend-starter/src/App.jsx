import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import WeddingsPage from "./pages/WeddingsPage";
import DebutsPage from "./pages/DebutsPage";
import PackagesPage from "./pages/PackagesPage";
import ProcessPage from "./pages/ProcessPage";
import BookingPage from "./pages/BookingPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<SiteLayout />}>
        <Route path="/weddings" element={<WeddingsPage />} />
        <Route path="/debuts" element={<DebutsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
