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
          <X size={18} color="#333" />
        </span>
        <span className="title">ひらめきをシャッフルしました！</span>
      </div>
      <div className="cards-container">
        <Card 
          idea={idea1}
          cardWidth={"100%"}
          cardHeight={"144px"}
          backgroundColor={"#FCFCFC"}
          cardContentLine={2}
          disabled={true}
          tagNotDisplay={true}
        />
        <Card
          idea={idea2}
          cardWidth={"100%"}
          cardHeight={"144px"}
          backgroundColor={"#FCFCFC"}
          cardContentLine={2}
          disabled={true}
          tagNotDisplay={true}
        />
      </div>
      <div className="add-btn_container">
        <button className="add-btn" onClick={onClick}>ひらめきを追加する</button>
      </div>
      <button className="shuffle-btn"　onClick={fetchIdeas}>
        <Shuffle className="shuffle-btn_icon" size={18} />
        <span className="shuffle-btn_text">もう一度シャッフル</span>
      </button>
      <style jsx>{`
        .container {
          z-index: 1000;
          position: absolute;
          top: calc(50vh - 24px);
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);

          width: 90%;
          max-width: 320px;
          height: 456px;
          border-radius: 6px;
          box-sizing: border-box;
          border: 1px solid #C4C4C4;
          padding: 20px 18px;
          background-color: white;
          
          overflow: visible;
        }
        
        .title-container{
          width: 100%;
          height: 24px;
          margin-bottom: 24px;
        }
        .title {
          display: block;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          color: #7A7A7A;
        }
        .close-btn {
          position: absolute;
          cursor: pointer;
        }

        .cards-container {
          margin-bottom: 12px;
        }

        .cross {
          text-align: center;
          margin-bottom: 12px;
        }

        .add-btn_container{
          width: fit-content;
          margin: 0 auto 24px auto;
        }
        .add-btn{
          background: #FEB342;
          border-radius: 4px;
          padding: 6px 16px;
          text-align: center;
          font-size: 16px;
          color: #333;
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
