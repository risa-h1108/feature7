import React from "react";
import classes from "../App.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      {/*通常の`<a>タグはページを再読み込みして遷移するが、Link`を使用すると、ページを再読み込みせずにコンポーネントを切り替えることができる */}
      <Link to="/" className={classes.headerLink}>
        Blog
      </Link>
      <Link to="/contact" className={classes.headerLink}>
        お問い合わせ
      </Link>
    </header>
  );
};
