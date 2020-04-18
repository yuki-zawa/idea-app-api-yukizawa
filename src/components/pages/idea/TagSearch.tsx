import React, {useState} from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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

export const TagSearch: React.FC = () => {
  const classes = useStyles();
  const [searchState, setSearchState] = useState(false);

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

  const filter = () => {
    pullUp();
  }

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
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
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
                  classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                />
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
      `}</style>
    </div>

  );
}