import React, { useContext } from 'react';
import axios from "axios";
import { X, Mail, Lock } from 'react-feather';
import { useHistory, Link } from 'react-router-dom';
import { HomeLayout } from "../../common/HomeLayout";
import { AuthContext } from "./../../common/context/provider";

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "24px"
};

export const Setting: React.FC = () => {
  const history = useHistory();
  const { authState, setAuth } = useContext(AuthContext);

  const send = async () => {
    await axios
      //httpsからhttpは無効化されるからどうしよう
      .put('http://www.stockroom.work/api/v1/users/1')
      .catch(err => console.log(err));

    axios.defaults.headers.common['Authorization'] = '';
    //cookie削除
    document.cookie = "token=; max-age=0";
    localStorage.removeItem("token");
    window.location.pathname = '/'
    setAuth({
      isLogged: false,
      user: null
    });
    return;
  }

  const deleteAccount = async () => {
    if(window.confirm("アカウントを削除すると、STOCKROOMに関する全てのデータが削除されます。本当によろしいですか？")){
      await axios
        .delete(`/api/v1/users/${authState.user.id}`)
        .catch(err => console.log(err));
      axios.defaults.headers.common['Authorization'] = '';
      //cookie削除
      document.cookie = "token=; max-age=0";
      localStorage.removeItem("token");
      window.location.pathname = '/'
      setAuth({
        isLogged: false,
        user: null
      });
    }

    return;
  }

  return (
    <HomeLayout title="STOCKROOM">
      <div className="container">
        <div className="top-part">
          <button className="x-icon" onClick={() => history.goBack()} style={backLinkStyle}>
            <X size={24} color="#333" />
          </button>
          <p className="title">設定とアカウント情報</p>
        </div>
        <div className="inner-container">
          <div className="mail-container">
            <div className="mail-label">
              <Mail className="icon" size={24} color="#333" />
              <h3>登録メールアドレス</h3>
            </div>
            <p>{authState.user.email}</p>
          </div>
          <div className="pass-container">
            <Lock className="icon" size={24} color="#333" />
            <h3 className="pass-btn">パスワードを変更する</h3>
          </div>
          <div className="help-container">
            <p>
              <Link to="/introduction">STOCKROOMについて</Link>
            </p>
            <p>
              <Link to="/help">ヘルプ</Link>
            </p>
          </div>
          <div className="account-container">
            <p>
              <button onClick={send} style={{ color: "red" }}>ログアウト</button>
            </p>
            <p>
              <button onClick={deleteAccount}>アカウント削除</button>
            </p>
          </div>
        </div>
        <style jsx>{`
          .container {
            background-color: white;
            padding: 60px 12px 72px 12px;
            z-index: 5;
          }
          .inner-container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            box-sizing: border-box;
          }
          .icon{
            margin-right: 16px;
          }
          .mail-container {
            margin-bottom: 40px;
          }
          .mail-label{
            display: flex;
            align-items: center;
          }
          .pass-container{
            display: flex;
            align-items: center;
            margin-bottom: 40px;
          }
          .help-container, .account-container{
            margin-bottom: 40px;
          }
          .top-part {
            margin-bottom: 20px;
          }

          .x-icon{
            position: absolute;
          }

          .title{
            font-size: 14px;
            color: #333;
            text-align: center;
            line-height: 28px;
          }

          
          
          

          .help-container p {
            margin: 1rem 0;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}