import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user-slice";
import { useEffect,  useState } from 'react';
import { crudService } from '../../services/crudService';
import parse from 'html-react-parser';
import { ChangePasswordModal } from '../../modals/ChangePasswordModal';
import { GoogleSearchModal } from "../../modals/GoogleSearchModal";

export const Header = () => {
  const [data, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
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

  useEffect(() => {
    crudService.getNotifications()
    .then((res) => {
      const { data } = res;
      setdata(data)
    });
  }, [])

  const handleShowModal = (data) => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowGoogle(false)
  };

  console.log('showGoogle ', showGoogle)

  return (
    <>
    <ChangePasswordModal show={showModal} onHide={handleCloseModal} />
    <GoogleSearchModal show={showGoogle} onHide={handleCloseModal} />
      <header className="header sticky-bar"> 
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <a className="d-flex" href="/">
                  {/* <img alt="jobBox" src="/images/logo.svg" /> */}
                  <h3> E W E R</h3>
                </a>
                </div><span className="btn btn-grey-small ml-10">Admin area</span>
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
                <a  onClick={ () => setShowGoogle(true)} class="btn btn-default hover-up" href="#/"><i class="fa-brands fa-google"></i></a> &nbsp;
               {/*  <a class="btn btn-default  hover-up" href="#/"><i class="fa-brands fa-twitter"></i></a> */}

                <a className="btn btn-notify" id="dropdownNotify" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static"></a>
                  <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownNotify">
                    {
                      data.map((not, key)=> {
                        return (
                          <li key={key}>
                            <a className="dropdown-item active">
                              { parse(not.message) }
                              </a>
                        </li>
                        )
                      })
                    }
                  
                  </ul>
                </div>
                <div className="dropdown d-inline-block">
                  <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownNotify">
                    <li><a className="dropdown-item active" href="#">10 notifications</a></li>
                    <li><a className="dropdown-item" href="#">12 messages</a></li>
                    <li><a className="dropdown-item" href="#">20 replies</a></li>
                  </ul>
                </div>
                
                <div className="member-login">
                  <img src="/images/profile-photo.webp" alt="jobBox" />
                  <div className="info-member"> <strong className="color-brand-1">{fullName}</strong>
                    <div className="dropdown"><a className="font-xs color-text-paragraph-2 icon-down" 
                        id="dropdownProfile" 
                        type="button" data-bs-toggle="dropdown" 
                        aria-expanded="false" 
                        data-bs-display="static"
                        style={{color: '#3b65f5'}}>{user?.department?.acronym}</a>
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownProfile">
                        <li><a className="dropdown-item" href="/#">Profiles</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleShowModal()}>Change Password</a></li>
                        <br/>
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