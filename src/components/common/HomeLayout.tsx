import React from "react";
import { Header } from "./Header";
type HomeLayoutProps = {
  children?: React.ReactNode,
  title: string,
  position?: string
};
export const HomeLayout: React.FC<HomeLayoutProps> = ({ children, title, position }) => {
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
          position: ${position};
          background-color: #F5F5F5;
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