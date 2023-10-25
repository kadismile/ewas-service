"use client";
import { articleService } from "@/services/articleService";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SideBar } from "@/components/Blog/Sidebar";

function Articles() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await articleService.getAllArticle({ currentPage });
    const { data, totalPages } = response;
    setPosts(data);
    setTotalPages(totalPages);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <main className="main">
        <section className="section-box">
          <div className="breacrumb-cover bg-img-about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="mb-10">Articles</h2>
                  <p className="font-lg color-text-paragraph-2">
                    Get the latest news, updates and tips
                  </p>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <ul className="breadcrumbs mt-40">
                    <li>
                      <a className="home-icon" href="#">
                        Home
                      </a>
                    </li>
                    <li>Articles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-50">
          <div className="post-loop-grid">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    {posts
                      ? posts.map((post, index) => (
                          <div className="col-lg-6 mb-30" key={index}>
                            <div className="card-grid-3 hover-up">
                              <div className="text-center card-grid-3-image">
                                <Link href={`/article/${post._id}`}>
                                  <figure>
                                    <img alt="jobBox" src="images/img3.png" />
                                  </figure>
                                </Link>
                              </div>
                              <div className="card-block-info">
                                <div className="tags mb-15">
                                  <Link
                                    className="btn btn-tag"
                                    href={`/article/${post._id}`}
                                  >
                                    {post.category}
                                  </Link>
                                </div>
                                <h5>
                                  <Link href={`/article/${post._id}`}>
                                    {post.title.slice(0, 80)}
                                  </Link>
                                </h5>
                                <p className="mt-10 color-text-paragraph font-sm">
                                  {post.postContent.slice(0, 120)}
                                </p>
                                <div className="card-2-bottom mt-20">
                                  <div className="row">
                                    <div className="col-lg-6 col-6">
                                      <div className="d-flex">
                                        <img
                                          className="img-rounded"
                                          src="/images/user1.png"
                                        />
                                        <div className="info-right-img">
                                          <span className="font-sm font-bold color-brand-1 op-70">
                                            EWERS
                                          </span>
                                          <br />
                                          <span className="font-xs color-text-paragraph-2">
                                            {new Date(
                                              post.createdAt
                                            ).toDateString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 text-end col-6 pt-15">
                                      <span className="color-text-paragraph-2 font-xs">
                                        <Link href={`/article/${post._id}`}>
                                          Read More
                                        </Link>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  <div className="paginations">
                    <ul className="pager">
                      <li>
                        <button
                          className="pager-prev"
                          onClick={() => handlePageChange(currentPage - 1)}
                        ></button>
                      </li>
                      <li>
                        <a className="pager-number">
                          Page {currentPage} of {totalPages}
                        </a>
                      </li>

                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="pager-next"
                        ></button>
                      </li>
                    </ul>
                  </div>
                </div>
                <SideBar />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default Articles;
