import React, { useState, useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: 'inherit',
      backgroundColor: "#E3EAF5",
      borderRadius: "5px",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(0.25rem + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
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
    document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "タグで絞り込む▲";
    setSearchState(true);
  }

  const pullUp = () => {
    document.getElementsByClassName('tag-search-header')[0].classList.remove('active');
    document.getElementsByClassName('tag-search-header')[0].getElementsByClassName('text')[0].textContent = "タグで絞り込む▼";
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
    if(type==='genre'){
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
    var queryString = '';
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
              <label>カテゴリー</label><span className="btn">絞り込みを解除</span>
            </div>
            <div className="tag-search">
              <div className="search">
                <div className="search-icon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="アイデアを検索する"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(event) => handleGenreTagChange(event)}
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
              </div>
              <div style={{height:"calc(100% - 60px)", overflow:"auto"}}>
                <div style={{borderBottom: "1px solid lightgray"}}>
                  {
                    selectedGenreTag.id !== 0 ? <p style={{backgroundColor: selectedGenreTag.color}} className="tag" data-id={0} onClick={(event) => deleteTag("genre", event)}>{selectedGenreTag.name}</p> : ''
                  }
                </div>
                <InfiniteScroll
                  pageStart={1}
                  hasMore={genreTags && pagenationForGenreTags.total > genreTags.length}
                  loadMore={fetchMoreGenreTags}
                  initialLoad={false}
                >
                  {
                    genreTags && genreTags.map((genreTag: any, index: number) => {
                      return (
                        <p key={index} data-id={index} style={{backgroundColor: genreTag.color}} className="tag" onClick={(event) => selectTag("genre", event)}>{genreTag.name}</p>
                      )
                    })
                  }
                </InfiniteScroll>
              </div>
            </div>
          </div>
          <div className="tag-container">
            <div className="label">
              <label>アイデア</label><span className="btn">全て選択する</span>
            </div>
            <div className="tag-search">
              <div className="search">
                <div className="search-icon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="アイデアを検索する"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(event) => handleIdeaTagChange(event)}
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
              </div>
              <div style={{height:"calc(100% - 60px)", overflow:"auto"}}>
                <div style={{borderBottom: "1px solid lightgray"}}>
                  {
                    selectedIdeaTags && selectedIdeaTags.map((ideaTag: any, index: number) => {
                      return (
                        <p key={index} style={{backgroundColor: '#E3EAF5'}} className="tag" data-id={index} onClick={(event) => deleteTag("idea", event)}>{ideaTag.name}</p>
                      )
                    })
                  }
                </div>
                <InfiniteScroll
                  pageStart={1}
                  hasMore={ideaTags && pagenationForIdeaTags.total > ideaTags.length}
                  loadMore={fetchMoreIdeaTags}
                  initialLoad={false}
                >
                  {
                    ideaTags && ideaTags.map((ideaTag: any, index: number) => {
                      return (
                        <p key={index} data-id={index} style={{backgroundColor: '#E3EAF5'}} className="tag" onClick={(event) => selectTag("idea", event)}>{ideaTag.name}</p>
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
        <p className="text" onClick={searchState ? pullUp : pullDown}>タグで絞り込む▼</p>
      </div>
      <style jsx>{`
        .tag-search-header {
          text-align: center;
          height: 32px;
          position: absolute;
            width: 100%;
            top: 80px;
            z-index: 99;
          background-color: black;
          color: white;
          border-radius: 0px 0px 10px 10px;
          transition: all 400ms 0s ease;
        }

        .active {
          transform: translateY(80vh);
        }

        .tag-search-header p {
          line-height: 32px;
          font-weight: bold;
        }

        .serch-content {
          width: 100%;
          color: black;
          position: absolute;
            top: -80vh;
            z-index: -1;
          height: 80vh;
          background-color: white;
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

        .tag-container .label {
          text-align: left;
        }

        .tag-search {
          height: 100%;
          border: 2px solid lightgray;
          box-sizing: border-box;
        }

        .search {
          position: relative;
          display: inline-block;
          padding: 0.5rem 0.5rem;
          margin: 0.25rem 0.125rem;
          border-bottom: 2px solid lightgray;
        }

        .search-icon {
          position: absolute;
          z-index: 111;
          height: 32px;
          position-events: none;
          display: flex;
          align-items: center;
          justify-content: center; 
        }

        .tag {
          width: 70%;
          padding: 0.125rem 0.25rem;
          margin: 0.5rem auto;
          border-radius: 4px;
          box-shadow: 2px 2px 3px lightgray;
          overflow: hidden;
        }
      `}</style>
    </div>

  );
}