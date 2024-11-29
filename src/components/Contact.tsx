import React from "react";
import { useForm } from "react-hook-form";
import classes from "../styles/Contact.module.css";

export const Contact = () => {
  //フォームの初期化したらリセットし、フォームがエラーを含んでいないか送信中かを示す。formStateは、フォームの現在の状態を保持します。`errors`は、バリデーションエラーの情報を含み、`isSubmitting`はフォームが送信中であるかどうかを示します。
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  //tryブロックの中にエラーが発生するかもしれないコードを記述し、`catch`ブロックでそのエラーをキャッチして処理する
  //非同期処理：async...await fetch()
  //res:リクエストの結果（レスポンス）が格納される
  //onSubmit は、ユーザーがフォームを送信したときに実行される関数
  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST", //HTTPリクエストのメソッドを指定.POST`メソッドは、サーバーにデータを送信する際に使われる
          headers: { "Content-Type": "application/json" }, //リクエストのヘッダーを指定しています。`Content-Type: "application/json"`は、送信するデータがJSON形式であることを示しています。
          body: JSON.stringify(data), //bodyは、送信するデータの内容です。`JSON.stringify(data)`によって、JavaScriptのオブジェクトである`data`をJSON形式の文字列に変換しています。
        }
      );

      const result = await res.json(); //サーバーからのレスポンスをJSON形式に変換するため.
      console.log("送信できました", result); //「送信できました！」というメッセージと、先ほど取得した`result`をコンソールに表示しています。
      alert("送信しました"); //alertは、ユーザーにメッセージを表示するためのブラウザの機能で,ポップアップウィンドウとして表示されます。
      reset(); //フォームの初期化 //ボタンがクリックされたときに`handleReset`が呼び出され、`reset`関数が実行される(＝フォームの内容のクリア)

      //try...catch構文は、エラーが発生したときにそのエラーをキャッチして処理を行うために使う。
      //catchブロックの中では、エラーが発生した場合の処理を記述する。
    } catch (error) {
      console.log("送信エラー", error);
      alert("送信エラーです");
    }
  };

  return (
    <>
      <div>
        <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={classes.title}>問い合わせフォーム</h1>
          <div className={classes.itemWrapper}>
            <label className={classes.itemLabel}>お名前</label>
            <div className={classes.textWrapper}>
              <input
                className={classes.input}
                type="text"
                //register(フィールド名[,動作オプション形式])：指定されたフィールドに実施するイベントや参照などを登録するための関数。
                {...register("name", {
                  required: "お名前は必須です。",
                  maxLength: {
                    value: 30,
                    message: "お名前は30文字以内で入力してください。",
                  },
                })}
                //isSubmitting が true の場合、入力フィールドやボタンは無効化されて、ユーザーが操作できなくなります。フォームが「送信中」であることを示しています。
                //送信中には入力やボタンを無効化する
                disabled={isSubmitting}
              />
              {/* errors.name?.message(errors.フィールド名?.message):?はerrors.フィールド名が存在しない時nullを返し、messageプロパティには関与しない*/}
              {/*errors.name が存在する場合（つまり、`errors.name` が true と評価される場合）、 <p> タグ内のエラーメッセージが表示されます。
           errors.name.message には、エラーメッセージの具体的な内容が入っており、それが <p> タグの中に表示されます。 */}
              {errors.name && (
                <p className={classes.error}>{errors.name?.message}</p>
              )}
            </div>
          </div>

          <div className={classes.itemWrapper}>
            <label className={classes.itemLabel}>メールアドレス</label>
            <div className={classes.textWrapper}>
              <input
                className={classes.input}
                type="email"
                {...register("email", {
                  required: "メールアドレスは必須です。",
                  pattern: {
                    value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i, //正規表現で、メールアドレスの形式を定義している。
                    message: "正しいメールアドレスを入力してください。",
                  },
                })}
                //送信中には入力やボタンを無効化する
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className={classes.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className={classes.itemWrapper}>
            <label className={classes.itemLabel}>本文</label>
            <div className={classes.textWrapper}>
              <textarea
                className={classes.input}
                rows={8} //rows={8}は、テキストエリアの高さを8行分に設定しています。
                {...register("message", {
                  required: "本文は必須です。",
                  maxLength: {
                    value: 500,
                    message: "本文は500文字以内で入力してください。",
                  },
                })}
                //送信中には入力やボタンを無効化する
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className={classes.error}>{errors.message.message}</p>
              )}
            </div>
          </div>

          <div className={classes.buttonWrapper}>
            {/*disabled={isSubmitting}は、`isSubmitting`が`true`のときにボタンを無効化します。つまり、送信中はボタンが押せなくなります。*/}
            <button
              className={classes.send}
              type="submit" //ボタンがフォームを送信するものと表示。enterで実行できる
              disabled={isSubmitting}
            >
              {/*JavaScriptの条件演算子（テレナリー演算子）を使っています。
             isSubmittingが`true`の場合は「送信中」と表示し、`false`の場合は「送信」と表示します。*/}
              {isSubmitting ? "送信中" : "送信"}
            </button>

            <button
              className={classes.clear}
              type="button" //type="button":このボタンが通常のボタンであることを示す
              onClick={() => reset()} //ボタンがクリックされたときに`reset()`という関数を呼び出す.フォームをリセットする
              disabled={isSubmitting} //送信中はこのボタンも無効化
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
