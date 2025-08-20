import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TV from "./components/TV";
import Details from "./components/Details";
import List from "./components/list";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<><Header/> <Home /> <Footer/></>} />
          <Route path="/movies" element={<><Header/> <Movies /> <Footer/></>} />
          <Route path="/tv" element={<><Header/> <TV /> <Footer/></>} />
          <Route path="/details" element={<><Header/> <Details /> <Footer/></>} />
          <Route path="/list" element={<><Header/> <List /> <Footer/></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
