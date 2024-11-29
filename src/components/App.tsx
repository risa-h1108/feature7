import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page1DetailsA from "./components/Page1DetailsA";
import Page1DetailsB from "./components/Page1DetailsB";
import UrlParameter from "./components/UrlParameter";

export default function App() {
  return (
    <div className="App">
      <Link to="/">HOME</Link>
      <br />
      <Link to="page1">PAGE1</Link>
      <br />
      <Link to="page2">PAGE2</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1">
          <Route index={true} element={<Page1 />} />
          <Route path="/page1/detailsA" element={<Page1DetailsA />} />
          <Route path="/page1/detailsB" element={<Page1DetailsB />} />
        </Route>
        <Route path="/page2">
          <Route index={true} element={<Page2 />} />
          <Route path=":id" element={<UrlParameter />} />
        </Route>
      </Routes>
    </div>
  );
}
