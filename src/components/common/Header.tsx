import React from 'react';
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';

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
  location?: string
};



export const Header: React.FC<HeaderProps> = (props) => {
  const path = useReactRouter().location.pathname;
  return (
    <header>
      <ul>
        <li>left</li>
        <li className="title">{props.title}</li>
        <li>right</li>
      </ul>
      <style jsx>{`
        header {
          width: 100%;
          height: 8vh;
          background-color: #32CD32;
          position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
        }

        .menu-container {
          background-color: #E0FFE0;
          width: 33vw;
          display: inline-block;
          position: fixed;
            top: 8vh;
            right: 0;
        }

        ul {
          position: relative;
          height: 8vh;
        }

        .title {
          width: 100px;
          text-align: center;
          line-height: 8vh;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom :0;
          margin: auto;
          font-size: 20px;
          font-weight: 700;
        }

        .menu {
          text-align: center;
          line-height: 8vh;
          padding-right: 10px;
          float: right;
          cursor: pointer;
        }

      `}</style>
    </header>
  );
}