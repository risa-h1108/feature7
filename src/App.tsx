import { Header } from "./pages/Header";
import { Home } from "./components/Home";
import { Detail } from "./components/Detail";
import { Route, Routes } from "react-router-dom";
import { Contact } from "./components/Contact";

export const App: React.FC = () => {
  return (
    <>
      <Header />

      {/*element属性は、そのパスがマッチしたときに表示するコンポーネントを指定する。*/}
      {/* path="/posts/:id"は、`/posts/1`や`/posts/abc`のように、`/posts/の後に任意の文字列が続くパスを意味する。
        　　ここで:id`はパラメータとして扱われ、その部分にどんな文字列が来てもマッチする */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/post/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
