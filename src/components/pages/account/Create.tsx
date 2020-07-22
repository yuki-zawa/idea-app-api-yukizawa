import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeft, Eye } from 'react-feather';
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

export const AccountCreate: React.FC = () => {
  const history = useHistory();
  const [err, setErr] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  })

  const handleFieldChange = (event: any) => {
    setErr("");
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    })
  }

  const createUser = async () => {
    validate(newUser);
    if(err == ""){
      await axios
        .post('/api/v1/users', newUser)
        .then(res => {
          history.push({
            pathname: '/mail_confirmation',
            state: { newUser: newUser }
          });
        })
        .catch(err => {
          console.log(err);
          setErr("すでに存在しているメールアドレスです");
        });
    }
  }

  const validate = (form: any) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(form.email).toLowerCase())){
      setErr("不正な形式のメールアドレスです");
      return;
    };
    if(form.password.length < 6){
      setErr("パスワードが短すぎます");
      return;
    }
    if(form.password != form.password_confirmation){
      setErr("パスワードが一致していません");
      return;
    }
  }

  const appear = (name: string) => {
    const input = document.getElementsByName(name);
    input[0].setAttribute('type','text');
  }

  const disAppear = (name: string) => {
    const input = document.getElementsByName(name);
    input[0].setAttribute('type','password');
  }

  return (
    <div className="container">
      <Link to='/' style={backLinkStyle}>
        <ArrowLeft size={24}/>
      </Link>
      <div className="err">{err}</div>
      <h1 className="title">STOCKROOMを始める</h1>
      <div className="mail-form">
        <label className="mail-form_label">メールアドレス</label>
        <input className="mail-form_input" type="text" placeholder="メールアドレス" onChange={handleFieldChange} name="email"/>
      </div>
      <div className="password-form">
        <label className="password-form_label">パスワード</label>
        <div className="pass_inner-container">
          <input className="password-form_input" type="password" placeholder="パスワード" onChange={handleFieldChange} name="password"/>
          <Eye size={24} color="black" onMouseDown={() => appear('password')} onTouchStart={() => appear('password')} onTouchEnd={() => disAppear('password')} onMouseUp={() => disAppear('password')}/>
        </div>
      </div>
      <div className="password-form">
        <label className="password-form_label">パスワード(確認)</label>
        <div className="pass_inner-container">
          <input className="password-form_input" type="password" placeholder="パスワード(確認)" onChange={handleFieldChange} name="password_confirmation"/>
          <Eye size={24} color="black" onMouseDown={() => appear('password_confirmation')} onMouseUp={() => disAppear('password_confirmation')} onTouchStart={() => appear('password_confirmation')} onTouchEnd={() => disAppear('password_confirmation')}/>
        </div>
      </div>
      <p>
        <Link to='/account/login' style={linkStyle}>ログインはこちら</Link>
      </p>
      <div className="button-container">
        <button onClick={createUser}>
          登録する
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 60px 24px 0 24px;
          max-width: 360px;
          margin: 0 auto;
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

        .mail-form_input{
          padding: 0.5rem 0.5rem;
          width: 100%;
          border: none;
          border-bottom: #FEB342 2px solid;
          background-color: rgb(232, 240, 254);
          font-size: 18px;
          box-sizing: border-box;
        }
        .password-form_input{
          font-size: 18px;
          box-sizing: border-box;
          width: calc(100% - 24px);
          background: transparent;
          border: none;
          outline: none;
        }
        .pass_inner-container{
          display: flex;
          padding: 0.5rem 0.5rem;
          border: none;
          border-bottom: #FEB342 2px solid;
          background-color: rgb(232, 240, 254);
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

        .button-container button:hover{
          color: white;
          background: #EC920C;
        }

        
      `}</style>
    </div>
  );
}