import React, { useState, useRef, useContext } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import useReactRouter from "use-react-router";
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import { AuthContext } from './../../common/context/provider'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { IdeaList } from "./List";

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "24px"
};

export interface AddParam {
  idea: any,
  genre_tag: any,
  idea_tags: any
}

const icons = ["😆", "😅", "💦", "😱"]

export const AddModal: React.FC = () => {
  const iconRef = useRef(document.createElement("select"));
  const titleRef = useRef(document.createElement("input"));
  const memoRef = useRef(document.createElement("textarea"));


  const { authState } = useContext(AuthContext);
  console.log(authState.user)

  const [addData, setAddData] = useState<AddParam>({
    idea: {
      icon: "",
      title: "",
      detail: "",
      priority: 0,
    },
    genre_tag: {},
    idea_tags: []
  });

  const postIdea = async () => {
    console.log(addData);
    // なぜか404 error API testerではうまくいく
    await axios
      .post('/api/v1/ideas', addData)
      .then(res => {
        window.location.href = "/home";
      })
      .catch(err => console.log(err));
  }

  const changeCategory = (e: any) => {
    setAddData({
      ...addData,
      idea: {
        ...addData.idea,
        icon: e.target.value
      }
    })
  }

  const changeTitle = () => {
    setAddData({
      ...addData,
      idea: {
        ...addData.idea,
        title: titleRef.current.value
      }
    })
  }

  const changeDetail = () => {
    setAddData({
      ...addData,
      idea: {
        ...addData.idea,
        detail: memoRef.current.value
      }
    })
  }

  return (
    <HomeLayout title="idea list">
      <div className="container">
        <div className="top-part"> 
          <Link to='/home' style={backLinkStyle}>←</Link>
        </div>
        <div>
          <div>
            <select name="category" id="category" onChange={changeCategory} ref={iconRef}>
              <option value="アイコンを選択 ▼">アイコンを選択 ▼</option>
              {
                icons.map((icon: any, i) => {
                  return <option value={icon} key={i}>{icon}</option>
                })
              }
            </select>
          </div>
          {/* https://material-ui.com/components/rating/ */}
          <div>
            <Rating 
              name="size-large"
              size="large"
              style={{fontSize: "30px"}}
              defaultValue={0}
              onChange={(event, newValue) => {
                console.log(newValue);
                console.log(event);
                setAddData({
                  ...addData,
                  idea: {
                    ...addData.idea,
                    priority: newValue
                  }
                })
              }}
              onChangeActive={(event, newHover) => {
                console.log(newHover);
                console.log(event);
              }}
          />
          </div>
          <div>
            <label>タイトル</label>
            <input ref={titleRef} onChange={changeTitle} type="text" />
          </div>
          <hr/>
          <div className="genre-tag-container">
            <p>カテゴリータグ</p>
            <span className="plus">+</span>
            {/* <span className="genre-tag tag">✔︎{idea.genre_tags[0].name}</span>  */}
          </div>
          <div className="idea-tag-container">
            <p>アイデアタグ</p>
            <span className="plus">+</span>
            {/* {
            idea && idea.idea_tags.map((tag: any, index: number) => {
                return(
                  <span className="idea-tag tag" key={index}>✔︎{tag.name}</span>
                )
              })
            } */}
          </div>
          <p className="memo-label">メモ</p>
          <textarea ref={memoRef} className="memo-container" placeholder="メモをしよう！" onChange={changeDetail}/>
        </div>
        <button onClick={postIdea}>追加する</button>
        <style jsx>{`
          .container {
            height: calc(100vh - 72px);
            background-color: white;
            padding: 1.25rem 1rem;
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

          .idea-tag {
            margin-right: 8px;
            background-color: #E3EAF5;
          }

          .memo-container {
            height: 160px;
            width: 100%;
            overflow-y: scroll;
            border: 1px black solid;
          }

          .text {
            padding: 1rem 0.75rem;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}
