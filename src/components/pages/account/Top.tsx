import React from 'react';
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';
import Logo from './../../../../src/components/images/logo.svg'

const createLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
  border: "3px solid #FEB342",
  borderRadius: "4px",
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
  marginBottom: "10px",
  borderRadius: "4px"
};
const loginLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
  borderRadius: "4px",
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
  borderRadius: "4px"
};

export const Top: React.FC = () => {
  return (
    <div>
        <div className="container">
            <div className="title">
                <img className="top-logo" src={ Logo } />
            </div>
            <p className="start-text">STOCKROOMを始める</p>
            <div className="login-container">
                <Link to='/account/create' style={createLinkStyle}>アカウントを作成</Link>
                <Link to='/' style={googleLinkStyle}>googleアカウントで登録/ログイン</Link>{/* FIXME このリンクは変更になる可能性があるのであとで編集してほしい */}
                <Link to='/account/login' style={loginLinkStyle}>ログイン</Link>
            </div>
        </div>
        <div className="introduction">
            <h2 className="intro-title">What is STOCKROOM ?</h2>
            <p className="intro-content">
                STOCKROOMとは、「ひらめき」を簡単にストック、整理できるメモアプリです。ひらめきを一つの場所にまとめることで、スムーズで柔軟な創造活動をサポートします！
            </p>
            <Link to='/introduction' style={detailLinkStyle}>詳しくはこちら➡︎</Link>
        </div>
      <style jsx>{`
        .container {
          padding: 40px 28px;
          box-sizing: border-box;
        }

        .title {
          margin-bottom: 100px;
          padding-top: 60px;
          padding-left: 12px;
        }
        .top-logo{
            width: 70px;
            height: auto;
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

        .introduction{
            text-align: justify;
            position: fixed;
            padding: 40px 28px;
            box-sizing: border-box;
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