import React, { useState, useRef, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import { useHistory } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
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

export interface AddParam {
  idea: any,
  genre_tag: any,
  idea_tags: any,
  ideas: any
}

const priorityLables = ["ひらめき度を設定しよう", "いいことを思いついた！", "なかなかいいひらめきだ！", "これはすごいひらめきだ！", "君は天才だ！", "世紀の大発見だ！"];

export const AddModal: React.FC = (props: any) => {
  const history = useHistory();
  const iconRef = useRef(document.createElement("select"));
  const titleRef = useRef(document.createElement("input"));
  const memoRef = useRef(document.createElement("textarea"));
  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [tagState, setTagState] = useState(""); // "genre" or "idea"

  const [selectedGenreTag, setSelectedGenreTag] = useState({
    id: 0,
    name: "",
    color: "",
  });
  const [selectedIdeaTags, setSelectedIdeaTags] = useState([]);
  const [addData, setAddData] = useState<AddParam>({
    idea: {
      icon: "",
      title: "",
      detail: "",
      priority: 0,
    },
    genre_tag: {},
    idea_tags: [],
    ideas: []
  });

  const postIdea = async () => {
    var tempIdeas :Array<any> = [];
    if(props.location.state && props.location.state.originIdeas){
      props.location.state.originIdeas.map((idea: any) => {
        tempIdeas.push({"id": idea.id})
      });
    }
    await axios
      .post('/api/v1/ideas', {
        ...addData,
        ideas: tempIdeas
      })
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

  useEffect(() => {
    var temp :Array<any> = [];
    selectedIdeaTags.map((tag: any) => {
      temp.push({"id": tag.id})
    });
    setAddData({
      ...addData,
      genre_tag: {
        id: selectedGenreTag.id
      },
      idea_tags: temp
    })
  },[selectedIdeaTags, selectedGenreTag]);

  return (
    <HomeLayout title="STOCKROOM">
      <div className="container">
        <div className="top-part"> 
          <button onClick={() => history.goBack()} style={backLinkStyle}>←</button>
        </div>
        <div className="input-container">
          <div>
            <select name="category" id="category" onChange={changeCategory} ref={iconRef} className="styled-select">
              <option value="アイコンを選択 ▼">アイコンを選択 ▼</option>
              {
                Icon.icons.map((icon: any, i) => {
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
              style={{height: "40px", lineHeight: "40px"}}
              defaultValue={0}
              onChange={(event, newValue) => {
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
            <div className="priority">
              <p className="priority-label">{addData.idea.priority ? priorityLables[addData.idea.priority] : priorityLables[0]}</p>
            </div>
          </div>
          <div>
            <input 
              ref={titleRef}
              onChange={changeTitle}
              placeholder="アイデアを一言で表すと？"
              type="text"
              className="title-input"
            />
          </div>
          <hr/>
          <p>カテゴリータグ</p>
          <div className="genre-tag-container">
            <span className="plus" id="genre" onClick={openModal}>+</span>
            {selectedGenreTag.id !== 0 ? 
            <span className="genre-tag tag" style={{backgroundColor: selectedGenreTag.color}}>
              <X size={14} onClick={(event) => selectDelete("genre", event)}/>
              <span className="tag-name">{selectedGenreTag.name}</span>
            </span> : ""}
          </div>
          <p>アイデアタグ</p>
          <div className="idea-tag-container">
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
          <p className="memo-label">メモ</p>
          <textarea ref={memoRef} className="memo-container" placeholder="メモをしよう！" onChange={changeDetail}/>
        </div>
        {props.location.state ? 
          <div className="origin-idea">
            <p>シャッフルした元のアイデア</p>
            {props.location.state.originIdeas.map((idea: any) => {
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
        <button onClick={postIdea} className="add-btn">追加する</button>
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
        <style jsx>{`
        
          .container {
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

          .add-btn {
            display: block;
            width: 200px;
            background-color: #FEB342;
            padding: 0.5rem 1.25rem;
            margin: 1rem auto;
            border-radius: 5px;
            font-size: 12px;
            font-weight: bold;
          }

          .tag-name {
            vertical-align: text-top;
          }

          .origin-idea {
            margin-top: 16px;
          }

          .origin-idea p {
            margin: 8px 0;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}
