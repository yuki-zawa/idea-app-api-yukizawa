import React from 'react';
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';
import Logo from './../../../../src/components/images/logo.svg'
import GoogleLogo from './../../images/google-icon.svg';

const createLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "40px",
  lineHeight: "40px",
  cursor: "pointer",
  borderRadius: "4px",
  backgroundColor: "#FEB342",
  marginBottom: "16px",
  fontSize: "16px"
};
const googleLinkStyle = {
  display: "flex",
  alignItems: "center" as "center",
  height: "40px",
  lineHeight: "40px",
  cursor: "pointer",
  border: "2px solid #FEB342",
  boxSizing: "border-box" as "border-box",
  marginBottom: "16px",
  borderRadius: "4px",
  fontSize: "16px"
};
const loginLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "40px",
  lineHeight: "40px",
  cursor: "pointer",
  borderRadius: "4px",
  backgroundColor: "#C4C4C4",
  fontSize: "16px"
};
const detailLinkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "36px",
  lineHeight: "36px",
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
                <a href="http://www.stockroom.work/auth/google_oauth2" style={googleLinkStyle}>
                    <img className="google-logo" src={GoogleLogo} alt=""/>
                    <p className="google-text">Googleで登録/ログイン</p>
                </a>
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
        .login-container{
            width: 314px;
            margin: 0 atuto;
            width: 100%;
        }
        .container {
          padding: 0 28px;
          box-sizing: border-box;
          position: fixed;
          width: 100%;
        }

        .title {
          margin-bottom: 120px;
          padding-top: 60px;
          padding-left: 12px;
        }
        .top-logo{
            width: 70px;
            height: auto;
        }

        .google-text{
            margin-left: calc((100% - 226px)/2);
            
        }
        .google-logo{
            // position: absolute;
            margin-left: 8px;
            width: 20px;
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
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .introduction{
            text-align: justify;
            position: fixed;
            padding: 40px 28px;
            box-sizing: border-box;
            bottom: 0;
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
