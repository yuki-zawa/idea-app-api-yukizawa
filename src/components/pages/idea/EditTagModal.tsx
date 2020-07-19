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
      <h1 className="header">タグの編集</h1>
      <button onClick={updateTag} className="submit-btn">完了</button>
      <div className="form-container">
        <input className="title-input" name="name" onChange={handleChange} value={data.name}/>
        {
          data.color ?
            <div className="color-btn_container">
              {
                colors.map(color => {
                  return (
                    <button style={{backgroundColor: color, height: "32px", width: "32px", borderRadius: '50%', margin: "0px 6px 12px 6px", verticalAlign: "top"}} value={color} name="color" onClick={color == data.color ? () => {} : handleChange}>
                      {color == data.color ? <Check size={18} color="#333" /> : ''}
                    </button>
                  )
                }) 
              }
            </div> : ''
        }
        <button onClick={deleteTag} className="delete-btn">
          <Trash2 size={18} color="#333" />
          <span>タグを削除する</span>
        </button>
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
          border: 1px solid #C4C4C4;
          background-color: white;
          width: 300px;
          padding-bottom: 20px;
        }
        .header{
          padding: 10px 0 8px 0;
          border-bottom: 1px solid #C4C4C4;
        }
        .submit-btn {
          color: #579AFF;
          font-weight: bold;
          position: absolute;
          right: 10px;
          top: 8px;
        }
        .form-container {
          width: 100%;
          padding: 14px 36px;
          box-sizing: border-box;
        }

        .title-input {
          width: 100%;
          padding: 4px;
          outline: none;
          border: none;
          border-bottom: 1.5px solid #c4c4c4;
          margin-bottom: 24px;
        }
        .color-btn_container{
          margin-bottom: 24px;
        }
        .delete-btn {
          margin: 0 auto;
          background: #EBEBEB;
          border-radius: 26px;
          padding: 4px 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}