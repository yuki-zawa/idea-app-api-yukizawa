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
          console.log(res.data);
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
          console.log(res.data)
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
        console.log(res.data.data);
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
      <div className="inner-header">
        <ul>
          <li onClick={props.closeFunc} className="cross-btn">×</li>
          <li>
            <span id="genre" onClick={changeTag} style={{color: tagState === "genre" ? "" : "lightgray"}}>カテゴリータグ</span>｜<span id="idea" onClick={changeTag} style={{color: tagState === "idea" ? "" : "lightgray"}}>アイデアタグ</span>
          </li>
          <li onClick={completeModal} className="check-btn">✔️</li>
        </ul>
      </div>
      <div className="btn-container">
        <input ref={nameRef} onChange={handleChange} className="input-name" placeholder="create new tag"/>
        <button onClick={postTag} className="add-btn">
          タグを追加する =>
        </button>
      </div>
      <p className="label">追加済みのタグ</p>
      <div className="selected-tag-container">
        {
          tagState === "genre" ?
            selectedGenreTag.id !== 0 ? 
            <p className="tag" style={{backgroundColor: selectedGenreTag.color}}>
              <X size={14} onClick={(event) => selectDelete("genre", event)}/>
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
      <p className="label">タグを選択して追加する</p>
      <div className="tag-container">
        {
          tags.map((tag: any, index: number) => {
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
          height: 100%;
          width: calc(100% - 32px);
          margin-top: 40px;
          background-color: white;
          padding: 16px;
          position: absolute;
            top: 0;
            left: 0;
        }

        .inner-header {
          padding: 20px 0;
          text-align: center;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .cross-btn {
          font-size: 32px;
          font-weight: bold;
          position: absolute;
            left: 0;
            top: 14px;
        }

        .check-btn {
          font-size: 24px;
          font-weight: bold;
          color: lightblue;
          position: absolute;
            right: 2px;
            top: 16px;
        }

        .input-name {
          width: 100%;
          height: 24px;
          border-radius: 5px;
          background-color: #E3EAF5;
          border: 1px solid #ccc
        }

        .btn-container {
          text-align: right;
          margin-bottom: 24px;
        }

        .add-btn {
          width: 150px;
          background-color: #FEB342;
          padding: 0.25rem 1.25rem;
          margin: 1rem 0;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .label {
          font-size: 12px;
          font-weight: bold;
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
          display: inline-block;
          padding: 0.25rem 0.5rem;
          margin: 0.25rem 0.5rem;
          border-radius: 5px;
        }

        .selected-tag-container {}
      `}</style>
    </div>
  );
}
