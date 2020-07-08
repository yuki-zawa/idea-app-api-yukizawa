import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Check } from 'react-feather';

type EditTagModalProps = {
  setEditTagModalOpen: any,
  editTag: any,
  fetchGenreTags: any,
  fetchIdeaTags: any,
};

const colors = ["#FFDADB", "#FCE9FF", "#FFF6CB", "#FFE5C7", "#CEF9DF", "#D0E0FF", "#E9DFFF", "#F1FFC8", "#E0FAFF", "#EFEFEF"];

export const EditTagModal: React.FC<EditTagModalProps> = (props: any) => {
  const [data, setData] = useState(props.editTag);

  const handleChange = (event: any) => {
    console.log(event.target)
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const updateTag = async () => {
    var url = '/api/v1/';
    if(props.editTag.color) {
      url += 'genre_tags/';
    } else {
      url += 'idea_tags/';
    }
    url += data.id;
    await axios
      .put(url, data)
      .catch(error => console.log(error))
      .finally(() => {
        props.setEditTagModalOpen(false);
        props.fetchGenreTags();
        props.fetchIdeaTags();
      });
  }

  const deleteTag = async () => {
    if(window.confirm('本当に削除しますか？')){
      var url = '/api/v1/';
      if(props.editTag.color) {
        url += 'genre_tags/';
      } else {
        url += 'idea_tags/';
      }
      url += data.id;
      await axios
        .delete(url)
        .catch(error => console.log(error))
        .finally(() => {
          props.setEditTagModalOpen(false);
          props.fetchGenreTags();
          props.fetchIdeaTags();
        });
    }
  }

  return (
    <div className="container">
      <h1>タグの編集</h1>
      <button onClick={updateTag} className="submit">完了</button>
      <div className="form-container">
        <input name="name" onChange={handleChange} value={data.name}/>
        {
          data.color ?
            <div className="btn-container">
              {
                colors.map(color => {
                  return (
                    <button style={{backgroundColor: color, height: "42px", width: "42px", margin: "5px", borderRadius: '50%', verticalAlign: "top"}} value={color} name="color" onClick={color == data.color ? () => {} : handleChange}>
                      {color == data.color ? <Check size={24} color="black" /> : ''}
                    </button>
                  )
                }) 
              }
            </div> : ''
        }
        <button onClick={deleteTag} className="delete"><Trash2 size={24} color="black" /><span>タグを削除する</span></button>
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          z-index: 999;
          border: 2px solid lightgray;
          background-color: white;
          width: 300px;
          padding-bottom: 20px;
        }

        .container h1 {
          padding: 0.75rem 0.25rem;
          border-bottom: 2px solid lightgray;
        }

        .container button.submit {
          color: #579AFF;
          font-weight: bold;
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .form-container {
          width: 90%;
          margin: 0 auto;
          margin-top: 24px;
        }

        .form-container input {
          padding: 0.25rem 0.5rem;
          width: 80%;
          outline: none;
          border: none;
          border-bottom: 3px solid lightgray;
        }

        .btn-container {
          margin-top: 24px;
        }

        .container button.delete {
          margin: 0 auto;
          margin-top: 24px;
          padding: 0.25rem 0.5rem;
          background-color: lightgray;
          font-weight: bold;
          width: 70%;
          vertical-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}