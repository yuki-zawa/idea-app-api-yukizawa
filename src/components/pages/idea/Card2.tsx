import React from "react";
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';
import { ReactComponent as DefaultIcon } from './../../images/defaulticon.svg';
import Image, { ImageThemes } from "../../atoms/Image";
import Star from './../../images/star.svg';
import CommonStyle from "../../../common/CommonStyle";
import { IdeaTag } from "../../../types/IdeaTag";

type CardProps = {
  idea: any,
  width?: string,
  height?: string,
  contentLine?: number,
  marginBottom?: number,
  boxShadow?: string,
  backgroundColor?: string,
  disabled?: boolean
};

export const Card2: React.FC<CardProps> = ({idea, width='100%', height, contentLine, marginBottom='12px', boxShadow, backgroundColor='white', disabled }) => {
  const cardLinkStyle = {
    display: "inline-block",
    width: width,
    maxWidth: "1000px",
    margin: "1%",
    marginBottom: marginBottom,
    cursor: "pointer",
    backgroundColor: backgroundColor,
    borderRadius: "4px",
    boxShadow: `${boxShadow ? boxShadow : "rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px"}`,
    verticalAlign: "top",
  };

  return (
    <Link to={`/ideas/${idea.id}/detail`} style={cardLinkStyle} onClick={(event) => disabled ? event.preventDefault() : ""}>
      <div className="card-container">
        <div className="title-container">
          <span className="icon">{idea.icon ? <Emoji size={20} emoji={idea.icon } /> : <DefaultIcon />}</span>
          <span className="title-text">{idea.title}</span>
        </div>
        <div className="contents">
          <div className="priority-container">
            <Image src={Star} theme={[ImageThemes.STAR]} />
            <span>{!!idea.priority ? idea.priority : '-'}</span>
          </div>
          <div className="tag-container">
          {/* ジャンルタグは基本一つ */}
          {idea.genreTags[0] ? <span className="genre-tag tag">{idea.genreTags[0].name}</span> : ''}
          {
            idea.ideaTags.map((tag: IdeaTag, index: number) => {
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
          height: ${height};
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
          color: ${CommonStyle.Color.Star};
        }

        .tag {
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
          background-color: ${idea.genreTags[0] ? idea.genreTags[0].color : ""};
        }

        .idea-tag {
          margin-right: 8px;
          background-color: rgb(232, 240, 254);
        }
      `}
      </style>
    </Link>

  );
}