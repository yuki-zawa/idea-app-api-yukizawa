import React, { useState, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Card } from './Card'
import { ShuffleModal } from "./ShuffleModal";
import { TagSearch } from "./TagSearch";

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

export const IdeaList: React.FC = (props: any) => {
  const classes = useStyles();

  const [ideas, setIdeas] = useState([]);
  const [word, setWord] = useState('');
  const [openShuffleModal, setOpenShuffleModal] = useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [pagenation, setPagenation] = React.useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const [tagSearchQuery, setTagSearchQuery] = useState('');

  const fetchIdeas = async () => {
    setShowLoader(true);

    let response = await axios
      .get(`/api/v1/ideas?page=${1}&limit=${10}${tagSearchQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => {
        setShowLoader(false);
      });

    setIdeas(response.data);
    setPagenation({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchMoreIdeas = async () => {
    setShowLoader(true);
    let response = await axios
      .get(
        `/api/v1/ideas?page=${pagenation.currentPage + 1}&limit=${pagenation.perPage}${tagSearchQuery}`
      )
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => {
        setShowLoader(false);
      });
    // 配列の後ろに追加
    setIdeas(ideas.concat(response.data));
    setPagenation({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const shuffle = () => {
    if(pagenation.total < 2) {
      window.alert("アイデアを二つ以上登録してください");
      return;
    }
    setOpenShuffleModal(true);
  }

  const closeShuffleModal = () => {
    setOpenShuffleModal(false);
  }

  const handleChange = (event: any) => {
    setTagSearchQuery(tagSearchQuery + `&word=${event.target.value}`);
  }

  useEffect(() => {
    fetchIdeas();
  }, [tagSearchQuery]);


  return (
    <HomeLayout title="idea list">
      <div className="list-header">
        <div className="search">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="アイデアを検索する"
            inputProps={{ 'aria-label': 'search' }}
            classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
            onChange={handleChange}
          />
        </div>
      </div>
      <TagSearch
        setQuery={setTagSearchQuery}
        currentQuery={tagSearchQuery}
      />
      <div className={`container`}>
        <InfiniteScroll
          pageStart={1}
          hasMore={!showLoader && ideas && pagenation.total > ideas.length}
          loadMore={fetchMoreIdeas}
          initialLoad={false}
          useWindow={false}
        >
          {
            ideas && ideas.map((idea, index) => {
              return (
                <Card 
                  idea={idea} 
                  key={index}
                  cardWidth={"48%"}
                  cardHeight={"175px"}
                  cardContentLine={4}
                />
              )
            })
          }
        </InfiniteScroll>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          {showLoader ? <CircularProgress style={{ margin: "24px auto" }}/> : ""}
        </div>
        <div className="btns">
          <Link to='/ideas/new'>
            <button className="plus">
              ＋
            </button>
          </Link>
          <button className="shuffle" onClick={shuffle}>
            ⇆
          </button>
        </div>
      </div>
      <div className="blur" />
      { openShuffleModal ? 
          <ShuffleModal 
            closeShuffleModal={closeShuffleModal}
          />
        : "" 
      }
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100%;
          padding: 140px 1rem 1.25rem 1rem;
          box-sizing: border-box;
          overflow-y: scroll;
        }

        .blur{
          display: ${openShuffleModal ? ";" : "none;"}
          background-color: gray;
          opacity: 0.7;
          filter: blur(7px);
          width: 100%;
          height: calc(100vh - 80px);
          position: absolute;
          top: 80px;
        }

        .list-header {
          height: 40px;
          background-color: white;
          position: fixed;
          width: 100%;
          top: 40px;
          z-index: 100;
        }

        .search {
          position: relative;
          display: inline-block;
          padding: 0 0.5rem;
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

        .btns {
          width: 176px;
          position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%)
        }

        .btns button {
          height: 64px;
          width: 64px;
          font-size: 48px;
          line-height: 64px;
          border-radius: 50%;
          box-shadow: 0px 0px 10px gray;
          margin: 0.5rem 0.75rem;
        }

        .plus {
          background-color: #FEB342;
        }

        .shuffle {
          background-color: #E3EAF5;
        }
      `}</style>
    </HomeLayout>
  );
}
