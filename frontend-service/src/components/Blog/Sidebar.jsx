import { articleService } from "@/services/articleService";
import { useState, useEffect } from "react";

import Link from "next/link";

export const SideBar = () => {
  const [data, setdata] = useState([]);
  const [newData, setNewData] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    articleService.sideBar().then((res) => {
      const { data } = res;
      setdata(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [newData]);

  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
      <div className="widget_search mb-40">
        <div className="search-form">
          <form action="#">
            <input type="text" placeholder="Search articles" />

            <button type="submit">
              <i className="fi-rr-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-shadow sidebar-news-small">
        <h5 className="sidebar-title">Trending Now</h5>
        <div className="post-list-small">
          {data.map((post, index) => (
            <a href={`/article/${post._id}`} key={index}>
              <div className="post-list-small-item d-flex align-items-center">
                <figure className="thumb mr-15">
                  <img src={`/images/img5.png`} alt="jobBox" />
                </figure>
                <div className="content">
                  <h5>{post.title}</h5>
                  <div className="post-meta text-muted d-flex align-items-center mb-15">
                    <div className="date">
                      <span>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
