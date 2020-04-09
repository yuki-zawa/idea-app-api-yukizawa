import React, { useState, useRef, useContext, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import { AuthContext } from './../../common/context/provider'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { IdeaList } from "./List";
import { AddTagModal } from './../tag/AddModal'
import { Card } from './Card'



export const ShuffleModal: React.FC = () => {
  const [idea1, setIdea1] = useState({
    icon: "",
    title: "",
    detail: "",
    priority: 0,
    genre_tags: [{
      name: "",
      color: ""
    }],
    idea_tags: []
  });
  const [idea2, setIdea2] = useState({
    icon: "",
    title: "",
    detail: "",
    priority: 0,
    genre_tags: [{
      name: "",
      color: ""
    }],
    idea_tags: []
  });
  const fetchIdeas = async () => {
    //FIXME
    let response1 = await axios
      .get(`/api/v1/ideas/1`)
      .then(result => result.data)
      .catch(error => console.log(error))

    let response2 = await axios
      .get(`/api/v1/ideas/2`)
      .then(result => result.data)
      .catch(error => console.log(error))

    setIdea1(response1);
    setIdea2(response2);
  }

  useEffect(() => {
    fetchIdeas();
  })
  return (
    <div className="container">
      <p>アイデアをシャッフルしました！</p>
      <Card idea={idea1}/>
      <p>X</p>
      <Card idea={idea2}/>
      <button>新しいアイデアを追加する</button>
      <style jsx>{`
        .container {
          background-color: white;
          width: 90%;
          height: 70%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          -webkit-transform: translate(-50%, -40%);
          -ms-transform: translate(-50%, -40%);
        }
      `}</style>
    </div>
  );
}
