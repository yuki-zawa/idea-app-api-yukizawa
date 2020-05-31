import React from "react";
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';

type CardProps = {
  idea: any,
  cardWidth: string,
  cardHeight: string,
  cardContentLine: number,
  boxShadow?: string,
  backgroundColor?: string,
  disabled?: boolean
};

export const Card: React.FC<CardProps> = (props: any) => {
  const cardLinkStyle = {
    display: "inline-block",
    width: `${props.cardWidth}`,
    height: ``,
    margin: "1%",
    cursor: "pointer",
    backgroundColor: `${props.backgroundColor ? props.backgroundColor : "white"}`,
    marginBottom: "12px",
    borderRadius: "4px",
    boxShadow: `${props.boxShadow ? props.boxShadow : "0 0px 4px rgba(0,0,0,0.2)"}`,
    verticalAlign: "top",
  };

  return (
    <Link to={`/ideas/${props.idea.id}/detail`} style={cardLinkStyle} onClick={(event) => props.disabled ? event.preventDefault() : ""}>
      <div className="card-container">
        <div className="title-container">
          <span className="icon">{props.idea.icon ? <Emoji size={20} emoji={props.idea.icon } /> : "😓"}</span>
          <span className="title-text">{props.idea.title}</span>
        </div>
        <div className="priority-container">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0.5L10.3175 5.195L15.5 5.9525L11.75 9.605L12.635 14.765L8 12.3275L3.365 14.765L4.25 9.605L0.5 5.9525L5.6825 5.195L8 0.5Z" fill="#FEB342" stroke="#FEB342" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{!!props.idea.priority ? props.idea.priority : '-'}</span>
        </div>
        <div className="genre-tag-container">
          {/* ジャンルタグは基本一つ */}
          {props.idea.genre_tags[0] ? <span className="genre-tag tag">{props.idea.genre_tags[0].name}</span> : ""}
        </div>
        <div className="idea-tag-container">
          {
            props.idea.idea_tags.map((tag: any, index: number) => {
              return(
                <span className="idea-tag tag" key={index}>{tag.name}</span>
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
          height: ${props.cardHeight};
          padding: 8px 4px;
          box-sizing: border-box;
          border: 1px solid #C4C4C4;
          border-radius: 4px;
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

        .priority-container {
          margin-bottom: 8px;
          color: #FEB342;
        }

        .priority-container span {
          font-weight: bold;
          vertical-align: top;
        }

        .tag {
          display: inline;
          padding: 2px 6px 1px 6px;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .genre-tag-container {
          margin-bottom: 8px;
        }

        .idea-tag-container {
          width: 100%;
          white-space:nowrap;
          -ms-overflow-style: none;
          display: flex;
          flex-direction: row;
          margin-bottom: 14px;
        }

        .idea-tag-container::-webkit-scrollbar {
          display:none;
        }

        .genre-tag {
          background-color: ${props.idea.genre_tags[0] ? props.idea.genre_tags[0].color : ''};
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
          -webkit-line-clamp: ${props.cardContentLine};
        }
      `}
      </style>
    </Link>

  );
}