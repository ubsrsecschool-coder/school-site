import { Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { About } from "@/pages/About";
import { Academics } from "@/pages/Academics";
import { Achievements } from "@/pages/Achievements";
import { Admissions } from "@/pages/Admissions";
import { ChairmanMessage } from "@/pages/ChairmanMessage";
import { Contact } from "@/pages/Contact";
import { Gallery } from "@/pages/Gallery";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { Notices } from "@/pages/Notices";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="about/chairman-message" element={<ChairmanMessage />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="notices" element={<Notices />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
