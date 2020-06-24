import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const MailConfirm: React.FC = (props: any) => {
  const toTop = () => {
    window.location.pathname = "/";
  }

  if(!(props.location.state && props.location.state.newUser && props.location.state.newUser.email)){
    toTop();
  }

  const createUser = async () => {
    await axios
      .post('/api/v1/users', props.location.state.newUser)
      .catch(err => console.log(err));
  }
  return (
    <div className="container">
      <h1 className="title">まだ会員登録は完了していません。</h1>
      <p className="info">{props.location.state.newUser.email}宛に会員登録の案内メールを送信しました。メール内のURLをクリックして登録を完了してください。</p>
      <div className="btn-container">
        <button onClick={createUser} className="resend-btn">もう一度メールを送る</button>
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