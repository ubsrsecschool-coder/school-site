import { Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
