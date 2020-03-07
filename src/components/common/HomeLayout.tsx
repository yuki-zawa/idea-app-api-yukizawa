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
      <div className="wrap">
        <main>
          { children }
        </main>
      </div>

      <style jsx>{`
        div {
          display: flex;
        }
        
        .wrap {
          position: relative;
          width: calc(100vw - 142px);
          height: calc(100vh - 66px);
          overflow: hidden;
        }

        main {
          position: relative;
          width: 100%;
          overflow-y: scroll;
        }

        main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
