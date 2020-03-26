import React, { useRef, useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../common/context/provider";

const linkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "8vh",
  lineHeight: "8vh",
  paddingLeft: "10px",
  float: "left" as "left",
  cursor: "pointer",
};

export const AccountLogin: React.FC = (props: any) => {
  const { authState, setAuth } = useContext(AuthContext);
  const mailRef = useRef(document.createElement("input"));
  const passwordRef = useRef(document.createElement("input"));
  const buttonRef = useRef(document.createElement("button"));

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
      console.log(user);
      // set Authorization header
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      //cookieに保存
      document.cookie = `token=${user.token}`
      
      setAuth({
        isLogged: true,
        user: user
      });

      if(authState.isLogged){
        console.log("login send button to /home");
        props.history.push({
          pathname: "/home"
        })
      }

      return;

    } catch (err) {
      axios.defaults.headers.common['Authorization'] = '';
      console.log(err);
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
        console.log("login set user data function to /home");
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
    <div>
      <h1 className="title">ideaStokkerを始める</h1>
      <div>
        <label>メールアドレス</label>
        <input ref={ mailRef } type="text" placeholder="メールアドレス"/>
        <label>パスワード</label>
        <input ref={ passwordRef } type="password" placeholder="パスワード"/>
      </div>
      <p>
        <button ref={ buttonRef } onClick={ send }>
          ログイン
        </button>
      </p>

      <style jsx>{`
      //example 好きに変えていいよ
        .title {
          background-color: #32CD32;
        }
      `}</style>
    </div>
  );
}