import React, {useContext} from 'react';
import useReactRouter from "use-react-router";
import { AuthContext } from "./context/provider";
import axios from "axios";

const linkStyle = {
  textAlign: "center" as "center",
  display: "block",
  height: "8vh",
  lineHeight: "8vh",
  paddingLeft: "10px",
  float: "left" as "left",
  cursor: "pointer",
};

type HeaderProps = {
  title: string,
  location?: string,
  history?: any,
};



export const Header: React.FC<HeaderProps> = (props) => {
  const path = useReactRouter().location.pathname;
  const { authState, setAuth } = useContext(AuthContext);

  const send = async () => {
    // set Authorization empty header
    axios.defaults.headers.common['Authorization'] = '';
    //cookie削除
    document.cookie = "token=; expires=0";
    setAuth({
      isLogged: false,
      user: null
    });
    window.location.href = '/'
    return;
  }

  return (
    <header>
      <ul>
        <li className="title">{props.title}</li>
        <button onClick={ send }>
          ログアウト
        </button>
      </ul>
      <style jsx>{`
        header {
          width: 100%;
          height: 40px;
          background-color: white;
          position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
        }
        
        ul {
          position: relative;
          height: 40px;
        }

        .title {
          width: 100px;
          text-align: center;
          line-height: 40px;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom :0;
          margin: auto;
          font-size: 20px;
          font-weight: 700;
        }

      `}</style>
    </header>
  );
}