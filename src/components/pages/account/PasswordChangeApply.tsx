import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import axios from 'axios';

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

export const PasswordChangeApply: React.FC = () => {
  const history = useHistory();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    email: ""
  })

  const handleFieldChange = (event: any) => {
    setErr("");
    setData({
      email: event.target.value
    });
  }

  const changePassword = async () => {
    validate(data);
    if(err == ""){
      await axios
        .post(`/api/v1/password_resets`, data, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(() => {
          history.push({
            pathname: '/password_confirmation',
            state: {email: data.email}
          });
        })
        .catch(err => {
          console.log(err);
          setErr("メールアドレスが間違っています");
        });
    }
  }

  const validate = (form: any) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(form.email).toLowerCase())){
      setErr("不正な形式のメールアドレスです");
      return;
    };
  }

  return (
    <div className="container">
      <Link to='/' style={backLinkStyle}>
        <ArrowLeft size={24}/>
      </Link>
      <div className="err">{err}</div>
      <h1 className="title">パスワード変更</h1>
      <div className="mail-form">
        <label className="mail-form_label">メールアドレス</label>
        <input className="mail-form_input" type="text" placeholder="メールアドレス" onChange={handleFieldChange} name="email"/>
      </div>
      <p>
        <Link to='/' style={linkStyle}>トップへ戻る</Link>
      </p>
      <div className="button-container">
        <button onClick={changePassword}>
          送信する
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