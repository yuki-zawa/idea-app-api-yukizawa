import React from "react";

import { Header } from "./Header";

type HomeLayoutProps = {
  children?: React.ReactNode,
  title: string
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Header title={ title }></Header>
      <main>
        { children }
      </main>

      <style jsx>{`
        .wrap {
          width: 100%;
        }

        main {
          width: 100%;
          margin-top: 40px;
          height: calc(100vh - 40px);
          background-color: #E3EAF5;
          overflow-y: scroll;
          -ms-overflow-style: none;    /* IE, Edge 対応 */
          scrollbar-width: none;       /* Firefox 対応 */
        }
        
        main::-webkit-scrollbar {  /* Chrome, Safari 対応 */
          display:none;
        }
      `}</style>
    </div>
  );
}
