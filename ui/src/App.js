import "./App.css";
import Login from "./components/login.component";
import Home from "./components/home.component";
import WishList from "./components/wishList.component";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/abc" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
