import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

const linkStyle = {
  display: "block",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "30px",
  color: "#579AFF"
};
const backLinkStyle = {
  display: "block",
  height: "30px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "30px"
};

export const AccountCreate: React.FC = () => {
  return (
    <div className="container">
      <Link to='/' style={backLinkStyle}>
        <ArrowLeft size={24}/>
      </Link>
      <h1 className="title">STOCKROOMを始める</h1>
      <div className="mail-form">
        <label className="mail-form_label">メールアドレス</label>
        <input className="mail-form_input" type="text" placeholder="メールアドレス"/>
      </div>
      <div className="password-form">
        <label className="password-form_label">パスワード</label>
        <input className="password-form_input" type="password" placeholder="パスワード"/>
      </div>
      <p>
        <Link to='/account/login' style={linkStyle}>ログインはこちら</Link>
      </p>
      <div className="button-container">
        <button>
          登録する
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 60px 24px 0 24px;

        }
        .title {
          margin-top: 77px;
          font-size: 18px;
          margin-bottom: 32px;
        }
        .mail-form, .password-form {
          margin-bottom: 24px;
        }

        .mail-form_label, .password-form_label{
          display: block;
          margin-bottom: 0.5rem;
          font-size: 12px;
        }

        .mail-form_input, .password-form_input{
          padding: 0.5rem 0.5rem;
          width: 100%;
          border: none;
          border-bottom: #FEB342 2px solid;
          background-color: #E3EAF5;
          font-size: 18px;
          box-sizing: border-box;
        }

        .button-container {
          width: 314px;
          margin: 0 auto;
        }
        .button-container button {
          text-align: center;
          padding: 0.5rem 0.25rem;
          box-sizing: border-box;
          width: 100%;
          background-color: #FEB342;
          font-size: 16px;
          border-radius :4px;
        }
      `}</style>
    </div>
  );
}