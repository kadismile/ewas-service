import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user-slice";
import { useEffect, useState } from "react";
import { crudService } from "../../services/crudService";
import { ChangePasswordModal } from "../../modals/ChangePasswordModal";
import { Notifications } from "../Notification/Notification";
import { Link, useLocation } from "react-router-dom";
import { WithPermissions } from "../../components/elements/WithPermissions";
import { 
  DEPARTMENT_PERMISSIONS, 
  SUSPEND_USER_PERMISSIONS, 
  ARTICLE_PERMISSIONS } from "../../utils/permissions.js"

export const Header = () => {
  const location = useLocation();
  const getActiveLink = (pathname) => {
    const path = location.pathname;
    if (pathname.includes(path)) {
      return "active";
    }
  };
  const [data, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to track mobile menu
  let user = store?.getState()?.user?.user;
  if (user) {
    user = user.user;
  }
  const { fullName } = user;

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(resetUser());
    window.location.replace("/");
  };

  useEffect(() => {
    crudService.getNotifications().then((res) => {
      const { data } = res;
      setdata(data);
    });
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    console.log('menuOpen --------->>>>>', menuOpen)
    setMenuOpen(!menuOpen); // Toggle mobile menu state
  };

  return (
    <>
      <ChangePasswordModal show={showModal} onHide={handleCloseModal} />
      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <a className="d-flex" href="/">
                  <img
                    alt="jobBox"
                    src="/images/PARTNER-LOGO.png"
                    style={{ width: "68%" }}
                  />
                </a>
              </div>
            </div>
            <div className="header-right">
              <div className="block-signin">
                <Notifications />

                <div className="dropdown d-inline-block">
                  <ul
                    className="dropdown-menu dropdown-menu-light dropdown-menu-end"
                    aria-labelledby="dropdownNotify"
                  >
                    <li>
                      <a className="dropdown-item active" href="#">
                        10 notifications
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        12 messages
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        20 replies
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="member-login">
                  <img src="/images/profile-photo.webp" alt="jobBox" />
                  <div className="info-member">
                    <strong className="color-brand-1">{fullName}</strong>
                    <div className="dropdown">
                      <a
                        className="font-xs color-text-paragraph-2 icon-down"
                        id="dropdownProfile"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                        style={{ color: "#3b65f5" }}
                      >
                        {user?.department?.acronym}
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-light dropdown-menu-end"
                        aria-labelledby="dropdownProfile"
                      >
                        <li>
                          <a className="dropdown-item" href="/#">
                            Profiles
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handleShowModal}
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/login"
                            onClick={logOut}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class={`burger-icon burger-icon-white ${menuOpen? 'burger-close' : ''}`} onClick={toggleMenu}>
        <span class="burger-icon-top"></span>
        <span class="burger-icon-mid"></span>
        <span class="burger-icon-bottom"></span>
      </div>

      <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${
          menuOpen ? 'sidebar-visible' : ''
        }`}>
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
                <ul className="main-menu">
              <li onClick={toggleMenu}> 
                <Link className={`dashboard2 ${getActiveLink(["/"])}`} to="/">
                    <img src="/images/dashboard.svg" alt="jobBox" />
                    <span className="name">Dashboard</span>
                </Link> 
              </li>

              <li onClick={toggleMenu}>
                <Link className={`dashboard2 ${getActiveLink(["/reports"])}`} to="/reports">
                  <img src="/images/tasks.svg" alt="jobBox" />
                  <span className="name">Reports</span>
                </Link> 
              </li>

              <li onClick={toggleMenu}>
                <Link className={`dashboard2 ${getActiveLink(["/sms-reports"])}`} to="/sms-reports">
                  <img src="/images/tasks.svg" alt="jobBox" />
                  <span className="name">SMSReports</span>
                </Link> 
              </li>

              
              <WithPermissions permitedPermissions={ SUSPEND_USER_PERMISSIONS }>
                <li onClick={toggleMenu}>
                  <Link className={`dashboard2 ${getActiveLink(["/reporters"])}`} to="/reporters">
                    <img src="/images/profiles.svg" alt="jobBox" />
                    <span className="name">Reporters</span>
                  </Link> 
                </li>
              </WithPermissions>

              
              <WithPermissions permitedPermissions={ DEPARTMENT_PERMISSIONS }>
                <li onClick={toggleMenu}>
                  <Link className={`dashboard2 ${getActiveLink(["/department"])}`} to="/department">
                    <img src="/images/jobs.svg" alt="jobBox" />
                    <span className="name">Departments</span>
                  </Link>
                </li>
              </WithPermissions>
              

              <WithPermissions permitedPermissions={ SUSPEND_USER_PERMISSIONS }><li>
                <Link className={`dashboard2 ${getActiveLink(["/responder"])}`} to="/responder" onClick={toggleMenu}>
                  <img src="/images/profiles.svg" alt="jobBox" />
                  <span className="name">Responders</span>
                </Link> 
                </li>
              </WithPermissions>

              <WithPermissions permitedPermissions={ ARTICLE_PERMISSIONS }>
                <li onClick={toggleMenu}>
                  <Link className={`dashboard2 ${getActiveLink(["/articles"])}`} to="/articles">
                    <img src="/images/profiles.svg" alt="jobBox" />
                    <span className="name">Articles</span>
                  </Link> 
                </li>
              </WithPermissions>
              
              <WithPermissions permitedPermissions={ SUSPEND_USER_PERMISSIONS }>
                <li onClick={toggleMenu}>
                  <Link className={`dashboard2 ${getActiveLink(["/users"])}`} to="/users">
                    <img src="/images/candidates.svg" alt="jobBox" />
                    <span className="name">Users</span>
                  </Link> 
                </li>
              </WithPermissions>  


        

            </ul>
                </nav>
              </div>
              <div className="mobile-account">
                <h6 className="mb-10">Your Account</h6>
                <ul className="mobile-menu font-heading">
                <li onClick={toggleMenu}>
                          <a className="dropdown-item" href="/#">
                            Profiles
                          </a>
                        </li>
                        <li onClick={toggleMenu}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handleShowModal}
                          >
                            Change Password
                          </a>
                        </li>
                        <li onClick={toggleMenu}>
                          <a
                            className="dropdown-item"
                            href="/login"
                            onClick={logOut}
                          >
                            Logout
                          </a>
                        </li>
                </ul>
              </div>
              <div className="site-copyright">
                Copyright {new Date().getFullYear()} © EWERS. <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
