import React from "react";
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';
import { ReactComponent as DefaultIcon } from './../../images/defaulticon.svg';

type CardProps = {
  idea: any,
  cardWidth?: string,
  cardHeight?: string,
  cardContentLine?: number,
  marginBottom?: number,
  boxShadow?: string,
  backgroundColor?: string,
  disabled?: boolean
};

export const Card2: React.FC<CardProps> = (props: any) => {
  const cardLinkStyle = {
    display: "inline-block",
    width: `${props.cardWidth ? props.cardWidth : "100%"}`,
    marginBottom: `${props.marginBottom ? props.marginBottom : "12px"}`,
    cursor: "pointer",
    backgroundColor: `${props.backgroundColor ? props.backgroundColor : "white"}`,
    borderRadius: "4px",
    boxShadow: `${props.boxShadow ? props.boxShadow : "rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px"}`,
    verticalAlign: "top",
  };

  return (
    <Link to={`/ideas/${props.idea.id}/detail`} style={cardLinkStyle} onClick={(event) => props.disabled ? event.preventDefault() : ""}>
      <div className="card-container">
        <div className="title-container">
          <span className="icon">{props.idea.icon ? <Emoji size={20} emoji={props.idea.icon } /> : <DefaultIcon />}</span>
          <span className="title-text">{props.idea.title}</span>
        </div>
        <div className="contents">
            <div className="priority-container">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0.5L10.3175 5.195L15.5 5.9525L11.75 9.605L12.635 14.765L8 12.3275L3.365 14.765L4.25 9.605L0.5 5.9525L5.6825 5.195L8 0.5Z" fill="#FEB342" stroke="#FEB342" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span style={{color:"#feb342"}}>{!!props.idea.priority ? props.idea.priority : '-'}</span>
            </div>
            <div className="tag-container">
            {/* ジャンルタグは基本一つ */}
            {props.idea.genre_tags[0] ? <span className="genre-tag tag">{props.idea.genre_tags[0].name}</span> : ""}
            {
                props.idea.idea_tags.map((tag: any, index: number) => {
                return(
                    <span className="idea-tag tag" key={index}>{tag.name}</span>
                )
                })
            }
            </div>
        </div>
      </div>
      <style jsx>
      {`
        .card-container{
          height: ${props.cardHeight};
          padding: 8px 12px;
          box-sizing: border-box;
          border: 1px solid rgba(196, 196, 196, 0.5);;
          border-radius: 4px;
        }

        .icon {
          display: inline-block;
          height: 20px;
          width: 20px;
        }

        .title-text {
          margin-left: 10px;
          font-size: 16px;
          width: calc(100% - 30px);
          line-height: 1.2em;
        }

        .title-container {
          margin-bottom: 2%;
          display: flex;
        }

        .contents{
          display: flex;
        }

        .priority-container {
          width: 30px;    
          color: #FEB342;
        }

        .priority-container span {
          font-weight: bold;
          vertical-align: top;
        }

        .tag {
          display: inline;
          font-size: 14px;
          line-height: 14px;
          padding: 4px 6px;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tag-container {
          width: calc(100% - 40px);
          height: 21px;
          display: flex;
          align-items: center;

          white-space:nowrap;
          -ms-overflow-style: none;
          flex-direction: row;
          overflow-x: hidden;
        }

        .tag-container::-webkit-scrollbar {
          display:none;
        }

        .genre-tag {
          margin-right: 8px;
          background-color: ${props.idea.genre_tags[0] ? props.idea.genre_tags[0].color : ""};
        }

        .idea-tag {
          margin-right: 8px;
          background-color: #E3EAF5;
        }
      `}
      </style>
    </Link>

  );
}