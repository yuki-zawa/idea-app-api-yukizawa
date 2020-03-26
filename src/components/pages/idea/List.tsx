import React, {useContext} from "react";
import { HomeLayout } from "../../common/HomeLayout";
import { AuthContext } from "../../common/context/provider";

export const IdeaList: React.FC = (props: any) => {
  const { authState, setAuth } = useContext(AuthContext);
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
