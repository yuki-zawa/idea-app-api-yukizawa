import React from "react";
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';
import { ReactComponent as DefaultIcon } from './../../images/defaulticon.svg';
import Text, { TextThemes } from "../../atoms/Text";
import Image, { ImageThemes } from "../../atoms/Image";
import Star from './../../images/star.svg';
import CommonStyle from "../../../common/CommonStyle";
import { Idea } from "../../../types/Idea";

type CardProps = {
  idea: Idea,
  width: string,
  height: string,
  contentLine: number,
  boxShadow?: string,
  backgroundColor?: string,
  tagNotDisplay?: boolean,
  disabled?: boolean
};

export const Card: React.FC<CardProps> = ({ idea, width, height, contentLine, boxShadow, backgroundColor='white', tagNotDisplay, disabled }) => {
  const cardLinkStyle = {
    display: "inline-block",
    width: `${width}`,
    maxWidth: `300px`,
    margin: "1%",
    cursor: "pointer",
    backgroundColor: backgroundColor,
    marginBottom: "12px",
    borderRadius: "4px",
    boxShadow: `${boxShadow ? boxShadow : "rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px"}`,
    verticalAlign: "top",
  };

  return (
    idea ? 
    <Link to={`/ideas/${idea.id}/detail`} style={cardLinkStyle} onClick={(event) => disabled ? event.preventDefault() : ""}>
      <div className="card-container">
        <div className="main-container">
          <div className="header-container">
            <span className="icon">{idea.icon ? <Emoji size={20} emoji={idea.icon} /> : <DefaultIcon />}</span>
            <div className="priority-container">
              <Image src={Star} theme={[ImageThemes.STAR]} />
              <span>{!!idea.priority ? idea.priority : '-'}</span>
            </div>
          </div>
          <div className="title-container">
            <Text theme={[TextThemes.IDEA_CARD_TITLE]}>{idea.title}</Text>
          </div>
          <div className="memo-container">
            <Text theme={[TextThemes.IDEA_CARD_DETAIL]}>{idea.detail}</Text>
          </div>
        </div>
        {
          tagNotDisplay ? '' : 
          <>
            <div className="genre-tag-container">
              {/* ジャンルタグは基本一つ */}
              {idea.genreTags[0] ? <span className="genre-tag tag">{idea.genreTags[0].name}</span> : ""}
            </div>
            <div className="idea-tag-container">
              {
                idea.ideaTags.map((tag: any, index: number) => {
                  return(
                    <span className="idea-tag tag" key={index}>{tag.name}</span>
                  )
                })
              }
            </div>
          </>
        }
      </div>
      <style jsx>
      {`
        .card-container{
          height: ${height};
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
          margin-right: 4px;
        }
        .priority-container {
          display: inline-block;
          color: #FEB342;
          display: flex;
          align-items: center;
        }
        .title-container{
          width: 100%;
          height: 36px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .memo-container{
          width: 100%;
          overflow: hidden;
          margin-bottom: 8px;
          height: 48px;
        }

        .priority-container span {
          font-weight: bold;
          vertical-align: middle;
          color: ${CommonStyle.Color.Star};
        }

        .genre-tag-container {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 10px 6px 10px;
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
          background-color: ${idea.genreTags[0] ? idea.genreTags[0].color : ''};
        }

        .idea-tag {
          margin-right: 8px;
          background-color: rgb(232, 240, 254);
        }

        
      `}
      </style>
    </Link> : null
  );
}