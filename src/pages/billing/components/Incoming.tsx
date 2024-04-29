import React from 'react';

import { Link } from 'react-router-dom';

function IncommingComponents() {

    return (
        <div className="card card-full bg-info">
            <div className="card-inner">
                <div className="row">
                    <div className="col-md-12">

                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="fs-6 text-dark text-opacity-75  mb-0"></div>
                        </div>
                        <h5 className="text-dark text-center" style={{ fontSize: '55px' }}>0</h5>
                        <div className="fs-7 text-dark text-opacity-75 mt-1 text-center">
                            Incoming Payment(s)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncommingComponents;
