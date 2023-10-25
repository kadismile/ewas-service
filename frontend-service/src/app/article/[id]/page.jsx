"use client";
import { articleService } from "@/services/articleService";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SideBar } from "@/components/Blog/Sidebar";

function Article({ params }) {
  const { id } = params;

  const [post, setPost] = useState([]);
  const [newData, setNewData] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const response = await articleService.singleArticle({ id });
      const { data } = response;
      setPost(data);
    };
    getPost();
  }, [newData]);
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
                    <div className="col-lg-12 mb-30">
                      <div className="card-grid-3 hover-up">
                        <div className="text-center card-grid-3-image">
                          <Link href={`/article/${post._id}`}>
                            <figure>
                              <img alt="jobBox" src="/images/img3.png" />
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
                              {post.title}
                            </Link>
                          </h5>
                          <p className="mt-10 color-text-paragraph font-sm">
                            {post.postContent}
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
                                    <span className="font-xs color-text-paragraph-2">
                                      25 April 2022
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 text-end col-6 pt-15">
                                <span className="color-text-paragraph-2 font-xs">
                                  8 mins to read
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default Article;
