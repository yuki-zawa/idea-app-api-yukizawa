import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { HomeLayout } from "../../common/HomeLayout";
import { X, Eye } from 'react-feather';
import axios from 'axios';
import queryString from 'query-string';

const linkStyle = {
  display: "block",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "30px",
  color: "#579AFF"
};

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  position: "absolute" as "absolute",
  fontSize: "24px"
};

export const CurrentPasswordChange: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [err, setErr] = useState("");
  const [newData, setNewData] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  })

  const handleFieldChange = (event: any) => {
    setErr("");
    setNewData({
      ...newData,
      [event.target.name]: event.target.value
    })
  }

  const changePassword = async () => {
    if (!validate(newData)) return;
    if(err == ""){
      await axios
        .put(`/api/v1/users/pass/change`, newData)
        .then(() => {
          window.location.pathname = "/settings";
        })
        .catch(err => {
          console.log(err);
          setErr("現在のパスワードが違います。");
        });
    }
  }

  const validate = (form: any) => {
    if(form.password.length < 6 || form.newPassword.length < 6){
      setErr("パスワードが短すぎます");
      return false;
    }
    if(form.newPassword != form.newPasswordConfirmation){
      setErr("パスワードが一致していません");
      return false;
    }
    return true;
  }

  const appear = (name: string) => {
    const input = document.getElementsByName(name);
    input[0].setAttribute('type','text');
  }

  const disAppear = (name: string) => {
    const input = document.getElementsByName(name);
    input[0].setAttribute('type','password');
  }

  return (
  <HomeLayout title="STOCKROOM">
    <div className="container">
      <div className="top-part">
        <Link className="x-icon" to='/settings' style={backLinkStyle}>
          <X size={24} color="#333" />
        </Link>
        <p className="title">パスワードの変更</p>
      </div>
      <div className="err">{err}</div>
      <div className="password-form">
        <label className="password-form_label">現在のパスワード</label>
        <input className="password-form_input" type="password" placeholder="現在のパスワード" onChange={handleFieldChange} name="password"/>
        <Eye size={24} color="black" onMouseDown={() => appear('password')} onTouchStart={() => appear('password')} onTouchEnd={() => disAppear('password')} onMouseUp={() => disAppear('password')}/>
      </div>
      <div className="password-form">
        <label className="password-form_label">新しいパスワード</label>
        <input className="password-form_input" type="password" placeholder="新しいパスワード" onChange={handleFieldChange} name="newPassword"/>
        <Eye size={24} color="black" onMouseDown={() => appear('newPassword')} onMouseUp={() => disAppear('newPassword')} onTouchStart={() => appear('newPassword')} onTouchEnd={() => disAppear('newPassword')}/>
      </div>
      <div className="password-form">
        <label className="password-form_label">新しいパスワード(確認)</label>
        <input className="password-form_input" type="password" placeholder="パスワード(確認)" onChange={handleFieldChange} name="newPasswordConfirmation"/>
        <Eye size={24} color="black" onMouseDown={() => appear('newPasswordConfirmation')} onMouseUp={() => disAppear('newPasswordConfirmation')} onTouchStart={() => appear('newPasswordConfirmation')} onTouchEnd={() => disAppear('newPasswordConfirmation')}/>
      </div>
      <div className="button-container">
        <button onClick={changePassword}>
          変更する
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 60px 24px 0 24px;
          background-color: white;
        }

        .top-part {
          margin-bottom: 20px;
        }

        .title{
          font-size: 14px;
          color: #333;
          text-align: center;
          line-height: 28px;
        }

        .err {
          height: 77px;
          color: red;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 18px;
          margin-bottom: 32px;
        }

        .password-form {
          margin-bottom: 24px;
        }

        .password-form_label{
          display: block;
          margin-bottom: 0.5rem;
          font-size: 14px;
        }

        .password-form_input{
          padding: 0.5rem 0.5rem;
          width: 100%;
          border: none;
          border-bottom: #FEB342 2px solid;
          background-color: #E3EAF5;
          font-size: 18px;
          box-sizing: border-box;
        }

        .button-container {
          width: 314px;
          margin: 0 auto;
        }

        .button-container button {
          text-align: center;
          padding: 0.5rem 0.25rem;
          box-sizing: border-box;
          width: 100%;
          background-color: #FEB342;
          font-size: 16px;
          border-radius :4px;
        }

        .button-container button:hover{
          color: white;
          background: #EC920C;
        }
      `}</style>
    </div>
  </HomeLayout>
  );
}