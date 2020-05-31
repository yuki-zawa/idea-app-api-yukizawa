import React, { useState, useEffect } from "react";
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import { Tag, Search } from 'react-feather';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: 'inherit',
      backgroundColor: "#E3EAF5",
      borderRadius: "5px",
    },
    inputInput: {
			padding: theme.spacing(1, 1, 1, 0.5),
      // vertical padding + font size from searchIcon
      // paddingLeft: `4px`,
      // transition: theme.transitions.create('width'),
			width: '100%',
			fontSize: '14px',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
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

  const pullDown = () => {
    document.getElementsByClassName('tag-search-header')[0].classList.add('active');
    document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "キャンセル";
    setSearchState(true);
  }

  const pullUp = () => {
    document.getElementsByClassName('tag-search-header')[0].classList.remove('active');
    document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "タグで絞り込む";
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
  }, [genreTagWord]);

  useEffect(() => {
    fetchIdeaTags();
  }, [ideaTagWord]);

  return (
    <div className="container">
      <div className="tag-search-header">
        <div className="serch-content">
          <div className="tag-container">
            <div className="label">
              <label>カテゴリー</label>
            </div>
            <div className="tag-search">
              <div className="search">
                <div className="search-icon">
                  <Search size={20} />
                </div>
                <InputBase
                  placeholder="タグを検索する"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleGenreTagChange}
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
              </div>
              <div style={{height:"calc(100% - 60px)", overflow:"auto"}}>
                <div style={{borderBottom: "1px solid lightgray"}}>
                  {
                    selectedGenreTag.id !== 0 ? 
                      <p style={{backgroundColor: selectedGenreTag.color}} className="tag" data-id={0} onClick={(event) => deleteTag("genre", event)}>
                        <svg data-id={0} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.33317 3L3.74984 7.58333L1.6665 5.5" stroke="#434343" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span data-id={0}>{selectedGenreTag.name}</span>
                      </p> : ''
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
                        <p key={index} data-id={index} style={{backgroundColor: genreTag.color}} className="tag" onClick={(event) => selectTag("genre", event)}>
                          <svg data-id={index} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="6" r="4.5" stroke="#434343" strokeDasharray="2 1"/>
                          </svg>
                          <span data-id={index}>{genreTag.name}</span>
                        </p>
                      )
                    })
                  }
                </InfiniteScroll>
              </div>
            </div>
          </div>
          <div className="tag-container">
            <div className="label">
              <label>アイデア</label>
            </div>
            <div className="tag-search">
              <div className="search">
								<div className="search-icon">
                  <Search size={20} />
                </div>
                <InputBase
                  placeholder="タグを検索する"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleIdeaTagChange}
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
              </div>
              <div className="tag-lists">
                <div style={{borderBottom: "1px solid lightgray"}}>
                  {
                    selectedIdeaTags && selectedIdeaTags.map((ideaTag: any, index: number) => {
                      return (
                        <p key={index} style={{backgroundColor: '#E3EAF5'}} className="tag" data-id={index} onClick={(event) => deleteTag("idea", event)}>
                          <svg data-id={index} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33317 3L3.74984 7.58333L1.6665 5.5" stroke="#434343" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span data-id={index}>{ideaTag.name}</span>
                        </p>
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
                        <p key={index} data-id={index} style={{backgroundColor: '#E3EAF5'}} className="tag" onClick={(event) => selectTag("idea", event)}>
                          <svg data-id={index} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="6" r="4.5" stroke="#434343" strokeDasharray="2 1"/>
                          </svg>
                          <span data-id={index}>{ideaTag.name}</span>
                        </p>
                      )
                    })
                  }
                </InfiniteScroll>
              </div>
            </div>
          </div>
          <button onClick={filter}>
            選択したタグで絞り込む =>
          </button>
        </div>
        <p className="text-container" onClick={searchState ? pullUp : pullDown}>
            <Tag size={18}/>
            <span className="text">タグで絞り込む</span>
        </p>
      </div>
      <style jsx>{`
        .container{
            z-index: 100;
        }
        .tag-search-header {
            text-align: center;
            height: 44px;
            position: fixed;
            width: 100%;
            top: 44px;
            box-sizing: border-box;
            z-index: 99;
            padding: 8px 0;
            background-color: #434343;
            color: white;
            border-radius: 0px 0px 8px 8px;
            transition: all 400ms 0s ease;
        }
        .active {
          transform: translateY(80vh);
        }

        .serch-content {
          width: 100%;
          color: black;
          position: fixed;
					top: -80vh;
					z-index: -1;
          height: 80vh;
					background-color: white;
					padding: 28px 8px;
					box-sizing: border-box;
				}
				.tag-container .label {
					text-align: left;
					margin-bottom: 12px;
					font-size: 14px;
					color: #333;
				}
				
				.search {
          osition: relative;
					display: flex;
					margin: 6px;
					border-radius: 4px;
					background-color: #E3EAF5;
					align-items: center;
					padding: 0 8px;
					box-sizing: border-box;
				}
				.search-icon {
        }

        .serch-content button{
          display: block;
          width: 200px;
          background-color: #FEB342;
          padding: 0.5rem 1.25rem;
          margin: 1rem auto;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .tag-container {
          display:inline-block;
          padding: 1rem 0.25rem;

          width: calc(50% - 1rem);
          height: 80%;
        }

        .tag-container .label .btn {
          font-size: 8px;
          float: right;
        }

        

        .tag-search {
          height: 100%;
          border: 2px solid lightgray;
          box-sizing: border-box;
        }

        

        

        .tag {
					line-height: 20px;
					margin-bottom: 12px;
					padding: 4px;
					max-width: 80%;
					width: fit-content;
          border-radius: 4px;
          overflow: hidden;
				}
				.tag-lists{
					padding: 8px;
					box-sizing: border-box;
				}

        svg {
          margin-right: 4px;
        }

        .text-container {
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;

        }
        .text{
            margin-left: 6px;
        }
      `}</style>
    </div>

  );
}