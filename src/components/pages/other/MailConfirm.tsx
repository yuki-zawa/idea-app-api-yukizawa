import React from 'react';
import { Link } from 'react-router-dom';

export const MailConfirm: React.FC = () => {
  return (
    <div>
      <h1>誤入力いただいたメールアドレス宛に、認証メールを送信しました。</h1>
      <style jsx>{`
      //example 好きに変えていいよ
        div {
          background-color: gray;
        }
      `}</style>
    </div>
  );
}