
import { useState } from "react";
import { Link } from "react-router-dom";
import ReportDialogModal from "../Modals/ReportDialogModal";

export const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);;
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <footer className="footer pdtop" style={{paddingTop: '0px'}}>
        <div className="container">
          <div className="footer-bottom ">
            <div className="row">
              <div className="col-md-6">
              <p style={{color: 'white'}}> Supported By </p><br/>
              <div className="swiper-wrapper">

                <div className="swiper-slide">
                  <a href="#"><img src="images/EWER-WHITE.png" alt="jobBox" width={'20%'}/></a> &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                
              </div>  
              </div>
              <div className="col-md-6 text-md-end text-start">
                <div className="footer-social">
                  <Link className="font-xs color-text-paragraph" to="/">
                      Home
                  </Link>  &nbsp; &nbsp; &nbsp;
                  <Link className="font-xs color-text-paragraph" to="/about">
                      About
                  </Link>  &nbsp; &nbsp; &nbsp;
                  <Link className="font-xs color-text-paragraph" to="/about">
                      Resources
                  </Link>  &nbsp; &nbsp; &nbsp;
                  <Link onClick={handleShowModal} className="font-xs color-text-paragraph" >
                      Report
                  </Link> &nbsp; &nbsp; &nbsp;
                  <ReportDialogModal show={showModal} onHide={handleCloseModal} />
                  <Link to="/contact" className="font-xs color-text-paragraph" >
                      Contact
                  </Link> &nbsp; &nbsp; &nbsp;

                  <a className="font-xs color-text-paragraph mr-30 ml-30" href="#">
                    Copyright © {new Date().getFullYear()}. E.W.E.R.S 
                  </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
          
    </>
  )
}