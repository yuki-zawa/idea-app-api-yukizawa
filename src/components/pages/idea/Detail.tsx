import React, { useState, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "24px"
};

export const IdeaDetail: React.FC = () => {
  const { match }: any = useReactRouter();
  const [idea, setIdea] = useState({
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
  const [showLoader, setShowLoader] = React.useState(false);
  const [editState, setEditState] = React.useState(false);

  const fetchIdeas = async () => {
    setShowLoader(true);

    let response = await axios
      .get(`/api/v1/ideas/${match.params.id}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => {
        setShowLoader(false);
      });
      setIdea(response);
  }


  const editMode = () => {
    console.log("edit mode!!!!!!!!!");
    setEditState(true);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);
  console.log(idea)
  return (
    <HomeLayout title="idea list">
      <div className="container">
        <div className="top-part"> 
          <Link to='/home' style={backLinkStyle}>←</Link>
          { showLoader ? "" : <div className="edit" onClick={editMode}>✏︎</div> }
        </div>
        {
          showLoader ?
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <CircularProgress style={{ margin: "24px auto" }}/>
            </div> :
            <div>
              <p className="icon">{idea.icon ? idea.icon : "😓"}</p>
              {/* https://material-ui.com/components/rating/ */}
              <Rating 
                name="size-large"
                size="large"
                style={{fontSize: "30px"}}
                defaultValue={idea.priority}
                value={idea.priority}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  console.log(event);
                }}
                onChangeActive={(event, newHover) => {
                  console.log(newHover);
                  console.log(event);
                }}
                // readOnly
              />
              <h1 className="idea-title">{idea.title}</h1>
              <hr/>
              <div className="genre-tag-container">
                <p>カテゴリータグ</p>
                <span className="genre-tag tag">✔︎{idea.genre_tags[0].name}</span> 
              </div>
              <div className="idea-tag-container">
                <p>アイデアタグ</p>
                {
                  idea.idea_tags.map((tag: any, index: number) => {
                    return(
                      <span className="idea-tag tag" key={index}>✔︎{tag.name}</span>
                    )
                  })
                }
              </div>
              <p className="memo-label">メモ</p>
              <div className="memo-container">
                <p className="text">{idea.detail}</p>
              </div>
            </div>
        }
      </div>
      <style jsx>{`
        .container {
          height: 100%;
          background-color: white;
          padding: 1.25rem 1rem;
          padding-top: calc(1.25rem + 40px);
        }

        .top-part {
          margin-bottom: 24px;
        }

        hr {
          border-top: 4px dashed lightgray;
        }

        .edit {
          display: inline-block;
          float: right;
          height: 24px;
          width: 24px;
          line-height: 24px;
          font-size: 24px;
          font-weight: bold;
        }

        .icon {
          height: 48px;
          width: 48px;
          font-size: 48px;
          margin-bottom: 16px;
        }

        .idea-title {
          margin: 0.75rem 0;
          font-size: 24px;
          overflow-x: scroll;
        }

        .plus {
          display: inline-block;
          margin-right: 8px;
          font-size: 30px;
          font-weight: 400;
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

        .genre-tag-container, .idea-tag-container, .memo-label {
          margin-bottom: 5px;
        }

        .genre-tag-container p, .idea-tag-container p {
          margin: 0.5rem 0;
        }

        .idea-tag-container {
          height: 64px;
          width: auto;
          white-space: nowrap;
          overflow-x: auto;
          -ms-overflow-style: none;
        }

        .idea-tag-container::-webkit-scrollbar {
          display:none;
        }

        .genre-tag {
          background-color: ${idea.genre_tags[0].color};
        }

        .idea-tag {
          margin-right: 8px;
          background-color: #E3EAF5;
        }

        .memo-container {
          height: 160px;
          overflow-y: scroll;
          border: 1px black solid;
        }

        .text {
          padding: 1rem 0.75rem;
        }
      `}</style>
    </HomeLayout>
  );
}
