import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //[useParams]という関数を利用することで、パラメータを取得することが可能になる。
import classes from "../styles/Detail.module.css";

interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

export const Detail: React.FC = () => {
  const { id } = useParams(); // urlからidを取得。http://localhost:3000/posts/1 というURLだったら、1を取得
  //Postはデータが一つなので、配列[]ではない。<Post|null>(null)：null許容型：nullの型には動的な値が入るため、初期値にはnullにしとく。
  const [post, setPost] = useState<Post | null>(null); //post:記事のデータを保存するための状態変数. setPostは`post`の値を更新するための関数.
  //boolean:真偽を表す型。falseが既に入っているため、類推してくれるので記載必要なし。
  const [loading, setLoading] = useState(false); //loading:データの読み込み中かどうかを示す状態変数. setLoading:`loading`の値を更新するための関数

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true); //「今、データを読み込んでいます」ということを示す。
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      ); //非同期処理：指定されたURLにHTTPリクエストを送信し、その応答を待つ。
      const data = await res.json();
      setPost(data.post);
      setLoading(false);
    };
    fetcher(); //fetcher関数を呼び出して、データの取得を開始.
  }, []);

  //35行目/36行目/41行目のどれかに当てはまった内容でreturnされるので、他のreturnになる可能性は潰さない。
  if (loading) return <div className={classes.postLoading}>読み込み中...</div>;
  if (!post)
    return (
      <div className={classes.postError}>記事が見つかりませんでした。</div>
    ); // もしloadingも返ってこず、postも返ってこない場合、「記事が見つかりませんでした」という表示をさせる

  return (
    <div className={classes.wrapper}>
      <img src={post.thumbnailUrl} alt="sampleImage" />
      <div className={classes.info}>
        <div className={classes.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <ul className={classes.categories}>
          {post.categories.map((category, id) => (
            <li key={id}>{category}</li>
          ))}
        </ul>
      </div>
      <h2>{post.title}</h2>
      <p
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};
