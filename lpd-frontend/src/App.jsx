import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LicensePlateDetection from "./pages/LicensePlateDetection";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/license" element={<LicensePlateDetection />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;