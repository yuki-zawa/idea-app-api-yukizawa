import React from "react";

import { Link } from 'react-router-dom';

type CardProps = {
  idea: any
};

const cardLinkStyle = {
  display: "inline-block",
  width: "48%",
  margin: "1%",
  cursor: "pointer",
  backgroundColor: "white",
  marginBottom: "16px",
  borderRadius: "5px",
  boxShadow: "2px 2px 3px lightgray",
  verticalAlign: "top"

};

export const Card: React.FC<CardProps> = (props: any) => {
  console.log(props.idea);
  return (
    <Link to={`/ideas/${props.idea.id}`} style={cardLinkStyle}>
      <div className="card-container">
        <div className="title-container">
          <span className="icon">{props.idea.icon ? props.idea.icon : "😓"}</span>
          <span className="title-text">{props.idea.title}</span>
        </div>
        <div className="genre-tag-container">
          {/* ジャンルタグは基本一つ */}
          <span className="genre-tag tag">✔︎{props.idea.genre_tags[0].name}</span>
        </div>
        <div className="idea-tag-container">
          {
            props.idea.idea_tags.map((tag: any, index: number) => {
              return(
                <span className="idea-tag tag" key={index}>✔︎{tag.name}</span>
              )
            })
          }
        </div>
        <div className="text-container">
          <p>{props.idea.detail}</p>
        </div>
      </div>
      <style jsx>
      {`
        .card-container{
          height: 175px;
          padding: 0.75rem 0.5rem;
        }

        .icon {
          display: inline-block;
          height: 20px;
          width: 20px;
        }

        .title-text {
          display: inline-block;
          margin-left: 10px;
          font-size: 16px;
          font-weight: 500;
          width: calc(100% - 35px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .title-container {
          margin-bottom: 2%;
        }

        .tag {
          display: inline-block;
          width: 100px;
          padding: 0.25rem 0.25rem;
          border-radius: 4px;
          box-shadow: 2px 2px 3px lightgray;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .genre-tag-container, .idea-tag-container {
          margin-bottom: 5px;
        }

        .idea-tag-container {
          height: 30px;
          width: auto;
          white-space:nowrap;
          overflow-x: auto;
          -ms-overflow-style: none;
        }

        .idea-tag-container::-webkit-scrollbar {
          display:none;
        }

        .genre-tag {
          background-color: ${props.idea.genre_tags[0].color};
        }

        .idea-tag {
          margin-right: 8px;
          background-color: #E3EAF5;
        }

        .text-container{
          width: 100%;
          overflow: hidden;
        }

        .text-container p{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      `}
      </style>
    </Link>

  );
}