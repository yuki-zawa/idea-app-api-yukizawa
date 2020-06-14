import React, { useState, useEffect } from "react";
import { HomeLayout } from "../../common/HomeLayout";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Search, List, Shuffle, Plus, Settings, Grid } from 'react-feather';
import Sort from '../../images/sort.svg'
import { Card } from './Card';
import { Card2 } from './Card2';
import { ShuffleModal } from "./ShuffleModal";
import { TagSearch } from "./TagSearch";
import { SortModal } from "./SortModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: 'inherit',
      padding: theme.spacing(0, 0, 0, 1.5),
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 0.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(0.25rem + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
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
  const [openShuffleModal, setOpenShuffleModal] = useState(false);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [listState, setListState] = useState(false);
  const [pagenation, setPagenation] = React.useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const [tagSearchQuery, setTagSearchQuery] = useState('&sort=new');

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

  const handleChangeListState = (bool: boolean) => {
    setListState(bool);
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
    var queryString = tagSearchQuery.replace(/&word=.*(?=&)|&word=.*(?!&)/g, '');
    setTagSearchQuery(queryString + `&word=${event.target.value}`);
  }

  const handleChangeSortOpen = (bool: boolean) => {
    setOpenSortModal(bool);
  }

  useEffect(() => {
    fetchIdeas();
  }, [tagSearchQuery]);


  return (
    <HomeLayout title="STOCKROOM">
      <div className="list-header">
        <div className="search">
          <div className="search-icon">
            <Search size={24} />
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
        <div className="sort">
          <img className="sort-icon" src={ Sort } alt="sort-icon" onClick={() => handleChangeSortOpen(true)}/>
        </div>
        <div className="switch">
          {
            listState ?
              <Grid className="grid-icon" size="18" onClick={() => handleChangeListState(false)}/>
              :
              <List className="switch-icon" size="18" onClick={() => handleChangeListState(true)}/>
          }
        </div>
        {openSortModal ?
        <SortModal
          handleChangeSortOpen={handleChangeSortOpen}
          setQuery={setTagSearchQuery}
          currentQuery={tagSearchQuery}
        />
        : ""}
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
            !(!showLoader && ideas.length === 0) ? ideas && ideas.map((idea, index) => {
              return (
                listState ? 
                  <Card2
                    idea={idea} 
                    key={index}
                  /> :
                  <Card
                    idea={idea} 
                    key={index}
                    cardWidth={"48%"}
                    cardHeight={"200px"}
                    cardContentLine={4}
                  />
              )
            }) : 
            <div className="no-idea">
              <p className="no-idea_text">まだひらめきがありません！</p>
              <p className="no-idea_text">ひらめきを追加しましょう！</p>
            </div>
          }
        </InfiniteScroll>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          {showLoader ? <CircularProgress style={{ margin: "24px auto" }}/> : ""}
        </div>
      </div>
        <div className="footer-menu">
            {/* <Link to='/home'>
                <div className="home-btn footer-btn">
                    <Home color="white" size="28"/>
                </div>
            </Link> */}
            <button className="shuffle-btn footer-btn" onClick={shuffle}>
                <Shuffle color="white" size="28"/>
            </button>
            <Link to='/ideas/new'>
                <button className="add-btn" >
                    <Plus color="#434343" size="28"/>
                </button>
            </Link>
            {/* <Link to='/ideas/new'>
                <div className="search-btn footer-btn">
                    <Search color="white" size="28"/>
                </div>
            </Link> */}
            <Link to='/ideas/new'>
                <div className="user-btn footer-btn">
                    <Settings color="white" size="28"/>
                </div>
            </Link>
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
          padding: 148px 12px 72px 12px;
          box-sizing: border-box;
          overflow-y: scroll;
          background-color: white;
        }

        .blur{
          display: ${openShuffleModal ? ";" : "none;"};
          z-index: 100;
					background-color: #333;
					backdrop-filter: blur(8px);
					opacity: 0.5;
					width: 100%;
					height: 100vh;
					position: absolute;
					top: 0px;
        }

        .list-header {
          width: 100%;
          top: 88px;
          height: 56px;
          z-index: 98;
          padding: 16px 16px 0 16px;
          box-sizing: border-box;
          background-color: white;
          position: fixed;
          display: flex;
        }

        .search {
          background-color: #F1F1F1;
          border: 1px solid #c4c4c4;
          border-radius: 4px;
          height: 32px;
          margin-right: 12px;
          width: calc(100% - 88px);
        }

        .sort{
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #c4c4c4;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .switch{
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #c4c4c4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-icon {
          position: absolute;
          z-index: 111;
          height: 32px;
          position-events: none;
          display: flex;
          align-items: center;
          justify-content: center; 
          padding-left: 10px;
        }

        .footer-menu {
          width: 280px;
          height: 72px;
          border-radius: 72px;
          box-sizing: border-box;
          padding: 12px 40px;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 24px;
          background-color: #434343;
          display: flex;
          justify-content: space-between;
        }

        .add-btn{
          height: 48px;
          width: 48px;
          border-radius: 50%;
          background-color: #FEB342;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer-btn {
          width: 44px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .no-idea {
          margin-top: 24px;
          text-align: center;
        }

        .no-idea_text {
          margin-bottom: 10px;
          font-size: 20px;
        }
      `}</style>
    </HomeLayout>
  );
}
