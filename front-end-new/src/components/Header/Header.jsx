import { useState } from "react";
import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user-slice";
import { useLocation, Link } from "react-router-dom";

export const Header = () => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const { fullName } = user || {}

  const dispatch = useDispatch();
  const location = useLocation();
  const getActiveLink = (pathname) => {
    const path = location.pathname;
    if (pathname.includes(path)) {
      return "active";
    }
  };

  const logOut = () => {
    dispatch( resetUser());
    window.location.replace("/");
  }

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(menuVisible => !menuVisible);
  };

  return (
    <>
      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
              <Link className="d-flex" to="/">
                <img alt="jobBox" src="/images/PARTNER-LOGO.png" />
              </Link>
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  <li>
                    <Link className={`${getActiveLink(["/"])}`} to="/">
                      Home
                    </Link> 
                  </li>

                  <li>
                    <Link className={`${getActiveLink(["/about"])}`} to="/about">
                      About
                    </Link> 
                  </li>

                  <li>
                    <Link className={`${getActiveLink(["/resources"])}`} to="/resources">
                      Resources
                    </Link> 
                  </li>
                  <li>
                    <Link className={`${getActiveLink(["/contact"])}`} to="/contact">
                      Contact
                    </Link> 
                  </li>


                  {
                    user?.fullName &&
                    <li className="has-children">
                      <a>Dashboard</a>
                      <ul class="sub-menu">
                        <li>
                        <Link className={`${getActiveLink(["/report"])}`} to="/user-profile">
                            Report
                          </Link> 
                          <Link className={`${getActiveLink(["/user-profile"])}`} to="/user-profile">
                            Report History
                          </Link> 
                        </li>
                        <li>
                          <Link className="text-link-bd-btom hover-up" to='/' onClick={logOut}> { 'logout' } </Link>
                        </li>
                      </ul>
                    </li>
                  }
                  
                  
                </ul>
              </nav>

              {/* TOggle Menu Visibilty */}
              {!menuVisible && <div className="burger-icon burger-icon-white" onClick={toggleMenu}>
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>}

            </div>
            <div className="header-right">
              {
                user ? 
                  <div className="block-signin">
                    <Link className="text-link-bd-btom hover-up" to="register" to="/user-profile"> Welcome! &nbsp; { fullName } </Link>
                  </div> : 
              <div className="block-signin">
              <Link className="text-link-bd-btom hover-up" to="register">Register</Link>
              <Link  className="btn btn-default btn-shadow ml-40 hover-up" to="login"> Sign in</Link>
            </div>
              }
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${ menuVisible ? 'sidebar-visible' : ''}`}>
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
            { menuVisible &&
                <div class="burger-icon burger-icon-white burger-close" onClick={toggleMenu}>
                <span class="burger-icon-top"></span>
                <span class="burger-icon-mid"></span>
                <span class="burger-icon-bottom"></span>
              </div> }
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
                  <ul className="mobile-menu font-heading">
                  <li>
                    <Link className={`${getActiveLink(["/home"])}`}
                      onClick={ () => setMenuVisible(false)} to="/home">
                        Home
                    </Link> 
                  </li>

                    <li>
                      <Link to="/about" onClick={ () => setMenuVisible(false)} >About Us</Link>
                    </li>

                    <li>
                      <Link to="/resources" onClick={ () => setMenuVisible(false)} >Resources</Link>
                    </li>

                    <li>
                      <Link to="/report" onClick={ () => setMenuVisible(false)} >Report An Incident</Link>
                    </li>

                    <li>
                      <Link to="/contact" onClick={ () => setMenuVisible(false)} >Contact Us</Link>
                    </li>
                    {
                      !fullName ? 
                      <>
                        <li>
                          <Link to="/login" onClick={ () => setMenuVisible(false)} >Login</Link>
                        </li> 

                        <li>
                          <Link to="/register" onClick={ () => setMenuVisible(false)} >Register</Link>
                        </li>
                      </>
                        :
                        <>
                        <li>
                          <Link to="/user-profile" onClick={ () => setMenuVisible(false)} >Profile</Link>
                        </li> 
                        </>
                    }
                    
                  </ul>
                </nav>
              </div>

              { fullName &&
                <div className="mobile-account">
                <h5 className="mb-10"> Welcome! { fullName }</h5>
                <ul className="mobile-menu font-heading">
                  <li>
                    <Link className="text-link-bd-btom hover-up" to='/' onClick={logOut}> { 'logout' } </Link>
                  </li>
                  
                </ul>
                </div>
              }

          
              <div className="site-copyright">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Copyright {new Date().getFullYear()} © EWERS. <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}