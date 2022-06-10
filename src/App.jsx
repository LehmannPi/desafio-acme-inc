import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Card /> */}
        <Navbar />
        <Routes>
          <Route exact path="/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
