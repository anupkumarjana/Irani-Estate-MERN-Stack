import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/*we took header here because we want to show header/navbar in every pages */}
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
