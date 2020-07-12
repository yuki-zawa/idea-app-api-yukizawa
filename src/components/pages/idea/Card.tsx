import React from "react";
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';
import { ReactComponent as DefaultIcon } from './../../images/defaulticon.svg';

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
    boxShadow: `${props.boxShadow ? props.boxShadow : "rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px"}`,
    verticalAlign: "top",
  };

  return (
    <Link to={`/ideas/${props.idea.id}/detail`} style={cardLinkStyle} onClick={(event) => props.disabled ? event.preventDefault() : ""}>
      <div className="card-container">
        <div className="main-container">
          <div className="header-container">
            <span className="icon">{props.idea.icon ? <Emoji size={20} emoji={props.idea.icon } /> : <DefaultIcon />}</span>
            <div className="priority-container">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0.5L10.3175 5.195L15.5 5.9525L11.75 9.605L12.635 14.765L8 12.3275L3.365 14.765L4.25 9.605L0.5 5.9525L5.6825 5.195L8 0.5Z" fill="#FEB342" stroke="#FEB342" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{color:"#feb342"}}>{!!props.idea.priority ? props.idea.priority : '-'}</span>
            </div>
          </div>
          <div className="title-container">
            <h1 className="title-text">{props.idea.title}</h1>
          </div>
          <div className="memo-container">
            <p className="memo-text">{props.idea.detail}</p>
          </div>
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
        
        
      </div>
      <style jsx>
      {`
        .card-container{
          height: ${props.cardHeight};
          box-sizing: border-box;
          border: 1px solid rgba(196, 196, 196, 0.5);;
          border-radius: 4px;
        }
        .main-container{
          border-bottom: 1px solid #F1F1F1;
          padding: 10px;
          height: 120px;
        }
        .header-container{
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .icon {
          display: inline-block;
          height: 20px;
          width: 20px;
        }
        .priority-container {
          display: inline-block;
          color: #FEB342;
        }
        .title-container{
          width: 100%;
          height: 36px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .title-text {
          line-height: 18px;
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .memo-container{
          width: 100%;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .memo-text{
          font-size: 14px;
          line-height: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          // -webkit-line-clamp: ${props.cardContentLine};
        }


        

        .priority-container span {
          font-weight: bold;
          vertical-align: top;
        }

        .genre-tag-container {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 10px 8px 10px;
          display: flex;
          align-items: center
          flex-direction: row;
          overflow-x: hidden;
        }
        .idea-tag-container {
          width: 100%;
          box-sizing: border-box;
          padding: 0 10px 10px 10px;
          display: flex;
          align-items: center
          flex-direction: row;
          white-space:nowrap;
          -ms-overflow-style: none;
          overflow-x: hidden;
        }
        .idea-tag-container::-webkit-scrollbar {
          display:none;
        }

        .tag{
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          line-height: 14px;
          color: #333;
          border-radius: 2px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .genre-tag {
          background-color: ${props.idea.genre_tags[0] ? props.idea.genre_tags[0].color : ''};
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