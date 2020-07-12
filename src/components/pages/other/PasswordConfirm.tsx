import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const MailConfirm: React.FC = (props: any) => {
  const toTop = () => {
    window.location.pathname = "/";
  }

  if(!(props.location.state && props.location.state.email)){
    toTop();
  }

  const changePassword = async () => {
    await axios
    .post(`/api/v1/password_resets`, {
      email: props.location.state.email
    })
    .catch(err => {
      console.log(err);
    });
  }
  return (
    <div className="container">
      <h1 className="title">パスワード変更メールを送信しました。</h1>
      <p className="info">{props.location.state.email}宛にパスワード変更の案内メールを送信しました。メール内のURLをクリックしてパスワードを変更してください。</p>
      <div className="btn-container">
        <button onClick={changePassword} className="resend-btn">もう一度メールを送る</button>
        <button onClick={toTop} className="back-btn">トップに戻る</button>
      </div>
      <style jsx>{`
        .container {
          padding: 1rem 2rem;
        }

        .title {
          margin-top: 64px;
          font-size: 18px;
          font-weight: bold;
        }

        .info {
          margin-top: 120px;
          font-size: 16px;
        }

        .btn-container {
          margin-top: 120px;
          text-align: center;
        }

        .btn-container button {
          width: 80%;
          max-width: 320px;
          padding: 0.5rem 1rem;
          margin: 0.5rem 1rem;
          border-radius: 4px;
        }

        .resend-btn {
          background-color: #FEB342;
        }

        .back-btn {
          background-color: #C4C4C4;
        }
      `}</style>
    </div>
  );
}