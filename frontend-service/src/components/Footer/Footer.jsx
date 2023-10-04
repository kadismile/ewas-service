import Script from 'next/script';
export default function Footer () {
  return (
    <>
      <footer className="footer mt-50 pdtop">
        <div className="container">
        
          <div className="footer-bottom mt-50">
            <div className="row">
              <div className="col-md-6"><span className="font-xs color-text-paragraph">Copyright © {new Date().getFullYear()}. EWAS 
              <Script src="js/jquery-3.6.0.min.js"/></span></div>
              <div className="col-md-6 text-md-end text-start">
                <div className="footer-social"><a className="font-xs color-text-paragraph" href="#">Privacy Policy</a><a className="font-xs color-text-paragraph mr-30 ml-30" href="#">Terms &amp; Conditions</a><a className="font-xs color-text-paragraph" href="#">Security</a></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    

        <Script src="js/modernizr-3.6.0.min.js" />
        <Script src="js/jquery-3.6.0.min.js"/>
        <Script src="js/jquery-migrate-3.3.0.min.js"/>
        <Script src="js/bootstrap.bundle.min.js"/>
        <Script src="js/waypoints.js"/>
        <Script src="js/wow.js"/>
        <Script src="js/magnific-popup.js"/>
        <Script src="js/perfect-scrollbar.min.js"/>
        <Script src="js/select2.min.js"/>
        <Script src="js/isotope.js"/>
        <Script src="js/scrollup.js"/>
        <Script src="js/swiper-bundle.min.js"/>
        <Script src="js/counterup.js"/>
        <Script src="js/main.js"/>
          
    </>
  )
}