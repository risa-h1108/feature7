import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
  //[]: useStateの初期値です。ここでは、最初は空の配列を設定しています。これは、まだ投稿データを取得していない状態を示します。
  const [data, setData] = useState([]); //useStateの公式
  //`setLoading(true)`を使って「読み込み中」を示し、データの取得が完了したら`setLoading(false)`で「読み込み完了」を示す。
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true); //読み込み開始（読み込み中）：13行目～21行目までの処理をする
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      //await res.json()**: レスポンスをJSON形式に変換して、JavaScriptのオブジェクトとして扱えるようにします。｛posts｝は分割代入
      const { posts } = await res.json();
      //setPosts(data.posts)**: 取得したデータを`posts`の状態に設定します
      setData(posts); //7行目のdataの値がpostsになる
      setLoading(false); //読み込み完了、29行目以降をリターンする。loadingをfalseにしないと、27行目をリターンする
    };
    fetcher();
    //[]：画面が描画されたとき最初に一回だけ処理されるもの。中身がある時は、中身の変数の値に変化があったときに処理が走る。
  }, []);

  if (loading) return <div className={classes.postLoading}>読み込み中...</div>;

  return data.map((post) => (
    <div key={post.id} className={classes.post}>
      <Link to={`/post/${post.id}`} className={classes.Link}>
        {/* `/posts/${post.id}`の``は、JSの書き方。`post.id`の値が`/posts/の後に続くURLを動的に作成しています。例えば、post.id`が`123`なら、リンク先は`/posts/123`になる*/}

        <div className={classes.info}>
          <p className={classes.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <ul className={classes.categories}>
            {post.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        <h2>{post.title}</h2>
        <p
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Link>
    </div>
  ));
};
