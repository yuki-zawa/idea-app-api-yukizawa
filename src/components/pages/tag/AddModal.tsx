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
  selectedGenreTags: Array<any>,
  selectedIdeaTags: Array<any>,
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

export const AddTagModal: React.FC<AddTagModalProps> = (props: any) => {
  const nameRef = useRef(document.createElement("input"));

  const [showLoader, setShowLoader] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedGenreTags, setSelectedGenreTags] = useState(props.selectedGenreTags);
  const [selectedIdeaTags, setSelectedIdeaTags] = useState(props.selectedIdeaTags);
  const [tagState, setTagState] = useState(props.tagState); // "genre" or "idea"
  const { authState } = useContext(AuthContext);
  console.log(authState.user)

  const [addGenreTag, setAddGenreTag] = useState<AddGenreTagParam>({
    color: "",
    name: "",
    user_id: 0
  });

  const [addIdeaTag, setAddIdeaTag] = useState<AddIdeaTagParam>({
    name: "",
    user_id: 0
  });

  const handleChange = () => {
    if (tagState === "genre"){
      setAddGenreTag({
        ...addGenreTag,
        name: nameRef.current.value
      })
    } else {
      setAddIdeaTag({
        ...addIdeaTag,
        name: nameRef.current.value
      })
    }
  }

  const postTag = async () => {
    console.log("追加する");
    var url;
    if (tagState === "genre"){
      setAddGenreTag({
        ...addGenreTag,
        name: nameRef.current.value,
        color: "red"
      })
      url ="/api/v1/genre_tags";
      await axios
        .post(url, addGenreTag)
        .then(res => {
          console.log(res.data);
          nameRef.current.value = '';
        })
        .catch(err => console.log(err))
        .finally(() => {
          fetchTags(); //再fetchしないで追加する方が良さそう FIXME
        });
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
        })
        .catch(err => console.log(err))
        .finally(() => {
          fetchTags();//再fetchしないで追加する方が良さそう FIXME
        });
    }
  }

  const changeTag = (event: any) => {
    setTagState(event.target.id);
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
        setTags(res.data.data);
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
          <li>✔️</li>
        </ul>
      </div>
      <div className="btn-container">
        <input ref={nameRef} onChange={handleChange}/>
        <button onClick={postTag}>
          タグを追加する　=>
        </button>
      </div>
      <p>追加済みのタグ</p>
      <p>タグを選択して追加する</p>
      <div className="tag-container">
        {
          tags.map((tag: any, index: number) => {
            return(
              <p className="tag" key={index}>{tag.name}</p>
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
