import Home from "./components/Home/Home";
import Users from "./components/Users/Users";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        {/* اگر مسیر وجود نداشت صفحه 404 نمایش داده شود */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
