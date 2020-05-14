import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Card } from './Card'

type ShuffleModalProps = {
  closeShuffleModal: any,
};


export const ShuffleModal: React.FC<ShuffleModalProps> = (props: any) => {
  const history = useHistory();
  const [idea1, setIdea1] = useState({
    id: 0,
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
    id: 0,
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
    await axios
      .get(`/api/v1/ideas/random`)
      .then(result => {
        setIdea1(result.data.data[0]);
        setIdea2(result.data.data[1]);
      })
      .catch(error => console.log(error));
  }

  const onClick = () => {
    history.push({
      pathname: '/ideas/new',
      state: { originIdeas: [idea1, idea2] }
    });
  }

  useEffect(() => {
    fetchIdeas();
  },[])

  return (
    <div className="container">
      <div className="title">
        <span className="close-btn" onClick={props.closeShuffleModal}>×</span>
        <span className="text">アイデアをシャッフルしました！</span>
      </div>
      <div className="cards-container">
        <Card 
          idea={idea1}
          cardWidth={"100%"}
          cardHeight={"170px"}
          backgroundColor={"#FCFCFC"}
          boxShadow={"0px 0px 12px 0px lightgray"}
          cardContentLine={2}
          disabled={true}
        />
        <p className="cross">X</p>
        <Card
          idea={idea2}
          cardWidth={"100%"}
          cardHeight={"170px"}
          backgroundColor={"#FCFCFC"}
          boxShadow={"0px 0px 12px 0px lightgray"}
          cardContentLine={2}
          disabled={true}
        />
      </div>
      <div className="btn-container">
        <button className="new-btn" onClick={onClick}>新しいアイデアを追加する➡︎</button>
      </div>
      <div className="shuffle">
        <button onClick={fetchIdeas}>⇆</button>
        <p>もう一度シャッフルする</p>
      </div>
      <style jsx>{`
        .container {
          background-color: white;
          width: 90%;
          height: 75%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          -webkit-transform: translate(-50%, -40%);
          -ms-transform: translate(-50%, -40%);
          overflow: scroll;
        }

        .title span {
          display: inline-block;
          font-weight: bold;
        }

        span.text {
          width: calc(100% - 32px);
          text-align: center;
        }

        span.close-btn {
          font-size: 16px;
          padding: 0.75rem 0.5rem;
          height: 16px;
          width: 16px;
        }

        .cards-container {
          padding: 0 24px;
        }

        .cross {
          text-align: center;
          margin-bottom: 16px;
        }

        .btn-container {
          width: 100%;
          text-align: center;
          margin: 16px 0;
        }

        .new-btn {
          background-color: #FEB342;
          font-size: 16px;
          padding: 0.5rem 0.75rem;
          border-radius: 5px;
        }

        .shuffle {
          text-align: center;
        }

        .shuffle button {
          height: 56px;
          width: 56px;
          font-size: 40px;
          line-height: 56px;
          border-radius: 50%;
          box-shadow: 0px 0px 8px gray;
          margin: 0.75rem 0.75rem;
          background-color: #E3EAF5;
        }

        .shuffle p {
          font-size: 8px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
