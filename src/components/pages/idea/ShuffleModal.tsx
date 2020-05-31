import React, { useState, useEffect } from "react";
import axios from 'axios';
import { X, Check, Shuffle, ArrowRight } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import { Card } from './Card';


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
      <div className="title-container">
        <span className="close-btn" onClick={props.closeShuffleModal}>
          <X size={24} color="#333" />
        </span>
        <span className="title">アイデアをシャッフルしました！</span>
      </div>
      <div className="cards-container">
        <Card 
          idea={idea1}
          cardWidth={"100%"}
          cardHeight={"144px"}
          backgroundColor={"#FCFCFC"}
          boxShadow={"0px 0px 12px 0px lightgray"}
          cardContentLine={2}
          disabled={true}
        />
        <div className="cross">
          <X size={24} color="#333" />
        </div>
        <Card
          idea={idea2}
          cardWidth={"100%"}
          cardHeight={"144px"}
          backgroundColor={"#FCFCFC"}
          boxShadow={"0px 0px 12px 0px lightgray"}
          cardContentLine={2}
          disabled={true}
        />
      </div>
      <div className="add-btn_container">
        <button className="add-btn" onClick={onClick}>
          <span className="add-btn_text">
           アイデアを追加する
          </span>
          <ArrowRight size={24} color="#333" />
        </button>
      </div>
      <div className="shuffle">
        <button onClick={fetchIdeas}>
          <Shuffle size={40} color="#333" />
        </button>
        <p>もう一度シャッフル</p>
      </div>
      <style jsx>{`
        .container {
          width: 90%;
          max-width: 360px;
          height: 620px;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 24px 14px;
          background-color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          -webkit-transform: translate(-50%, -40%);
          -ms-transform: translate(-50%, -40%);
          overflow: scroll;
          z-index: 200;
        }

        .title-container{
          width: 100%;
          height: 24px;
          margin-bottom: 24px;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 14px;
          line-height: 28px;
          color: #333;
        }
        .close-btn {
          position: absolute;
        }

        .cards-container {
          margin-bottom: 24px;
        }

        .cross {
          text-align: center;
          margin: 4px auto;
        }

        .add-btn_container{
          width: fit-content;
          margin: 24px auto;
        }
        .add-btn{
          background: #FEB342;
          border-radius: 4px;
          padding: 6px 16px;
          display: flex;
          align-items: center;
        }
        .add-btn_text{
          margin-right: 4px;
          font-size: 14px;
        }

        .shuffle {
          text-align: center;
        }

        .shuffle button {
          padding: 12px;
          height: 64px;
          width: 64px;
          border-radius: 50%;
          background-color: #E3EAF5;
          margin-bottom: 12px;

        }

        .shuffle p {
          font-size: 8px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
