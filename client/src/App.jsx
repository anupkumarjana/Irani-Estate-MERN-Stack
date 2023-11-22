import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<Profile />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="sign-up/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
