import React, { useState, useEffect } from "react";
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import { EditTagModal } from "./EditTagModal";
import { Tag, Search, ArrowRight, MoreHorizontal, X } from 'react-feather';

const SearchInputStyle = {
  width: "100%",
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: '#7A7A7A',
    },
    inputInput: {
			padding: theme.spacing(0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `4px`,
      // transition: theme.transitions.create('width'),
			width: '100%',
			fontSize: '14px',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

type TagSearchProps = {
  setQuery: any,
  currentQuery: any,
};

export const TagSearch: React.FC<TagSearchProps> = (props: any) => {
  const classes = useStyles();
  const [editTagModalOpen, setEditTagModalOpen] = useState(false);
  const [editTag, setEditTag] = useState({
    id: 0,
    name: '',
    color: ''
  });
  const [searchState, setSearchState] = useState(false);
  const [genreTags, setGenreTags] = useState<any>([]);
  const [ideaTags, setIdeaTags] = useState<any>([]);
  const [genreTagWord, setGenreTagWord] = useState('');
  const [ideaTagWord, setIdeaTagWord] = useState('');
  const [selectedGenreTag, setSelectedGenreTag] = useState({
    id: 0,
    name: '',
    color: '',
    user_id: 0
  });
  const [selectedIdeaTags, setSelectedIdeaTags] = useState([]);
  const [pagenationForGenreTags, setPagenationForGenreTags] = React.useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });
  const [pagenationForIdeaTags, setPagenationForIdeaTags] = React.useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const openEditTagModal = (tag: any) => {
    setEditTagModalOpen(true);
    setEditTag({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    });
  }

  const pullDown = () => {
    document.getElementsByClassName('tag-search-header')[0].classList.add('active');
    // document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "キャンセル";
    setSearchState(true);
  }

  const pullUp = () => {
    document.getElementsByClassName('tag-search-header')[0].classList.remove('active');
    // document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "ひらめきを絞り込む";
    setSearchState(false);
  }

  const fetchGenreTags = async () => {
    let response = await axios
      .get(`/api/v1/genre_tags?page=${1}&limit=${10}&word=${genreTagWord}`)
      .then(result => result.data)
      .catch(error => console.log(error));

    setGenreTags(response.data.filter((tag: any) => tag.id !== selectedGenreTag.id));
    setPagenationForGenreTags({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchIdeaTags = async () => {
    let response = await axios
      .get(`/api/v1/idea_tags?page=${1}&limit=${10}&word=${ideaTagWord}`)
      .then(result => result.data)
      .catch(error => console.log(error));

    setIdeaTags(response.data.filter((tag: any) => {
      var flag = true;
      selectedIdeaTags.map((selectedTag: any) => {
        if (selectedTag.id === tag.id) {
          flag = false;
          return;
        }
      })
      return flag;
    }));
    setPagenationForIdeaTags({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchMoreGenreTags = async () => {
    let response = await axios
      .get(
        `/api/v1/genre_tags?page=${pagenationForGenreTags.currentPage + 1}&limit=${pagenationForGenreTags.perPage}`
      )
      .then(result => result.data)
      .catch(error => console.log(error));
    // 配列の後ろに追加
    setGenreTags(genreTags.concat(response.data.filter((tag: any) => tag.id !== selectedGenreTag.id)));
    setPagenationForGenreTags({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchMoreIdeaTags = async () => {
    let response = await axios
      .get(
        `/api/v1/idea_tags?page=${pagenationForIdeaTags.currentPage + 1}&limit=${pagenationForIdeaTags.perPage}`
      )
      .then(result => result.data)
      .catch(error => console.log(error));
    // 配列の後ろに追加
    setIdeaTags(ideaTags.concat(response.data.filter((tag: any) => {
      var flag = true;
      selectedIdeaTags.map((selectedTag: any) => {
        if (selectedTag.id === tag.id) {
          flag = false;
          return;
        }
      })
      return flag;
    })));
    setPagenationForIdeaTags({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const selectTag = (type: string, event: any) => {
    if(type === 'genre'){
      setSelectedGenreTag(genreTags[event.target.dataset.id]);
      genreTags.splice(event.target.dataset.id, 1);
      if(selectedGenreTag.id !== 0) {
        setGenreTags(genreTags.concat(selectedGenreTag).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
      }
    } else {
      setSelectedIdeaTags(selectedIdeaTags.concat(ideaTags[event.target.dataset.id]));
      ideaTags.splice(event.target.dataset.id, 1)
      setIdeaTags(ideaTags);
    }
  }

  const filter = () => {
    var queryString = props.currentQuery.replace(/&genre_tags=.*(?=&)|&genre_tags=.*(?!&)|&idea_tags=.*(?=&)|&idea_tags=.*(?!&)/g, '');
    if(selectedGenreTag.id !== 0){
      queryString += `&genre_tags=${selectedGenreTag.id}`;
    }
    if(selectedIdeaTags.length !== 0){
      queryString += `&idea_tags=`;
      selectedIdeaTags.map((ideaTag: any, index: number) => {
        queryString += ideaTag.id
        if(selectedIdeaTags.length-1 !== index){
          queryString += ','
        } 
      })
    }
    props.setQuery(queryString);
    pullUp();
  }

  const filterRelease = () => {
    var queryString = props.currentQuery.replace(/&genre_tags=.*(?=&)|&genre_tags=.*(?!&)|&idea_tags=.*(?=&)|&idea_tags=.*(?!&)/g, '');
    props.setQuery(queryString);
    pullUp();
    setSelectedGenreTag({
      id: 0,
      name: '',
      color: '',
      user_id: 0
    });
    setSelectedIdeaTags([]);
  }

  const handleIdeaTagChange = (event: any) => {
    setIdeaTagWord(event.target.value);
  }

  const handleGenreTagChange = (event: any) => {
    setGenreTagWord(event.target.value);
  }
  
  const deleteTag = (type: string, event: any) => {
    if(type==='genre'){
      setGenreTags(genreTags.concat(selectedGenreTag).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
      setSelectedGenreTag({
        id: 0,
        name: '',
        color: '',
        user_id: 0
      });
    } else {
      setIdeaTags(ideaTags.concat(selectedIdeaTags[event.target.dataset.id]).sort((a: any, b: any) => { return a.id > b.id ? 1 : -1 }));
      selectedIdeaTags.splice(event.target.dataset.id, 1)
      setSelectedIdeaTags(selectedIdeaTags);
    }
  }

  useEffect(() => {
    fetchGenreTags();
  }, [genreTagWord, props.currentQuery]);

  useEffect(() => {
    fetchIdeaTags();
  }, [ideaTagWord, props.currentQuery]);

  return (
    <div className="container">
      <div className="tag-search-header">
        <div className="search-content">
          <div className="top-part"> 
            <button className="x-icon" onClick={searchState ? pullUp : pullDown}>
              <X  size={24} color="#333"/>
            </button>
            <h3 className="tag-search_title">ひらめきを絞り込み</h3>
          </div>
        
          <div className="tag-containers">
            <div className="tag-container">
            <label className="tag-container_label">カテゴリー</label>
              <div className="tag-search">
                <div className="search">

                  <InputBase
                    placeholder="タグを検索"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleGenreTagChange}
                    style={ SearchInputStyle}
                    classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                  />
                  <div className="search-icon">
                    <Search size={16} color="#7A7A7A"/>
                  </div>
                </div>
                <div className="tag-lists">
                  <div style={{borderBottom: "1px solid #c4c4c4", marginBottom:"8px"}}>
                    {
                      selectedGenreTag.id !== 0 ? 
                      <div className="tag-wrapper" data-id={0}>
                        {/* タグ */}
                        <div data-id={0} className="tag" style={{backgroundColor: selectedGenreTag.color}} onClick={(event) => deleteTag("genre", event)}>
                          {/* <svg data-id={0} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33317 3L3.74984 7.58333L1.6665 5.5" stroke="#434343" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg> */}
                          <span data-id={0}>{selectedGenreTag.name}</span>
                        </div>
                        {/* <button data-id={selectedGenreTag.id} className="tag-edit-btn" onClick={() => openEditTagModal(selectedGenreTag)}>
                          <MoreHorizontal data-id={selectedGenreTag.id} size={18} color="#333" />
                        </button> */}
                      </div> : ''
                    }
                  </div>
                  <InfiniteScroll
                    pageStart={1}
                    hasMore={genreTags && pagenationForGenreTags.total > genreTags.length}
                    loadMore={fetchMoreGenreTags}
                    initialLoad={false}
                    useWindow={false}
                    style={{height: "100%"}}
                  >
                    {
                      genreTags && genreTags.map((genreTag: any, index: number) => {
                        return (
                          <div className="tag-wrapper">
                            <p key={index} data-id={index} style={{backgroundColor: genreTag.color}} className="tag" onClick={(event) => selectTag("genre", event)}>
                              {/* <svg data-id={index} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6" cy="6" r="4.5" stroke="#434343" strokeDasharray="2 1"/>
                              </svg> */}
                              <span data-id={index}>{genreTag.name}</span>
                            </p>
                            <button data-id={genreTag.id} className="tag-edit-btn" onClick={() => openEditTagModal(genreTag)}>
                              <MoreHorizontal data-id={genreTag.id} size={18} color="#333" />
                            </button>
                          </div>
                        )
                      })
                    }
                  </InfiniteScroll>
                </div>
              </div>
            </div>
            <div className="tag-container">
            <label className="tag-container_label">アイデア</label>
            <div className="tag-search">
              <div className="search">
                <InputBase
                  placeholder="タグを検索"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleIdeaTagChange}
                  style={ SearchInputStyle}
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
                <div className="search-icon">
                  <Search size={16} color="#7A7A7A"/>
                </div>
              </div>
              <div className="tag-lists">
                <div style={{borderBottom: "1px solid #c4c4c4", marginBottom:"8px"}}>
                  {
                    selectedIdeaTags && selectedIdeaTags.map((ideaTag: any, index: number) => {
                      return (
                        <div className="tag-wrapper">
                          <p key={index} style={{backgroundColor: '#E3EAF5'}} className="tag" data-id={index} onClick={(event) => deleteTag("idea", event)}>
                            {/* <svg data-id={index} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.33317 3L3.74984 7.58333L1.6665 5.5" stroke="#434343" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> */}
                            <span data-id={index}>{ideaTag.name}</span>
                          </p>
                          <button data-id={ideaTag.id} className="tag-edit-btn" onClick={() => openEditTagModal(ideaTag)}>
                            <MoreHorizontal data-id={ideaTag.id} size={18} color="#333" />
                          </button>
                        </div>
                      )
                    })
                  }
                </div>
                <InfiniteScroll
                  pageStart={1}
                  hasMore={ideaTags && pagenationForIdeaTags.total > ideaTags.length}
                  loadMore={fetchMoreIdeaTags}
                  initialLoad={false}
                  useWindow={false}
                  style={{height: "100%"}}
                >
                  {
                    ideaTags && ideaTags.map((ideaTag: any, index: number) => {
                      return (
                        <div className="tag-wrapper">
                          <p key={index} data-id={index} style={{backgroundColor: '#E3EAF5'}} className="tag" onClick={(event) => selectTag("idea", event)}>
                            {/* <svg data-id={index} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="6" cy="6" r="4.5" stroke="#434343" strokeDasharray="2 1"/>
                            </svg> */}
                            <span data-id={index}>{ideaTag.name}</span>
                          </p>
                          <button data-id={ideaTag.id} className="tag-edit-btn" onClick={() => openEditTagModal(ideaTag)}>
                            <MoreHorizontal data-id={ideaTag.id} size={18} color="#333" />
                          </button>
                        </div>
                      )
                    })
                  }
                </InfiniteScroll>
              </div>
            </div>
          </div>
          </div>
          <div className="search-btn_container">
            <button className="tag-search_btn_release" onClick={filterRelease}>
              <span className="tag-search-btn_text">絞り込みを解除</span>
              {/* <ArrowRight className="tag-search-btn_icon" size={24} color="#333" /> */}
            </button>
            <button className="tag-search_btn" onClick={filter}>
              <span className="tag-search-btn_text">絞り込む</span>
              {/* <ArrowRight className="tag-search-btn_icon" size={24} color="#333" /> */}
            </button>
          </div>
          
        </div>
        {selectedGenreTag.id === 0 && selectedIdeaTags.length === 0 ?
          <p className="text-container" onClick={pullDown}>
            <Tag size={18} color="#579AFF" />
            <span className="text">ひらめきを絞り込む</span>
          </p> :
          <p className="text-container" onClick={pullDown}>
            <Tag size={18} color="#579AFF" />

            <div className="selected-tag_container">
              {
                selectedGenreTag.id !== 0 ?
                  <div className="tag-wrapper_selected">
                    <p className="tag_selected" style={{ backgroundColor: selectedGenreTag.color }}>
                      <span>{selectedGenreTag.name}</span>
                    </p>
                  </div> : ''
              }
              {
                selectedIdeaTags.map((tag: any) => {
                  return (
                    <div className="tag-wrapper_selected">
                      <p className="tag_selected" style={{ backgroundColor: "#EFEFEF" }}>
                        <span>{tag.name}</span>
                      </p>
                    </div>
                  );
                })
              }
            </div>
          </p>
        }
      </div>
      {editTagModalOpen ? <EditTagModal setEditTagModalOpen={setEditTagModalOpen} editTag={editTag} fetchGenreTags={fetchGenreTags} fetchIdeaTags={fetchIdeaTags}/> : ''}
      <style jsx>{`
        .container{
          z-index: 120;
        }
        .tag-search-header {
          // text-align: center;
          padding: 8px 12px 8px 12px;
          height: 60px;
          position: fixed;
          width: 100%;
          // transform: translateX(-50%);
          top: 108px;
          box-sizing: border-box;
          z-index: 105;
          // padding: 12px 0;
          // background-color: white;
          color: #579AFF;
          // border-radius: 0px 0px 8px 8px;
          // transition: all 400ms 0s ease;
          // overflow-x: scroll;
        }
        .text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          width: fit-content;
          color: white;
          padding: 8px 16px;
          border-radius: 18px;
          border: 1px solid #579AFF;
          background-color: white;
        }
        @media (min-width: 1000px){
          .text-container {
            margin-left: calc(50% - 500px);
          }
        }

        //絞り込み解除ボタン
        .selected-tag_container{
          display: flex;
          margin-left: 4px;
          max-width: calc(100% - 18px);
          overflow: scroll;
        }
        .tag-wrapper_selected{
          margin: 0 2px;
          height: 18px;
        }
        .tag_selected{
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          line-height: 14px;
          color: #333;
          border-radius: 2px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        
        .text{
          font-weight: bold;
          margin-left: 6px;
          color: #579AFF;
        }
        .active {
          transform: translateY(100vh);
        }
        .search-content {
          width: 100%;
          height: calc(100vh - 52px);
          padding: 16px;
          box-sizing: border-box;
          position: absolute;
          top: calc(-100vh - 52px);
          left: 0;
          z-index: 1000;
          background-color: white;
        }

        //header部分
        .top-part {
          margin-bottom: 20px;
          max-width: 1000px;
          margin: 0 auto;   
          padding: 18px 0;   
        }
        .x-icon{
          position: absolute;
        }
        .tag-search_title{
          font-size: 14px;
          color: #333;
          text-align: center;
          line-height: 28px;
        }
        
        //本体
        .tag-containers{
          display: flex;
          justify-content: space-between;
          height: calc(100vh - 220px);
          width: 100%;
          margin-bottom: 24px
        }
        @media (min-width: 1000px){
          .tag-containers{
            max-width: 1000px;
            margin: 0 auto 24px auto;
          }
        }
        
        //タグのコンテナ
        .tag-container {
          height: 100%;
          width: calc(50% - 12px);
        }
        .tag-container_label {
          display: block;
					text-align: left;
					margin-bottom: 8px;
					font-size: 14px;
					color: #333;
				}
        .tag-search {
          height: calc(100% - 22px);
          box-sizing: border-box;
        }

        //文字で検索
				.search {
          osition: relative;
					display: flex;
					margin-bottom: 20px;
					border-radius: 2px;
					background-color: #EBEBEB;
					align-items: center;
					padding: 8px 10px;
					box-sizing: border-box;
				}
				.search-icon {
        }

        //タグを選択
        .tag-lists{
          height: calc(100% - 60px);
          overflow-y: scroll;
        }

        .search-btn_container{
          display: flex;
          justify-content: space-between;
          max-width: 1000px;
          margin: 0 auto;
        }
        .tag-search_btn{
          background: #579AFF;
          color: white;
          border-radius: 4px;
          width: 144px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tag-search_btn_release{
          background: #EBEBEB;
          border-radius: 4px;
          width: 144px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        //タグ
        .tag-wrapper{
          width: 100%;
          display: flex;
          margin-bottom: 8px;
          justify-content: space-between;
        }
        .tag {
          max-width: calc(100% - 28px);
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          line-height: 14px;
          color: #333;
          border-radius: 2px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          display: flex;
          align-items: center;
          width: fit-content;
          overflow: hidden;
          text-align: left;
        }
        .tag span{
          font-size: 14px;
          line-height: 16.8px;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
        }
        .tag-edit-btn{
          width: 24px;
          height: 24px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          z-index: 999;
        }


      `}</style>
    </div>

  );
}