import React, {useState, useEffect,useRef} from "react";
import { HomeLayout } from "../../common/HomeLayout";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Card } from './Card'

export const IdeaList: React.FC = (props: any) => {
  const [ideas, setIdeas] = useState([]);
  const [showLoader, setShowLoader] = React.useState(false);
  const [pagenation, setPagenation] = React.useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const fetchIdeas = async () => {
    setShowLoader(true);

    let response = await axios
      .get(`/api/v1/ideas?page=${pagenation.currentPage}&limit=${pagenation.perPage}`)
      .then(result => result.data)
      .catch(error => {
        console.log(error);
      })
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
        `/api/v1/ideas?page=${pagenation.currentPage + 1}&limit=${pagenation.perPage}`
      )
      .then(result => result.data)
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
    // 配列の後ろに追加
    setIdeas(ideas.concat(response.data));
    setPagenation({
      total: response ? response.meta.total : 0,
      perPage: response ? response.meta.perPage: 10,
      currentPage: response ? response.meta.currentPage : 1
    });
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <HomeLayout title="idea list">
      <div className="container">
        <InfiniteScroll
          pageStart={1}
          hasMore={!showLoader && ideas && (pagenation.total > ideas.length)}
          loadMore={fetchMoreIdeas}
          initialLoad={false}
        >
          {
            ideas && ideas.map((idea, index) => {
              return (
                <Card 
                  idea={idea} 
                  key={index}
                />
              )
            })
          }
        </InfiniteScroll>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          {showLoader ? <CircularProgress style={{ margin: "24px auto" }}/> : ""}
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 1.25rem 1rem;
          overflow: auto;
          clear: both;
        }  
      `}</style>
    </HomeLayout>
  );
}
