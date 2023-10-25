"use client";
import { articleService } from "@/services/articleService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Link from "next/link";

function Articles({ params }) {
  const [posts, setPosts] = useState([]);
  const { id } = params;

  useEffect(() => {
    const getPost = async (id) => {
      const response = await articleService.singleArticle(id);
      const { data } = response;
      setPosts(data);
      //console.log(data);
    };
    getPost();
  }, [id]);

  return (
    <>
      <main className="main">
        <section className="section-box">
          <div>
            <img src="images/img-single.png" />
          </div>
        </section>
        <section className="section-box">
          <div className="archive-header pt-50 text-center">
            <div className="container">
              <div className="box-white">
                <div className="max-width-single">
                  <a className="btn btn-tag" href="#">
                    Job Tips
                  </a>
                  <h2 className="mb-30 mt-20 text-center">
                    11 Tips to Help You Get New Clients Through Cold Calling
                  </h2>
                  <div className="post-meta text-muted d-flex align-items-center mx-auto justify-content-center">
                    <div className="author d-flex align-items-center mr-30">
                      <img alt="jobBox" src="images/user3.png" />
                      <span>Sarah Harding</span>
                    </div>
                    <div className="date">
                      <span className="font-xs color-text-paragraph-2 mr-20 d-inline-block">
                        <img
                          className="img-middle mr-5"
                          src="images/calendar.svg"
                        />{" "}
                        06 Sep 2022
                      </span>
                      <span className="font-xs color-text-paragraph-2 d-inline-block">
                        <img
                          className="img-middle mr-5"
                          src="images/time.svg"
                        />{" "}
                        8 mins to read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="post-loop-grid">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="single-body">
                  <div className="max-width-single">
                    <div className="font-lg mb-30">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque ornare pellentesque sollicitudin. Suspendisse
                        potenti. Fusce ex risus, iaculis sit amet sapien nec,
                        finibus malesuada mi. Proin at turpis eget sapien
                        pulvinar luctus. Vestibulum bibendum pharetra lorem eu
                        aliquam. In feugiat placerat risus, sed rutrum neque
                        mattis sit amet. Nullam vestibulum ante ac quam tempor,
                        id venenatis velit eleifend. Duis id iaculis risus, quis
                        ullamcorper augue. Nunc tristique venenatis ipsum at
                        euismod. Pellentesque id arcu est.
                      </p>
                    </div>
                  </div>
                  <figure>
                    <img src="images/img-content.png" />
                  </figure>
                  <div className="max-width-single">
                    <div className="content-single">
                      <p></p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque ornare pellentesque sollicitudin. Suspendisse
                        potenti. Fusce ex risus, iaculis sit amet sapien nec,
                        finibus malesuada mi. Proin at turpis eget sapien
                        pulvinar luctus. Vestibulum bibendum pharetra lorem eu
                        aliquam. In feugiat placerat risus, sed rutrum neque
                        mattis sit amet. Nullam vestibulum ante ac quam tempor,
                        id venenatis velit eleifend. Duis id iaculis risus, quis
                        ullamcorper augue. Nunc tristique venenatis ipsum at
                        euismod. Pellentesque id arcu est.
                      </p>
                      <h4>In ut odio libero</h4>
                      <ul>
                        <li>
                          A portfolio demonstrating well thought through and
                          polished end to end customer journeys
                        </li>
                        <li>
                          5+ years of industry experience in interactive design
                          and / or visual design
                        </li>
                        <li>Excellent interpersonal skills&#x202F;</li>
                        <li>
                          Aware of trends in&#x202F;mobile, communications, and
                          collaboration
                        </li>
                        <li>
                          Ability to create highly polished design prototypes,
                          mockups, and other communication artifacts
                        </li>
                        <li>
                          The ability to scope and estimate efforts accurately
                          and prioritize tasks and goals independently
                        </li>
                        <li>
                          History of impacting shipping products with your work
                        </li>
                        <li>
                          A Bachelor&rsquo;s Degree in Design (or related field)
                          or equivalent professional experience
                        </li>
                        <li>
                          Proficiency in a variety of design tools such as
                          Figma, Photoshop, Illustrator, and Sketch
                        </li>
                      </ul>
                      <p></p>
                      <p>
                        Phasellus enim magna, varius et commodo ut, ultricies
                        vitae velit. Ut nulla tellus, eleifend euismod
                        pellentesque vel, sagittis vel justo. In libero urna,
                        venenatis sit amet ornare non, suscipit nec risus. Sed
                        consequat justo non mauris pretium at tempor justo
                        sodales. Quisque tincidunt laoreet malesuada. Cum sociis
                        natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Integer vitae ante enim. Fusce
                        sed elit est. Suspendisse sit amet mauris in quam
                        pretium faucibus et aliquam odio.
                      </p>
                    </div>
                    <div className="single-apply-jobs mt-20">
                      <div className="row">
                        <div className="col-md-12 social-share">
                          <h6 className="color-text-paragraph-2 d-inline-block d-baseline mr-20 mt-10">
                            Share
                          </h6>
                          <a
                            className="mr-20 d-inline-block d-middle hover-up"
                            href="#"
                          >
                            <img alt="jobBox" src="images/fb.svg" />
                          </a>
                          <a
                            className="mr-20 d-inline-block d-middle hover-up"
                            href="#"
                          >
                            <img alt="jobBox" src="images/tw.svg" />
                          </a>
                          <a
                            className="mr-0 d-inline-block d-middle hover-up"
                            href="#"
                          >
                            <img alt="jobBox" src="images/pi.svg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
                <div className="widget_search mb-40">
                  <div className="search-form">
                    <form action="#">
                      <input type="text" placeholder="Search…" />
                      <button type="submit">
                        <i className="fi-rr-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="sidebar-shadow sidebar-news-small">
                  <h5 className="sidebar-title">Trending Now</h5>
                  <div className="post-list-small">
                    <div className="post-list-small-item d-flex align-items-center">
                      <figure className="thumb mr-15">
                        <img src="images/img5.png" alt="jobBox" />
                      </figure>
                      <div className="content">
                        <h5>How to get better agents in New York, USA</h5>
                        <div className="post-meta text-muted d-flex align-items-center mb-15">
                          <div className="author d-flex align-items-center mr-20">
                            <img alt="jobBox" src="images/user1.png" />
                            <span>Sugar Rosie</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-list-small-item d-flex align-items-center">
                      <figure className="thumb mr-15">
                        <img src="images/img4.png" alt="" />
                      </figure>
                      <div className="content">
                        <h5>How To Create a Resume for a Job in Social</h5>
                        <div className="post-meta text-muted d-flex align-items-center mb-15">
                          <div className="author d-flex align-items-center mr-20">
                            <img alt="jobBox" src="images/user3.png" />
                            <span>Harding</span>
                          </div>
                          <div className="date">
                            <span>17 Sep</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-list-small-item d-flex align-items-center">
                      <figure className="thumb mr-15">
                        <img src="images/img3.png" alt="" />
                      </figure>
                      <div className="content">
                        <h5>10 Ways to Avoid a Referee Disaster Zone</h5>
                        <div className="post-meta text-muted d-flex align-items-center mb-15">
                          <div className="author d-flex align-items-center mr-20">
                            <img
                              alt="jobBox"
                              src="assets/imgs/page/homepage1/user2.png"
                            />
                            <span>Steven</span>
                          </div>
                          <div className="date">
                            <span>23 Sep</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-list-small-item d-flex align-items-center">
                      <figure className="thumb mr-15">
                        <img src="images/img1.png" alt="" />
                      </figure>
                      <div className="content">
                        <h5>
                          How To Set Work-Life Boundaries From Any Location
                        </h5>
                        <div className="post-meta text-muted d-flex align-items-center mb-15">
                          <div className="author d-flex align-items-center mr-20">
                            <img alt="jobBox" src="images/user3.png" />
                            <span>Merias</span>
                          </div>
                          <div className="date">
                            <span>14 Sep</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-list-small-item d-flex align-items-center">
                      <figure className="thumb mr-15">
                        <img src="images/img2.png" alt="" />
                      </figure>
                      <div className="content">
                        <h5>How to Land Your Dream Marketing Job</h5>
                        <div className="post-meta text-muted d-flex align-items-center mb-15">
                          <div className="author d-flex align-items-center mr-20">
                            <img alt="jobBox" src="images/user1.png" />
                            <span>Rosie</span>
                          </div>
                          <div className="date">
                            <span>12 Sep</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Articles;
