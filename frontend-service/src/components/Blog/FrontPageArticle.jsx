import { articleService } from "@/services/articleService";
import { useState, useEffect } from "react";
import Link from "next/link";

export const FrontArticle = () => {
  const [data, setdata] = useState([]);
  const [newData, setNewData] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    articleService.frontPageArticle().then((res) => {
      const { data } = res;
      setdata(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [newData]);

  return (
    <section className="section-box mt-50">
      <div className="section-box wow animate__animated animate__fadeIn">
        <div className="container">
          <div className="text-start">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              Articles On Latest Incidents & Conflicts
            </h2>
          </div>
          <div className="mt-50">
            <div className="tab-content" id="myTabContent-1">
              <div
                className="tab-pane fade show active"
                id="tab-job-1"
                role="tabpanel"
                aria-labelledby="tab-job-1"
              >
                <div className="row">
                  {data.map((post, index) => (
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                      key={index}
                    >
                      <div className="card-grid-2 grid-bd-16 hover-up">
                        <div className="card-grid-2-image">
                          <span className="lbl-hot bg-green">
                            <span>{post.category}</span>
                          </span>
                          <div className="image-box">
                            <figure>
                              <img src="images/img1.png" alt="jobBox" />
                            </figure>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h5>
                            <a href={`/article/${post._id}`}>
                              {post.title.slice(0, 80)}
                            </a>
                          </h5>
                          <div className="card-2-bottom mt-20">
                            <div className="row"></div>
                          </div>
                          <p className="font-sm color-text-paragraph mt-20">
                            {post.postContent.slice(0, 120)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <a
                    href={`/articles`}
                    className="btn btn-brand-1 btn-icon-more hover-up"
                  >
                    See more{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
