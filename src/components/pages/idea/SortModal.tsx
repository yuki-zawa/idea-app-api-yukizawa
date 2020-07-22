import React, { useState, useRef, useEffect } from "react";
import { Check } from 'react-feather';

type SortModalProps = {
  handleChangeSortOpen: any,
  setQuery: any,
  currentQuery: string,
};

export const SortModal: React.FC<SortModalProps> = (props: any) => {
  var temp = props.currentQuery.match(/&sort=(.*)(?=&)|&sort=(.*)(?!&)/);
  const [sortValue, setSortValue] = useState(temp[1] ? temp[1] : temp[2]);

  const sort = (event: any) => {
    var queryString = props.currentQuery.replace(/&sort=.*(?=&)|&sort=.*(?!&)/g, '');
    props.setQuery(queryString + `&sort=${event.target.id}`);
    setSortValue(event.target.id);
    props.handleChangeSortOpen(false)
  }

  return (
    <div className="container">
      <div className="header">
        <p>並べ替え</p>
        <button onClick={() => props.handleChangeSortOpen(false)}>完了</button>
      </div>
      <ul className="list">
				<li className="list-option">
					<span className="check_wrapper">
						{sortValue === "new" ? <Check size="20"/> : ""}
					</span>
					<p id="new" onClick={sort} className={sortValue === "new" ? "selected" : ""}>
          	追加した日：新しい順
        	</p>	
				</li>
				<li className="list-option">
					<span className="check_wrapper">
						{sortValue === "old" ? <Check size="20"/> : ""}
					</span>
					<p id="old" onClick={sort} className={sortValue === "old" ? "selected" : ""}>
						追加した日：古い順　
					</p>
				</li>
				<li className="list-option">
					<span className="check_wrapper">
						{sortValue === "high" ? <Check size="20"/> : ""}
					</span>
					<p id="high" onClick={sort} className={sortValue === "high" ? "selected" : ""}>
						ひらめき度：高い順　
					</p>
				</li>
				<li className="list-option">
					<span className="check_wrapper">
						{sortValue === "low" ? <Check size="20"/> : ""}
					</span>
					<p id="low" onClick={sort} className={sortValue === "low" ? "selected" : ""}>
						ひらめき度：低い順　
					</p>
				</li>
      </ul>
			<style jsx>{`
        .container {
          background-color: white;
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #C4C4C4;
          border-radius: 4px;
          box-shadow: rgba(233, 233, 233, 0.25) 0px 0px 8px 0px, rgba(163, 163, 163, 0.25) 0px 2px 6px 0px;
          position: absolute;
          top: 110px;
          max-width: 320px;
          right: 16px;
          left: auto;
          z-index: 160;
        }

        .header {
          height: 32px;
          width: 100%;
          text-align: center;
          padding: 4px 0;
        }

        .header p {
          line-height: 32px;
        }

        .header button {
          position: absolute;
					right: 12px;
					top: 3px;
          height: 32px;
          font-size: 16px;
          font-weight: bold;
          color: #579AFF;
        }

        .list {
          background-color: #F1F1F1;
					text-align: center;
					padding: 12px 0;
				}
				
				.list-option{
					display: flex;
					align-items: center;
					justify-content: center;
				}

        .list p {
          padding: 10px 0;
          cursor: pointer;
        }

        .selected {
					font-weight: bold;
				}
				.check_wrapper{
					width: 2em;
					height: 1em;
					margin-bottom: 4px;
				}
      `}</style>
    </div>
  );
}
