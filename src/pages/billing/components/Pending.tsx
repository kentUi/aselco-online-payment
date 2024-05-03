import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PendingComponents() {

    const [pending, getPending] = useState(0);
    const [overall, getOverAll] = useState(0);

    function check() {
        axios({
            method: "POST",
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/figures",
            data: {
                ID: '0',
            },
        }).then(function (response) {
            console.log(response)
            getPending(response.data.pending);
            getOverAll(response.data.overall);
        });
    }

    useEffect(() => {
        check()
    }, []);

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
                        <h5 className="fs-1 text-dark">{pending} / {overall} <small className="fs-3 text-uppercase">Costumer Electronic Billing</small></h5>
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
