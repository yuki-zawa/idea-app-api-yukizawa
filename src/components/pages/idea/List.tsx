import React from "react";
import { HomeLayout } from "../../common/HomeLayout";

export const IdeaList: React.FC = () => {

  return (
    <HomeLayout title="idea list">
      <div className="container">
      </div>
      <style jsx>{`
        .container {
          display: flex;
          position: relative;
          height: 100%;
          width: 100%;
        }  
      `}</style>
    </HomeLayout>
  );
}
