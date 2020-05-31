import React, { useState, useRef, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import { useHistory } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
import { AddTagModal } from './../tag/AddModal'
import { Icon } from './../../common/Const'
import { X, Check } from 'react-feather';
import { Card } from './Card'
import StarIcon from '@material-ui/icons/Star';
import AddBtn from './../../images/add-btn.svg';

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
        window.location.pathname = "/home";
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
          <button onClick={() => history.goBack()} style={backLinkStyle}>
            <X size={24}/>
          </button>
          <p className="title">新しいアイデアを追加する</p>
          <button onClick={postIdea} className="add-btn">
            <Check size={24} color="#579AFF" />
          </button>
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
        <div className="input-container">
          <div className="add-icon-container">
            <select name="category" id="category" onChange={changeCategory} ref={iconRef} className="styled-select">
                <option className="icon-option1" value="" hidden>
                    ＋アイコンを追加する
                </option>
              <option value="アイコンを選択 ▼"></option>
              {
                Icon.icons.map((icon: any, i) => {
                  return <option value={icon} key={i}>{icon}</option>
                })
              }
            </select>
          </div>
          {/* https://material-ui.com/components/rating/ */}
          <div className="rating-container">
            <Rating 
              name="size-large"
              size="large"
              style={{height: "auto", lineHeight: "auto"}}
              defaultValue={0}
              className="star"
              icon={<StarIcon />}
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
          <div className="title-name-container">
            <input 
              ref={titleRef}
              onChange={changeTitle}
              placeholder="アイデアを一言で表すと？"
              type="text"
              className="title-input"
            />
          </div>

          <p className="tag-label">カテゴリータグ</p>
          <div className="genre-tag-container">
            <span className="plus" onClick={openModal}>
              <img src={AddBtn} alt="" id="genre"/>
            </span>
            {selectedGenreTag.id !== 0 ? 
            <span className="genre-tag tag" style={{backgroundColor: selectedGenreTag.color}}>
              <X className="tag-delete_icon" size={14} onClick={(event) => selectDelete("genre", event)}/>
              <span className="tag-name">{selectedGenreTag.name}</span>
            </span> : ""}
          </div>
          <p className="tag-label">アイデアタグ</p>
          <div className="idea-tag-container">
            <span className="plus" onClick={openModal}>
              <img src={AddBtn} alt="" id="idea"/>
            </span>
            {
              selectedIdeaTags && selectedIdeaTags.map((tag: any, index: number) => {
                return(
                  <span className="idea-tag tag" key={index}>
                    <X className="tag-delete_icon" size={14} onClick={(event) => selectDelete("idea", event)} data-id={tag.id}/>
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
        
        <style jsx>{`
          // header部分
          .top-part {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title{
            font-size: 14px;
            color: #333;
          }
          
          .container {
            background-color: white;
            padding: 1.25rem 1rem;
            padding-top: calc(1.25rem + 40px);
            z-index: 5;
          }

          // アイコン追加
          .icon {
            height: 48px;
            width: 48px;
            font-size: 48px;
            margin-bottom: 16px;
          }
          .add-icon-container{
            margin-bottom: 12px;
          }
          .input-container {
            padding-bottom: 16px;
            border-bottom: 2px dashed #E3EAF5;
            z-index: 1;
          }
          .styled-select {
            /* デフォルトのスタイルを解除 */
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            /* スタイル */
            width: 120px;
            height: 20px;
            font-size: 10px;
            #7A7A7A;
            display: inline-block;
            cursor: pointer;
            background: none;
            border: none;
          }
          /* IEでデフォルトの矢印を消す */
          .styled-select::-ms-expand {
            display: none;
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

          // 星
          .rating-container{
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .star{
            font-size: 24px;
          }
          .star label{
            font-size: 24px;
          }
          .priority {
            position: relative;
            display: inline-block;
            padding: 4px 8px;
            max-width: 100%;
            background: #FEB342;
            border-radius: 2px;
            margin-left: 16px;
          }
          .priority:before {
            content: "";
            position: absolute;
            top: 50%;
            left: -12px;
            margin-top: -5px;
            border: 5px solid transparent;
            /* border-radius: 2px; */
            border-right: 8px solid #FEB342;
          }
          .priority-label {
            font-size: 12px;
            margin: 0;
            padding: 0;
          }

          // タイトル
          .title-name-container{
            border-bottom: 2px dashed #E3EAF5;
            padding-bottom: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
          }
          .title-name-container::before{
            content: " ";
            width: 2px;
            height: 22px;
            background: #579AFF;
          }
          .idea-title {
            margin-left: 4px;
            font-size: 18px;
            color: #7A7A7A;
          }
          .title-input {
            width: 95%;
            height: 16px;
            font-size: 16px;
            padding: 0.25rem 0;
          }

          // タグ
          .tag-label, .memo-label{
            font-size: 12px;
            margin-bottom: 6px;
          }
          .plus {
            display: inline-block;
            margin-right: 8px;
          }
          .tag {
            display: inline-block;
            height: 20px;
            display: flex;
            align-items: center;
            padding: 0 4px;
            border-radius: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .tag-name{
            margin-left: 4px;
          }
          .idea-tag-container, .genre-tag-container {
            min-height: 20px;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
          }
          .idea-tag-container::-webkit-scrollbar {
            display:none;
          }
          .idea-tag {
            margin-right: 8px;
            background-color: #E3EAF5;
          }

          //メモ
          .memo-container {
            height: 160px;
            width: 100%;
            box-sizing: border-box;
            overflow-y: scroll;
            border: 1px #333 solid;
            border-radius: 2px;
            padding: 10px 8px;
            font-size: 14px;
            color: #434343;
            line-height: 1.6em;
            letter-spacing: .2em;
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
