import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function IncommingComponents() {

    const [incoming, getIncoming] = useState(0);

    function check() {
        axios({
            method: "POST",
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/figures",
            data: {
                ID: '0',
            },
        }).then(function (response) {
            getIncoming(response.data.incoming);
        });
    }

    useEffect(() => {
        check()
    }, []);

    return (
        <div className="card card-full bg-info">
            <div className="card-inner">
                <div className="row">
                    <div className="col-md-12">

                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="fs-6 text-dark text-opacity-75  mb-0"></div>
                        </div>
                        <h5 className="text-dark text-center" style={{ fontSize: '55px' }}>{incoming}</h5>
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
