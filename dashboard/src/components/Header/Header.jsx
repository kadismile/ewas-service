import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user-slice";

export const Header = () => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const { fullName } = user

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch( resetUser() );
    window.location.replace("/");
  }

  return (
    <>
      <header className="header sticky-bar"> 
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo"><a className="d-flex" href="index.html"><img alt="jobBox" src="/images/logo.svg" /></a></div><span className="btn btn-grey-small ml-10">Admin area</span>
            </div>
            <div className="header-search"> 
              <div className="box-search"> 
                <form action>
                  <input className="form-control input-search" type="text" name="keyword" placeholder="Search" />
                </form>
              </div>
            </div>
            <div className="header-menu d-none d-md-block">
            
            </div>
            <div className="header-right">
              <div className="block-signin">
                <div className="dropdown d-inline-block">
                  <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownNotify">
                    <li><a className="dropdown-item active" href="#">10 notifications</a></li>
                    <li><a className="dropdown-item" href="#">12 messages</a></li>
                    <li><a className="dropdown-item" href="#">20 replies</a></li>
                  </ul>
                </div>
                <div className="member-login"><img alt="" src="/images/profile.png" />
                  <div className="info-member"> <strong className="color-brand-1">{fullName}</strong>
                    <div className="dropdown"><a className="font-xs color-text-paragraph-2 icon-down" id="dropdownProfile" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">Super Admin</a>
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownProfile">
                        <li><a className="dropdown-item" href="profile.html">Profiles</a></li>
                        <li><a className="dropdown-item" href="my-resume.html">CV Manager</a></li>
                        <li><a className="dropdown-item" href="/login" onClick={() => logOut()}>Logout</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}