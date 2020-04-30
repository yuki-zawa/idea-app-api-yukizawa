import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from './components/common/context/provider';

import { Introduction } from './components/pages/other/Introduction'
import { Help } from './components/pages/other/Help'
import { Top } from './components/pages/account/Top'
import { AccountCreate } from './components/pages/account/Create'
import { AccountLogin } from './components/pages/account/Login';
import { IdeaList } from './components/pages/idea/List';
import { IdeaDetail } from './components/pages/idea/Detail';
import { AuthComponent } from './components/common/Auth';
import { AddModal } from './components/pages/idea/AddModal'

function App() {
  return(
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Top}/>
            <Route exact path='/introduction' component={Introduction}/>
            <Route exact path='/help' component={Help}/>
            <Route exact path='/account/create' component={AccountCreate}/>
            <Route exact path='/account/login' component={AccountLogin}/>
            <AuthComponent>
              <Route exact path='/home' component={IdeaList}/>
              <Route exact path='/ideas/new' component={AddModal}/>
              <Route exact path='/ideas/:id/detail' component={IdeaDetail}/>
            </AuthComponent>
          </Switch>
        </BrowserRouter>
      </Provider>
      <style jsx global>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,rem,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font:inherit;font-size:16px;vertical-align:baseline}html{line-height:1}ol,ul{list-style:none}table{border-collapse:collapse;border-spacing:0}caption,th,td{text-align:left;font-weight:normal;vertical-align:middle}q,blockquote{quotes:none}q:before,q:after,blockquote:before,blockquote:after{content:"";content:none}a img{border:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}

        html {
          font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif;
          color: rgba(0, 0, 0, 0.87);
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .App {
          // height: 100vh;
          -ms-overflow-style: none;    /* IE, Edge 対応 */
          scrollbar-width: none;       /* Firefox 対応 */
          //overflow: auto;
        }

        button{
          background-color: transparent;
          border: none;
          cursor: pointer;
          outline: none;
          padding: 0;
          appearance: none;
        }
      `}</style>
    </div>
  );
}

export default App;
