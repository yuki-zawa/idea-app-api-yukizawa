import React from 'react';
import HeaderIcon from "./../images/header-logo.png"
import { Settings } from 'react-feather';
import { Link } from 'react-router-dom';

type HeaderProps = {
  title: string,
  location?: string,
  history?: any,
};

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <img className="header-icon" src={HeaderIcon} alt="STOCKROOM"/>
      <Link to='/settings'>
        <Settings color="#7A7A7A" size={24} />
      </Link>
      
      <style jsx>{`
        header {
          width: 100%;
          height: 52px;
          padding: 10px 15px;
          background-color: white;
          justify-content: space-between;
          display: flex;
          box-sizing: border-box;
          position: fixed;
          align-items: center;
          left: 0;
          top: 0;
          z-index: 100;
        }
        .header-icon{
          height: 32px;
          width: auto
        }
        
        ul {
          height: 40px;
        }

        .title {
          width: 100px;
          text-align: center;
          line-height: 44px;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom :0;
          margin: auto;
          font-size: 12px;
        }

      `}</style>
    </header>
  );
}