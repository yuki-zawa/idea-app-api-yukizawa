import React from 'react';
import { Link } from 'react-router-dom';

export const Invalid: React.FC = () => {
  const linkStyle = {
    backgroundColor: "#FEB342",
    width: "80%",
    maxWidth: "320px",
    padding: "0.5rem 1rem",
    margin: "0.5rem 1rem",
    borderRadius: "4px"
  }
  return (
    <div className="container">
      <h1 className="title">不正なリンクです。</h1>
      <p className="info">最新メールのリンクを踏むか,<br/>もう一度メールを再送してアカウントを有効化してください。</p>
      <div className="btn-container">
        <Link to='/' style={linkStyle}>トップに戻る</Link>
      </div>
      <style jsx>{`
        .container {
          padding: 1rem 2rem;
        }

        .title {
          margin-top: 64px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }

        .info {
          margin-top: 120px;
          font-size: 16px;
        }

        .btn-container {
          margin-top: 120px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}