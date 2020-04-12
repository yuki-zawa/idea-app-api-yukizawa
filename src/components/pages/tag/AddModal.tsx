import React, { useState, useRef, useEffect, useContext } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import useReactRouter from "use-react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import { AuthContext } from './../../common/context/provider'
import axios from 'axios';

const backLinkStyle = {
  display: "inline-block",
  height: "24px",
  width: "24px",
  cursor: "pointer",
  fontWeight: "bold" as "bold",
  fontSize: "24px"
};

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
      console.log(tags[event.target.dataset.id])
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

  useEffect(() => {
    fetchTags();
  },[tagState]);


  return (
    <div className="container">
      <div className="inner-header">
        <ul>
          <li onClick={props.closeFunc}>×</li>
          <li>
            <span id="genre" onClick={changeTag}>カテゴリータグ</span>
            <span id="idea" onClick={changeTag}>アイデアタグ</span>
          </li>
          <li onClick={completeModal}>✔️</li>
        </ul>
      </div>
      <div className="btn-container">
        <input ref={nameRef} onChange={handleChange}/>
        <button onClick={postTag}>
          タグを追加する　=>
        </button>
      </div>
      <p>追加済みのタグ</p>
        {
          tagState === "genre" ?
            selectedGenreTag ? <p className="tag" color={selectedGenreTag.color}>{selectedGenreTag.name}</p> : ""
          :
          selectedIdeaTags.map((tag: any, index: number) => {
            return(
              <p className="tag" key={index}>{tag.name}</p>
            )
          })
        }
      <p>タグを選択して追加する</p>
      <div className="tag-container">
        {
          tags.map((tag: any, index: number) => {
            return(
              <p className="tag" key={index} data-id={index} onClick={selectTag}>{tag.name}</p>
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
          width: 100%;
          margin-top: 40px;
          background-color: white;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}
