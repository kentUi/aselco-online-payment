import React from 'react';

function TopMenu() {

  return (
    <div className="nk-header nk-header-fixed is-light" style={{borderTop: "10px solid #207B25"}}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em
              className="icon ni ni-menu"></em></a>
          </div>

          <div className="nk-header-brand d-xl-none">
            <a href="html/index.html" className="logo-link">
              <img className="logo-light logo-img" src="/logo.png" alt="logo" />
              <img className="logo-dark logo-img" src="/logo.png" alt="logo-dark" />
            </a>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="dropdown user-dropdown">
                <a href="#" className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm" style={{backgroundColor: "#207B25"}}>
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="user-info d-none d-xl-block">
                      <div className="user-status user-status-active" style={{color: "#207B25"}}
                      >ACCOUNT ID #: 2019F008</div>
                      <div className="user-name dropdown-indicator">
                      Zenny Dela Cruz Fraga
                      </div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar" style={{backgroundColor: "#207B25"}}>
                        <em className="icon ni ni-user-alt"></em>
                      </div>
                      <div className="user-info">
                        <span className="lead-text"></span>
                        <span className="sub-text"></span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li><a href="html/lms/admin-profile.html"><em
                        className="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
