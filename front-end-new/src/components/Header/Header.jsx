import { useState } from "react";
import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user-slice";
import { Link } from "react-router-dom";

export const Header = () => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const { fullName } = user || {}

  const dispatch = useDispatch();

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
                <img alt="jobBox" src="images/LOGO.png" />
              </Link>
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  <li>
                    <Link className="" to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/articles">Articles</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
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
                    <Link className="text-link-bd-btom hover-up" to="register"> { fullName } </Link> / &nbsp;
                    <Link className="text-link-bd-btom hover-up" to='/' onClick={logOut}> { 'logout' } </Link>
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
                    <Link to="/" onClick={ () => setMenuVisible(false)} >Home</Link>
                  </li>
                  <li>
                      <Link to="/report" onClick={ () => setMenuVisible(false)} >Report</Link>
                  </li>

                    <li>
                    <Link to="/about">About Us</Link>
                    </li>
                    
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                </nav>
              </div>

              { fullName &&
                <div className="mobile-account">
                <h6 className="mb-10">Your Account { fullName }</h6>
                <ul className="mobile-menu font-heading">
                  <li>
                    <Link className="text-link-bd-btom hover-up" to='/' onClick={logOut}> { 'logout' } </Link>
                  </li>
                  
                </ul>
                </div>
              }

          
              <div className="site-copyright">
                Copyright {new Date().getFullYear()} © EWERS. <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}