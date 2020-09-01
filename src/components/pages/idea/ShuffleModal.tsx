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
      <button className="shuffle-btn"　onClick={fetchIdeas}>
        <Shuffle className="shuffle-btn_icon" size={18} />
        <span className="shuffle-btn_text">もう一度シャッフル</span>
      </button>
      <style jsx>{`
        .container {
          background-color: white;
          width: 90%;
          height: 75%;
          position: absolute;
          top: calc(50vh - 24px);
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
        .close-btn {
          position: absolute;
          cursor: pointer;
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
        .add-btn:hover{
          background: #EC920C;
          color: #white;
        }

        .shuffle {
          text-align: center;
        }

        .shuffle-btn {
          display: flex;
          padding: 8px 16px;
          box-sizing: border-box;
          border-radius: 36px;

          position: absolute;
          top: 480px;

          background: #FFFFFF;
          color: #579AFF;
          border: 1px solid #579AFF;

          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
        }
        .shuffle-btn:hover{
          background: #579AFF;
          color: white;
        }
        .shuffle-btn_icon{
          margin-right: 8px;
        }
        .shuffle-btn_text{
          font-size: 14px;
          font-weight: bold;
          margin-left: 6px;
        }
        .genre-tag-container{
          display: none;
        }
      `}</style>
    </div>
  );
}
