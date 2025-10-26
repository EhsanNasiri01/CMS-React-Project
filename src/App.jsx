import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* اگر مسیر وجود نداشت صفحه 404 نمایش داده شود */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
