import React, { useRef, useContext, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../common/context/provider";
import { ArrowLeft } from 'react-feather';

const backLinkStyle = {
  display: "block",
  height: "30px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "30px"
};

const passwordForgotLinkStyle = {
  display: "block",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "30px",
  marginTop: "8px",
  color: "#579AFF"
};

const createLinkStyle = {
  display: "block",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "30px",
  color: "#579AFF"
};

export const AccountLogin: React.FC = (props: any) => {
  const { authState, setAuth } = useContext(AuthContext);
  const mailRef = useRef(document.createElement("input"));
  const passwordRef = useRef(document.createElement("input"));
  const buttonRef = useRef(document.createElement("button"));

  const [err, setErr] = useState("");

  const send = async () => {
    try {
      if(!mailRef.current.value || !passwordRef.current.value) return;
      const user = await axios.post(
        '/api/v1/users/sign_in',
        {
          email: mailRef.current.value,
          password: passwordRef.current.value
        }
      )
      .then(res => res.data)
      .catch(err => console.log(err));
      // set Authorization header
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      //cookieに保存
      document.cookie = `token=${user.token}`
      
      setAuth({
        isLogged: true,
        user: user
      });

      if(authState.isLogged){
        props.history.push({
          pathname: "/home"
        })
      }

      return;

    } catch (err) {
      axios.defaults.headers.common['Authorization'] = '';
      console.log(err);
      setErr("ご記入いただいたメールアドレスもしくはパスワードが間違っています。");
    }
  }

  const setUserData = useCallback(async () => {
    try {
      let TokenInCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (!TokenInCookie) return;
      // set Authorization header
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TokenInCookie;

      const user = await axios.get(
        '/api/v1/users/me'
      )
      .then(res => res.data)
      .catch(err => console.log(err));

      setAuth({
        isLogged: true,
        user: user
      });

      if(authState.isLogged){
        props.history.push({
          pathname: "/home"
        });
      }
      return;
    } catch (err) {
      axios.defaults.headers.common['Authorization'] = '';
      console.log(err);
    }
  }, [authState, setAuth, props.history])

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  return (
    <div className="container">
      <Link to='/' style={backLinkStyle}>
          <ArrowLeft size={24}/>
      </Link>
      <div className="err">{err}</div>
      <h1 className="title">ログイン</h1>
      <div className="form">
        <div className="mail-form">
          <label>メールアドレス</label>
          <input ref={ mailRef } type="text" placeholder="メールアドレス"/>
        </div>
        <div className="password-form">
          <label>パスワード</label>
          <input ref={ passwordRef } type="password" placeholder="パスワード"/>
          {/* FIXME パスワードを忘れた方はこちら 機能もつける */}
          <Link to='/' style={passwordForgotLinkStyle}>➡︎パスワードを忘れた方はこちら</Link>
          <Link to='/account/create' style={createLinkStyle}>新規登録はこちら</Link>
        </div>
        <div className="button-container">
          <button ref={ buttonRef } onClick={ send }>
            ログイン
          </button>
        </div>
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

        .form label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 12px;
        }

        .form input {
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