import React, { useState, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import useReactRouter from "use-react-router";
import { useHistory } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import { AddTagModal } from './../tag/AddModal'
import { Icon } from './../../common/Const'
import { X } from 'react-feather';
import { Card } from './Card'

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "24px"
};

export interface EditParam {
  idea: any,
  genre_tag: any,
  idea_tags: any
}

const priorityLables = ["ひらめき度を設定しよう", "いいことを思いついた！", "なかなかいいひらめきだ！", "これはすごいひらめきだ！", "君は天才だ！", "世紀の大発見だ！"];

export const IdeaDetail: React.FC = (props: any) => {
  const history = useHistory();
  const { match }: any = useReactRouter();
  const [idea, setIdea] = useState({
    icon: "",
    title: "",
    detail: "",
    priority: 0,
    genre_tags: [{
      id: 0,
      name: "",
      color: ""
    }],
    idea_tags: [],
    followers: new Array()
  });
  const [editData, setEditData] = useState<EditParam>({
    idea: {
      icon: "",
      title: "",
      detail: "",
      priority: 0,
    },
    genre_tag: {
      id: 0
    },
    idea_tags: []
  })
//この下はやばい、直さないとやばい
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


  const [showLoader, setShowLoader] = React.useState(false);
  const [editState, setEditState] = React.useState(false);

  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [tagState, setTagState] = useState(""); // "genre" or "idea"

  const [selectedGenreTag, setSelectedGenreTag] = useState({
    id: 0,
    name: "",
    color: "",
  });
  const [selectedIdeaTags, setSelectedIdeaTags] = useState([]);

  const fetchIdea = async () => {
    setShowLoader(true);

    let response = await axios
      .get(`/api/v1/ideas/${match.params.id}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => {
        setShowLoader(false);
      });
      setIdea(response);
      setEditData({
        idea: {
          icon: response.icon,
          title: response.title,
          detail: response.detail,
          priority: response.priority,
        },
        genre_tag: {
          id: response.genre_tags[0].id,
          name: response.genre_tags[0].name,
          color: response.genre_tags[0].color,
        },
        idea_tags: response.idea_tags
      })
      setSelectedGenreTag(response.genre_tags[0]);
      setSelectedIdeaTags(response.idea_tags)
  }

  const putIdea = async () => {
    setShowLoader(true);
    let response = await axios
      .put(`/api/v1/ideas/${match.params.id}`, editData)
      .then((result: any) => result.data)
      .catch(error => console.log(error))
      .finally(() => {
        setShowLoader(false);
      });
    setIdea(response);
    setEditData({
      idea: {
        icon: response.icon,
        title: response.title,
        detail: response.detail,
        priority: response.priority,
      },
      genre_tag: {
        id: response.genre_tags[0].id,
        name: response.genre_tags[0].name,
        color: response.genre_tags[0].color,
      },
      idea_tags: response.idea_tags
    })
  }


  const editMode = () => {
    setEditState(true);
  };

  const completeEdit = () => {
    setEditState(false);
    putIdea();
  }

  const openModal = (event: any) => {
    setTagState(event.target.id);
    setOpenAddTagModal(true);
  }

  const closeModal = () => {
    setOpenAddTagModal(false);
  }

  const selectDelete = (type: string, event: any) => {
    if (type === "idea") {
      setSelectedIdeaTags(selectedIdeaTags.filter((tag: any) => tag.id !== Number(event.target.dataset.id)))
    } else {
      setSelectedGenreTag({
        id: 0,
        name: "",
        color: "",
      })
    }
  }

  const getIdeas = async () => {
    await axios
      .get(`/api/v1/ideas/${idea.followers[0].id}`)
      .then(result => setIdea1(result.data))
      .catch(error => console.log(error))
    
    await axios
      .get(`/api/v1/ideas/${idea.followers[1].id}`)
      .then(result => setIdea2(result.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    var temp :Array<any> = [];
    selectedIdeaTags.map((tag: any) => {
      temp.push({"id": tag.id})
    });
    setEditData({
      ...editData,
      genre_tag: {
        id: selectedGenreTag.id
      },
      idea_tags: temp
    })
  },[selectedIdeaTags, selectedGenreTag]);

  useEffect(() => {
    fetchIdea();
  }, []);

  useEffect(() => {
    if(idea.followers.length !== 0){
      getIdeas();
    }
  }, [idea]);

  return (
    <HomeLayout title="idea list">
      <div className="container">
        <div className="top-part"> 
          <button onClick={() => history.goBack()} style={backLinkStyle}>←</button>
          { !showLoader && !editState ? <div className="edit" onClick={editMode}>✏︎</div> : "" }
          { !showLoader && editState ? <button className="complete" onClick={completeEdit}>✏︎ 完了</button> : "" }
        </div>
        {
          showLoader ?
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <CircularProgress style={{ margin: "24px auto" }}/>
            </div> :
            <div className="input-container">
              {
                !editState ?
                  <p className="icon">{idea.icon ? idea.icon : "😓"}</p>
                  :<div>
                    <select name="category" id="category" className="styled-select">
                      <option value="アイコンを選択 ▼">アイコンを選択 ▼</option>
                      {
                        Icon.icons.map((icon: any, i) => {
                          return <option value={icon} key={i} selected={icon === editData.idea.icon} >{icon}</option>
                        })
                      }
                    </select>
                  </div>
                }
              {/* https://material-ui.com/components/rating/ */}
              <Rating 
                name="size-large"
                size="large"
                style={{fontSize: "30px"}}
                value={!editState ? idea.priority : editData.idea.priority}
                readOnly={!editState}
                onChange={(event, newValue) => {
                  setEditData({
                    ...editData,
                    idea: {
                      ...editData.idea,
                      priority: newValue
                    }
                  });
                }}
              />
              <div className="priority">
                {!editState ?
                  <p className="priority-label">{priorityLables[Math.round(idea.priority)]}</p>
                  :<p className="priority-label">{priorityLables[Math.round(editData.idea.priority)]}</p>
                }
              </div>
              {
                !editState ? 
                  <h1 className="idea-title">{idea.title}</h1>:
                  <div>
                    <input 
                      onChange={(event) => {
                        setEditData({
                          ...editData,
                          idea: {
                            ...editData.idea,
                            title: event.target.value
                          }
                        });
                      }}
                      value={editData.idea.title}
                      placeholder="アイデアを一言で表すと？"
                      type="text"
                      className="title-input"
                    />
                  </div>
              }
              <hr/>
              <p className="tag-label">カテゴリータグ</p>
              <div className="genre-tag-container">
                {
                  !editState ?
                  <span className="genre-tag tag">✔︎{idea.genre_tags[0].name}</span>:
                  <div>
                    <span className="plus" id="genre" onClick={openModal}>+</span>
                    {selectedGenreTag.id !== 0 ? 
                    <span className="genre-tag tag" style={{backgroundColor: selectedGenreTag.color}}>
                      <X size={14} onClick={(event) => selectDelete("genre", event)}/>
                      <span className="tag-name">{selectedGenreTag.name}</span>
                    </span> : ""}
                  </div>
                }
              </div>
              <p className="tag-label">アイデアタグ</p>
              <div className="idea-tag-container">
                {
                  !editState ?
                  idea.idea_tags.map((tag: any, index: number) => {
                    return(
                      <span className="idea-tag tag" key={index}>✔︎{tag.name}</span>
                    )
                  })
                  :
                  <div>
                    <span className="plus" id="idea" onClick={openModal}>+</span>
                    {
                      selectedIdeaTags && selectedIdeaTags.map((tag: any, index: number) => {
                        return(
                          <span className="idea-tag tag" key={index}>
                            <X size={14} onClick={(event) => selectDelete("idea", event)} data-id={tag.id}/>
                            <span className="tag-name">{tag.name}</span>
                          </span>
                        )
                      })
                    }
                  </div>
                }
              </div>
              <p className="memo-label">メモ</p>
              {
                !editState ?
                  <div className="memo-container">
                    <p className="text">{idea.detail}</p>
                  </div>
                :
                  <textarea
                    className="memo-container"
                    placeholder="メモをしよう！"
                    onChange={(event) => {
                      setEditData({
                        ...editData,
                        idea: {
                          ...editData.idea,
                          detail: event.target.value
                        }
                      });
                    }}
                    value={editData.idea.detail}
                  />
              }
            </div>
        }
        {idea.followers.length !== 0 ? 
          <div className="origin-idea">
            <p>シャッフルした元のアイデア</p>
            {[idea1, idea2].map((idea: any) => {
              return (
                <Card 
                  idea={idea}
                  cardWidth={"100%"}
                  cardHeight={"170px"}
                  backgroundColor={"#FCFCFC"}
                  cardContentLine={2}
                />
              )
            })}
          </div>
        : ""}
        { openAddTagModal ? 
            <AddTagModal 
              tagState={tagState}
              closeFunc={closeModal}
              selectedGenreTag={selectedGenreTag}
              setSelectedGenreTag={setSelectedGenreTag}
              selectedIdeaTags={selectedIdeaTags}
              setSelectedIdeaTags={setSelectedIdeaTags}
            /> : ""
        }
      </div>
      <style jsx>{`
        .container {
          height: 100%;
          background-color: white;
          padding: 1.25rem 1rem;
          padding-top: calc(1.25rem + 40px);
        }

        .input-container {
          padding-bottom: 16px;
          border-bottom: 2px dashed lightgray;
        }

        .styled-select {
          /* デフォルトのスタイルを解除 */
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          /* スタイル */
          display: inline-block;
          width: 70px;
          height: 70px;
          padding: 0.5em;
          cursor: pointer;
          font-size: 32px;
          border-radius: 4px;
          background-color: #f7f9fb;
        }

        /* IEでデフォルトの矢印を消す */
        .styled-select::-ms-expand {
          display: none;
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
        .complete {
          display: inline-block;
          float: right;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-weight: bold;
        }

        .icon {
          height: 48px;
          width: 48px;
          font-size: 48px;
          margin-bottom: 16px;
        }

        .priority {
          position: relative;
          display: inline-block;
          margin: 1em 0 1em 24px;
          padding: 7px 10px;
          min-width: 120px;
          max-width: 100%;
          font-size: 16px;
          background: #FEB342;
          border-radius: 5px;
        }
        
        .priority:before {
          content: "";
          position: absolute;
          top: 50%;
          left: -20px;
          margin-top: -8px;
          border: 8px solid transparent;
          border-right: 15px solid #FEB342;
        }

        .priority-label {
          margin: 0;
          padding: 0;
        }

        .idea-title {
          margin: 0.75rem 0;
          font-size: 24px;
          overflow-x: scroll;
          -ms-overflow-style: none;    /* IE, Edge 対応 */
          scrollbar-width: none;       /* Firefox 対応 */
        }

        .idea-title::-webkit-scrollbar {  /* Chrome, Safari 対応 */
          display:none;
        }

        .title-input {
          width: 95%;
          height: 16px;
          font-size: 16px;
          padding: 0.25rem 0.5rem;
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

        .tag-label {
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
          width: 100%;
        }

        .text {
          padding: 1rem 0.75rem;
        }

        .tag-name {
          vertical-align: text-top;
        }

        .origin-idea {
          padding-top: 16px;
          background-color: white;
        }

        .origin-idea p {
          margin: 8px 0;
        }
      `}</style>
    </HomeLayout>
  );
}
