
export const Footer = () => {
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
                  <a href="#"><img src="images/partners/footer logo.png" alt="jobBox" width={'20%'}/></a> &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                
              </div>  
              </div>
              <div className="col-md-6 text-md-end text-start">
                <div className="footer-social">
                  <a className="font-xs color-text-paragraph" href="#">Privacy Policy</a>
                <a className="font-xs color-text-paragraph mr-30 ml-30" href="#">Terms &amp; Conditions</a>
                <a className="font-xs color-text-paragraph mr-30 ml-30" href="#">Copyright © {new Date().getFullYear()}. E.W.E.R.S </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
          
    </>
  )
}