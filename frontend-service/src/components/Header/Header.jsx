"use client";
import appStorage from "@/redux/customStorage";
import Link from "next/link";

export default function Header() {
  const { getItem } = appStorage;
  const { user } = getItem("user");
  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" href="/">
                  <img alt="jobBox" src="images/LOGO.png" />
                </Link>
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  <li>
                    <Link className="active" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/articles">Articles</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
            <div className="header-right">
              {user ? (
                <div className="block-signin">
                  <Link className="text-link-bd-btom hover-up" href="register">
                    {" "}
                    {user.fullName}{" "}
                  </Link>{" "}
                  / &nbsp;
                  <Link
                    className="text-link-bd-btom hover-up"
                    href="/"
                    onClick={logout}
                  >
                    {" "}
                    {"logout"}{" "}
                  </Link>
                </div>
              ) : (
                <div className="block-signin">
                  <Link className="text-link-bd-btom hover-up" href="register">
                    Register
                  </Link>
                  <Link
                    className="btn btn-success btn-sm btn-shadow ml-40 hover-up"
                    href="login"
                  >
                    SIGN IN
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-search mobile-header-border mb-30">
                <form action="#">
                  <input type="text" placeholder="Search…" />
                  <i className="fi-rr-search" />
                </form>
              </div>
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
                  <ul className="mobile-menu font-heading">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About Us</Link>
                    </li>
                    <li>
                      <Link href="/articles">Articles</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="mobile-account">
                <h6 className="mb-10">Your Account</h6>
                <ul className="mobile-menu font-heading">
                  <li>
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Work Preferences</a>
                  </li>
                  <li>
                    <a href="#">Account Settings</a>
                  </li>
                  <li>
                    <a href="#">Go Pro</a>
                  </li>
                  <li>
                    <a href="page-signin.html">Sign Out</a>
                  </li>
                </ul>
              </div>
              <div className="site-copyright">
                Copyright {new Date().getFullYear()} © JobBox. <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
