import React, { useContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import useReactRouter from "use-react-router";
import { isIOS } from 'react-device-detect';
import { AuthContext } from "../common/context/provider";

type AuthProps = {
  children: React.ReactNode
};

export const AuthComponent: React.FC<AuthProps> = ({ children }) => {
  const path = useReactRouter().location.pathname;

  const { authState, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  const fetchCurrentUser = async () => {
    let TokenInCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TokenInCookie;
    
    if(TokenInCookie == "") return;
    
    let currentUser = await axios
      .get(`/api/v1/users/me`)
      .then(result => result.data)
      .catch(error => {
        console.log(error);
      })

    if (!currentUser) throw "Login Error";

    return currentUser;
  }

  const autoLogin = async () => {
    if(window.matchMedia('(display-mode: standalone)').matches && isIOS){
      var token = localStorage.getItem("token");
      document.cookie = `token=${token}`
    }
  }
  autoLogin();

  const login = useCallback(async () => {
    try {
      fetchCurrentUser().then(res => {
        if (res) {
          setAuth({
            isLogged: true,
            user: res
          });
          setLogged(true);
        } else {
          setLogged(false);
        }
      }).catch(error => {
        console.log(error);
        setLogged(false);
      }).finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      axios.defaults.headers.common['Authorization'] = '';
      setLogged(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    login();
  }, [path]);

  return (
    loading ? <div></div> :
      logged ?
        (<div>{children}</div>) :
        (<Redirect to={"/account/login"}/>)
  );
};