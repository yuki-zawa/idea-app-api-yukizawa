import React from 'react';
import { Link } from 'react-router-dom';

export const Introduction: React.FC = () => {
  return (
    <div>
        <header className="page-header">
            <h1 className="header-appname">STOCKROOM</h1>
            <ul className="header-link-container">
                <li className="header-link">ログイン</li>
                <li className="header-link">会員登録</li>
            </ul>
        </header>
        <body>
            <section className="firstview-section">
                <h2>STOCKROOM</h2>
            </section>
            <section className="about-section"></section>
            <section className="recommend-section"></section>
            <section className="features-section"></section>
            <section className="demand-section"></section>
        </body>
        <footer className="page-footer"></footer>
      <style jsx>{`
      //example 好きに変えていいよ
        div {
          background-color: red;
        }
      `}</style>
    </div>
  );
}