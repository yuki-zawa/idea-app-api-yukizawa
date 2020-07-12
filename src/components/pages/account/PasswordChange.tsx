import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

const linkStyle = {
  display: "block",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "30px",
  color: "#579AFF"
};

export const PasswordChange: React.FC = () => {
  const location = useLocation();
  const [err, setErr] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    password_confirmation: "",
  })
  const query = queryString.parse(location.search);

  const handleFieldChange = (event: any) => {
    setErr("");
    setNewPassword({
      ...newPassword,
      [event.target.name]: event.target.value
    })
  }

  const changePassword = async () => {
    validate(newPassword);
    if(err == ""){
      await axios
        .put(`/api/v1/password_resets/${query.token}`, {
          user: newPassword,
          email: query.email
        })
        .then(() => {
          window.location.pathname = "/account/login";
        })
        .catch(err => {
          console.log(err);
          setErr("不正です。もう一度最初から操作をしてください");
        });
    }
  }

  const validate = (form: any) => {
    if(form.password.length < 6){
      setErr("パスワードが短すぎます");
      return;
    }
    if(form.password != form.password_confirmation){
      setErr("パスワードが一致していません");
      return;
    }
  }

  return (
    <div className="container">
      <div className="err">{err}</div>
      <h1 className="title">パスワード変更</h1>
      <div className="password-form">
        <label className="password-form_label">パスワード</label>
        <input className="password-form_input" type="password" placeholder="パスワード" onChange={handleFieldChange} name="password"/>
      </div>
      <div className="password-form">
        <label className="password-form_label">パスワード(確認)</label>
        <input className="password-form_input" type="password" placeholder="パスワード(確認)" onChange={handleFieldChange} name="password_confirmation"/>
      </div>
      <p>
        <Link to='/' style={linkStyle}>トップへ戻る</Link>
      </p>
      <div className="button-container">
        <button onClick={changePassword}>
          変更する
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 60px 24px 0 24px;
        }

        .err {
          height: 77px;
          color: red;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 18px;
          margin-bottom: 32px;
        }

        .mail-form, .password-form {
          margin-bottom: 24px;
        }

        .mail-form_label, .password-form_label{
          display: block;
          margin-bottom: 0.5rem;
          font-size: 14px;
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