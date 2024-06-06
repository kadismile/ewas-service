import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reportService } from "../services/reporterService";
import { PageLoader } from "../components/elements/spinners"
import moment from "moment";
import Editor from '../components/elements/Editor';

export const ResourceDetils = () => {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    if (articleId) {
      reportService.getOneRosource(articleId)
      .then((res) => {
        const { status, data } = res
        if (status === 'success') {
          setData(data.article)
          setTimeout(()=> setLoading(false), 500)
        }
      })
    }
  }, [articleId])

  const editorData = (description) => {
    return JSON.parse(description)
  }


  return (
    <>
      {
        loading ? <PageLoader /> :
        <main className="main">
            <section className="section-box-2">
              <div className="container">
                <div className="box-company-profile">
                </div>
              </div>
            </section>
            
            <section className="section-box mt-5">
              <div className="section-box wow animate__animated animate__fadeIn">
                <div className="container">
                  <div className="text-start">
                    <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">{data.title}</h2>
                    <span> {moment(data.createdAt).format('ll')}</span>
                    <div className="border-bottom pt-10 pb-10" />
                  </div>
                  <div className="mt-50">
                    <div className="tab-content" id="myTabContent-1">
                      <div className="tab-pane fade show active" id="tab-job-1" role="tabpanel" aria-labelledby="tab-job-1">
                      <Editor
                        data={editorData(data.description)}
                        readOnly={true}
                        holder= {'editorjs-container'}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
  
  
  
  
  
  
      }
    </>
    )
}
