import React from 'react';

import { Link } from 'react-router-dom';

function PendingComponents() {

    return (
        <div className="card card-full bg-success">
            <div className="card-inner">
                <div className="row">
                    <div className="col-md-2">
                        <center><img src="/billf.png" alt="" style={{ height: '100px' }} /></center>
                    </div>
                    <div className="col-md-10">

                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="fs-6 text-success text-opacity-75 mb-0">*</div>
                        </div>
                        <h5 className="fs-1 text-dark">0 / 5 <small className="fs-3 text-uppercase">Costumer Billing</small></h5>
                        <div className="fs-7 text-dark text-opacity-75 mt-1">
                            Monitor and manage customer billing efficiently with our intuitive dashboard.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PendingComponents;
