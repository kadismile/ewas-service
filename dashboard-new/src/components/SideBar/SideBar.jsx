import { Link, useLocation } from "react-router-dom";
import { WithPermissions } from "../../components/elements/WithPermissions";
import { DEPARTMENT_PERMISSIONS, SUSPEND_USER_PERMISSIONS } from "../../utils/permissions.js"

export const SideBar = () => {
  const location = useLocation();
  const getActiveLink = (pathname) => {
    const path = location.pathname;
    if (pathname.includes(path)) {
      return "active";
    }
  };
  

  return (
    <>
      <div className="nav">
          <nav className="nav-main-menu">
            <ul className="main-menu">
              <li> 
                <Link className={`dashboard2 ${getActiveLink(["/"])}`} to="/">
                    <img src="/images/dashboard.svg" alt="jobBox" />
                    <span className="name">Dashboard</span>
                </Link> 
              </li>

              <li>
                <Link className={`dashboard2 ${getActiveLink(["/reports"])}`} to="/reports">
                  <img src="/images/tasks.svg" alt="jobBox" />
                  <span className="name">Reports</span>
                </Link> 
              </li>

              
              <li>
                <Link className={`dashboard2 ${getActiveLink(["/reporters"])}`} to="/reporters">
                  <img src="/images/profiles.svg" alt="jobBox" />
                  <span className="name">Reporters</span>
                </Link> 
              </li>

              
              <WithPermissions permitedPermissions={ DEPARTMENT_PERMISSIONS }>
                <li>
                  <Link className={`dashboard2 ${getActiveLink(["/department"])}`} to="/department">
                    <img src="/images/jobs.svg" alt="jobBox" />
                    <span className="name">Department</span>
                  </Link>
                </li>
              </WithPermissions>
              

              <li>
                <Link className={`dashboard2 ${getActiveLink(["/responder"])}`} to="/responder">
                  <img src="/images/profiles.svg" alt="jobBox" />
                  <span className="name">Responder</span>
                </Link> 
              </li>

              <li>
                <Link className={`dashboard2 ${getActiveLink(["/articles"])}`} to="/articles">
                  <img src="/images/profiles.svg" alt="jobBox" />
                  <span className="name">Articles</span>
                </Link> 
              </li>
              
              <WithPermissions permitedPermissions={ SUSPEND_USER_PERMISSIONS }>
                <li>
                  <Link className={`dashboard2 ${getActiveLink(["/users"])}`} to="/users">
                    <img src="/images/candidates.svg" alt="jobBox" />
                    <span className="name">Users</span>
                  </Link> 
                </li>
              </WithPermissions>  


            

              {/* <li> <a className="dashboard2" href="recruiters.html"><img src="/images/recruiters.svg" alt="jobBox" /><span className="name">Recruiters</span></a>
              </li>
              <li> <a className="dashboard2" href="my-job-grid.html"><img src="/images/jobs.svg" alt="jobBox" /><span className="name">My Jobs</span></a>
              </li>
              <li> <a className="dashboard2" href="my-tasks-list.html"><img src="/images/tasks.svg" alt="jobBox" /><span className="name">Tasks List</span></a>
              </li>
              <li> <a className="dashboard2" href="profile.html"><img src="/images/profiles.svg" alt="jobBox" /><span className="name">My Profiles</span></a>
              </li>
              <li> <a className="dashboard2" href="my-resume.html"><img src="/images/cv-manage.svg" alt="jobBox" /><span className="name">CV Manage</span></a>
              </li>
              <li> <a className="dashboard2" href="settings.html"><img src="/images/settings.svg" alt="jobBox" /><span className="name">Setting</span></a>
              </li>
              <li> <a className="dashboard2" href="authentication.html"><img src="/images/authentication.svg" alt="jobBox" /><span className="name">Authentication</span></a>
              </li>
              <li> <a className="dashboard2" href="login.html"><img src="/images/logout.svg" alt="jobBox" /><span className="name">Logout</span></a>
              </li> */}

            </ul>
          </nav>
          <div className="border-bottom mb-20 mt-20" />
          <div class="footer-social">
            
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        
        </div>
    </>
  )
}