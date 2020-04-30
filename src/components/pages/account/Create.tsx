import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "8vh",
  lineHeight: "8vh",
  paddingLeft: "10px",
  float: "left" as "left",
  cursor: "pointer",
};

export const AccountCreate: React.FC = () => {
  return (
    <div>
      <h1 className="title">STOCKROOMを始める</h1>
      <div>
        <label>メールアドレス</label>
        <input type="text" placeholder="メールアドレス"/>
        <label>パスワード</label>
        <input type="password" placeholder="パスワード"/>
      </div>
      <p>
        <Link to='/account/login' style={linkStyle}>ログインはこちら</Link>
      </p>

      <style jsx>{`
      //example 好きに変えていいよ
        .title {
          background-color: #32CD32;
        }
      `}</style>
    </div>
  );
}