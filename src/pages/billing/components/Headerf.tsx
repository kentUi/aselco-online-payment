import React from 'react';

import { Link } from 'react-router-dom';

function HeaderComponents() {

    return (
        <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
                <div className="nk-block-head-content">
                    <h3 className="nk-block-title page-title">BLAGGO API : Simplified Online Billing Portal</h3>
                    <p>Gain Insights, Take Control: Navigate Your Data Seamlessly with Our Dashboard.</p>
                </div>
                <div className="nk-block-head-content">
                    <div className="toggle-wrap nk-block-tools-toggle">
                        <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em
                            className="icon ni ni-menu-alt-r"></em></a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponents;
