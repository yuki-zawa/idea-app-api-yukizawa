import React, { useState, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import { X } from 'react-feather';

type AddTagModalProps = {
  tagState: string,
  closeFunc: any,
  selectedGenreTag: any,
  setSelectedGenreTag: any,
  selectedIdeaTags: Array<any>,
  setSelectedIdeaTags: any,
};

export interface AddGenreTagParam {
  color: string,
  name: string,
  user_id: number,
}

export interface AddIdeaTagParam {
  name: string,
  user_id: number,
}

const colors = ["#FFDADB", "#FCE9FF", "#FFF6CB", "#FFE5C7", "#CEF9DF", "#D0E0FF", "#E9DFFF", "#F1FFC8", "#E0FAFF", "#EFEFEF"];

export const AddTagModal: React.FC<AddTagModalProps> = (props: any) => {
  const nameRef = useRef(document.createElement("input"));

  const [showLoader, setShowLoader] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagState, setTagState] = useState(props.tagState); // "genre" or "idea"

  const [addGenreTag, setAddGenreTag] = useState<AddGenreTagParam>({
    color: "",
    name: "",
    user_id: 0
  });

  const [addIdeaTag, setAddIdeaTag] = useState<AddIdeaTagParam>({
    name: "",
    user_id: 0
  });

  const [selectedGenreTag, setSelectedGenreTag] = useState(props.selectedGenreTag);
  const [selectedIdeaTags, setSelectedIdeaTags] = useState(props.selectedIdeaTags);

  const handleChange = () => {
    if (tagState === "genre"){
      setAddGenreTag({
        ...addGenreTag,
        name: nameRef.current.value,
        color: colors[Math.floor(Math.random()*10)]
      })
    } else {
      setAddIdeaTag({
        ...addIdeaTag,
        name: nameRef.current.value
      })
    }
  }

  const postTag = async () => {
    if (nameRef.current.value === ''){
      //FIXME エラー表示させる
      window.alert("文字が空")
    }
    var url;
    if (tagState === "genre"){
      setAddGenreTag({
        ...addGenreTag,
        name: nameRef.current.value
      })
      url ="/api/v1/genre_tags";
      await axios
        .post(url, addGenreTag)
        .then(res => {
          nameRef.current.value = '';
          if (selectedGenreTag.id !== 0) {
            setTags(tags.concat(selectedGenreTag))
          }
          setSelectedGenreTag(res.data)
        })
        .catch(err => console.log(err));
    } else {
      setAddIdeaTag({
        ...addIdeaTag,
        name: nameRef.current.value
      })
      url ="/api/v1/idea_tags";
      await axios
        .post(url, addIdeaTag)
        .then(res => {
          nameRef.current.value = '';
          setSelectedIdeaTags(selectedIdeaTags.concat(res.data));
        })
        .catch(err => console.log(err))
    }
  }

  const changeTag = (event: any) => {
    setTagState(event.target.id);
  }

  const selectTag = (event: any) => {
    if (tagState === "genre"){
      setSelectedGenreTag(tags[event.target.dataset.id]);
      tags.splice(event.target.dataset.id, 1);
      setTags(tags.concat(selectedGenreTag).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
      // setTags(temp.sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
    } else {
      setSelectedIdeaTags(selectedIdeaTags.concat(tags[event.target.dataset.id]));
      tags.splice(event.target.dataset.id, 1)
      setTags(tags);
    }
  }

  const completeModal = () => {
    props.setSelectedIdeaTags(selectedIdeaTags);
    props.setSelectedGenreTag(selectedGenreTag);
    props.closeFunc();
  }

  const fetchTags = async () => {
    var url;
    setShowLoader(true);
    if (tagState === "genre"){
      url ="/api/v1/genre_tags?page=1&limit=100"
    } else {
      url ="/api/v1/idea_tags?page=1&limit=100"
    }
    await axios
      .get(url)
      .then(res => {
        if (tagState === "genre"){
          setTags(res.data.data.filter((value: any) => { return value.id !== selectedGenreTag.id }));
        } else {
          var tempArray = res.data.data
          selectedIdeaTags.map((value: any) => {
            tempArray = tempArray.filter((data: any) => { return value.id !== data.id })
          })
          setTags(tempArray);
        }
        setShowLoader(false);
      })
      .catch(err => console.log(err));
  }

  const selectDelete = (type: string, event: any) => {
    if (type === "idea") {
      setSelectedIdeaTags(selectedIdeaTags.filter((tag: any) => {
        if(tag.id === Number(event.target.dataset.id)){
          setTags(tags.concat(tag).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
        }
        return tag.id !== Number(event.target.dataset.id)
      }))
    } else {
      setTags(tags.concat(selectedGenreTag).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
      setSelectedGenreTag({
        id: 0,
        name: "",
        color: "",
      })
    }
  }

  useEffect(() => {
    fetchTags();
  },[tagState]);


  return (
    <div className="container">
      <span onClick={props.closeFunc} className="cross-btn">
          <X size={20}  />
      </span>
      <span onClick={completeModal} className="check-btn">完了</span>
      <p className="header-title">タグの編集</p>
      <div className="change-tag">
        <span id="genre" onClick={changeTag} style={{color: tagState === "genre" ? "" : "lightgray"}}>カテゴリータグ</span>｜<span id="idea" onClick={changeTag} style={{color: tagState === "idea" ? "" : "lightgray"}}>アイデアタグ</span>
      </div>

      <p className="label">選択中のカテゴリー</p>
      <div className="selected-tag-container">
        {
          tagState === "genre" ?
            selectedGenreTag.id !== 0 ? 
            <p className="tag" style={{backgroundColor: selectedGenreTag.color}}>
              <X size={14} className="tag-icon" onClick={(event) => selectDelete("genre", event)}/>
              <span>{selectedGenreTag.name}</span>
            </p> : ""
          :
          selectedIdeaTags.map((tag: any, index: number) => {
            return(
              <p className="tag" key={index} style={{backgroundColor: "#E3EAF5"}}>
                <X size={14} onClick={(event) => selectDelete("idea", event)} data-id={tag.id}/>
                <span>{tag.name}</span>
              </p>
            )
          })
        }
      </div>
      <p className="label">カテゴリーを変更する</p>
      <div className="btn-container">
        <input ref={nameRef} onChange={handleChange} className="input-name" placeholder="新しいカテゴリーを作成"/>
        <button onClick={postTag} className="add-btn">
          作成する
        </button>
      </div>
      
      <div className="tag-container">
        {
          !showLoader && tags.map((tag: any, index: number) => {
            return(
              <p className="tag" key={index} data-id={index} onClick={selectTag} style={{backgroundColor: tagState === "genre"? tag.color :"#E3EAF5"}}>{tag.name}</p>
            )
          })
        }
      </div>
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>
        {showLoader ? <CircularProgress style={{ margin: "24px auto" }}/> : ""}
      </div>
      <style jsx>{`
        .container {
          height: calc(100% - 40px);
          width: 100%;
          box-sizing: border-box;
          margin-top: 40px;
          background-color: white;
          padding: 28px 20px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .inner-header {
          text-align: center;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .header-title{
          text-align: center;
          margin-bottom: 32px;
          font-size: 14px;
          color: #7A7A7A;
        }

        .cross-btn {
          left: 0;
          right: auto;
          position: absolute;
        }

        .check-btn {
          font-size: 16px;
          font-weight: bold;
          color: #579AFF;
          left: auto;
          right: 0;
          position: absolute;
        }

        .change-tag{
          text-align: center;
          margin-bottom: 36px;
        }

        .input-name {
          padding: 8px 6px;
          background: #FFFFFF;
          border: 1px solid #C4C4C4;
          box-sizing: border-box;
          border-radius: 4px;
          width: calc(100% - 80px);
        }

        .btn-container {
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .add-btn {
          padding: 4px 8px;
          height: 27px;
          right: 20.5px;
          background: #FFFFFF;
          border: 1px solid #C4C4C4;
          box-sizing: border-box;
          border-radius: 4px;
          font-size: 14px;
          text-align: center;
          color: #333;
          
        }

        .label {
          font-size: 12px;
          color: #333;
          margin-bottom: 12px;
        }

        .selected-tag-container {
          height: 32px;
          width: auto;
          white-space:nowrap;
          overflow-x: scroll;
          -ms-overflow-style: none;
        }

        .selected-tag-container::-webkit-scrollbar {
          display:none;
        }

        .tag {
          display: inline;
          padding: 2px 6px 1px 6px;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 12px 8px 0;
        }
        .selected-tag-container {
          padding-top: 4px;
          margin-bottom: 44px;
        }

        .tag-container{
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
