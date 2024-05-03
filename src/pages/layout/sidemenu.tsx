import React from 'react';

import { Link } from 'react-router-dom';

function Sidemenu() {

  return (
    <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <Link to="html/index.html" className="logo-link nk-sidebar-logo">
            <img className="logo-dark" src="/logo.png" alt="logo" style={{height: '43px'}}/>
            <img className="logo-small logo-img logo-img-small" src="/logo.png" alt="logo-small" />
          </Link>
        </div>
        <div className="nk-menu-trigger me-n2">
          <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em
            className="icon ni ni-arrow-left"></em></a>
          <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
            data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
        </div>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              <li className="nk-menu-heading pt-0">
                <h6 className="overline-title text-primary-alt">menu</h6>
              </li>
              <li className="nk-menu-item">
                <a href="/dashboard" className="nk-menu-link">
                  <span className="nk-menu-icon"><em className="icon ni ni-dashboard"></em></span>
                  <span className="nk-menu-text">Costumer Billing</span>
                </a>
              </li>
              <li className="nk-menu-item">
                <a href="/copy" className="nk-menu-link">
                  <span className="nk-menu-icon"><em className="icon ni ni-history"></em></span>
                  <span className="nk-menu-text">Costumer Billing Logs</span>
                </a>
              </li>
              <li className="nk-menu-item">
                <a href="/incoming" className="nk-menu-link">
                  <span className="nk-menu-icon"><em className="icon ni ni-money"></em></span>
                  <span className="nk-menu-text">Incomming Payments</span>
                </a>
              </li>
              <li className="nk-menu-item">
                <a href="/developer" className="nk-menu-link">
                  <span className="nk-menu-icon"><em className="icon ni ni-code"></em></span>
                  <span className="nk-menu-text">Developer Mode</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
