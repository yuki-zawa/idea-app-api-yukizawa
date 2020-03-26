import React from 'react';
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';

const createLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
  border: "3px solid #FEB342",
  backgroundColor: "#FEB342",
  marginBottom: "10px"
};
const googleLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
  border: "3px solid #FEB342",
  marginBottom: "10px"
};
const loginLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
  border: "3px solid #C4C4C4",
  backgroundColor: "#C4C4C4",
  marginBottom: "10px"
};
const detailLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
};

export const Top: React.FC = () => {
  return (
    <div className="container">
      <div className="title">
        <img src="a" />
        <p className="image-text">ひらめきをストックしよう</p>
      </div>
      <p className="start-text">STOCKROOMを始める</p>
      <div className="login-container">
        <Link to='/account/create' style={createLinkStyle}>アカウントを作成</Link>
        <Link to='/' style={googleLinkStyle}>googleアカウントで登録/ログイン</Link>{/* FIXME このリンクは変更になる可能性があるのであとで編集してほしい */}
        <Link to='/account/login' style={loginLinkStyle}>ログイン</Link>
      </div>
      <div>
        <h2 className="intro-title">What is STOCKROOM ?</h2>
        <p className="intro-content">sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample sample</p>
        <Link to='/introduction' style={detailLinkStyle}>詳しくはこちら➡︎</Link>
      </div>


      <style jsx>{`
        .container {
          padding: 1rem 1.5rem;
        }

        .title {
          position:relative;
          margin-bottom: 50px;
          height: 150px; 
        }

        .title img {
          height: 80px;
          width: 80px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%)
        }

        .image-text {
          display: inline-block;
          font-weight: bold;
          font-size: 18px;
          padding-left: 100px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%)
        }

        .start-text {
          font-size: 16px;
          margin: 1rem 0;
        }

        .login-container {
          margin-bottom: 100px;
        }

        .intro-title {
          font-weight: bold;
          font-size: 18px;
          margin: 1rem 0;
        }

        .intro-content {
          margin-bottom: 32px;
        }

      `}</style>
    </div>
  );
}