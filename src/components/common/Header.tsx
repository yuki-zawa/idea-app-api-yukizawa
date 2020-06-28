import React from 'react';

type HeaderProps = {
  title: string,
  location?: string,
  history?: any,
};

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <ul>
        <li className="title">{props.title}</li>
      </ul>
      <style jsx>{`
        header {
          width: 100%;
          height: 44px;
          background-color: white;
          position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
          box-shadow: rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px;
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