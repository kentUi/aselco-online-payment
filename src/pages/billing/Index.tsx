import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidemenu from '../layout/sidemenu'
import Topmenu from '../layout/topmenu'
import PendingComponents from './components/Pending'
import IncommingComponents from './components/Incoming'
import BillingComponents from './components/Billing'
import HeaderComponents from './components/Headerf'

import '../../App.css';


function ListBilling() {


  return (
    <div className="nk-body bg-lighter npc-general has-sidebar ">
      <div className="nk-app-root">
        <div className="nk-main ">

          <Sidemenu />
          <div className="nk-wrap ">
            <Topmenu />
            <div className="nk-content ">
              <div className="container-fluid">

                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <HeaderComponents />

                    <div className="nk-block">
                      <div className="row g-gs">
                        <div className="col-sm-8 col-xxl-8">
                          <PendingComponents />
                        </div>

                        <div className="col-sm-4 col-xxl-4">
                          <IncommingComponents />
                        </div>
                      </div>
                    </div>


                    <div className="nk-block">
                      <BillingComponents />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListBilling;
