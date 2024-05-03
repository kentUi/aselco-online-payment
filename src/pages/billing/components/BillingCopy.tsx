import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'

import numeral from 'numeral';

interface BillingItem {
    AccountNumber: string;
    NetAmount: number;
    DueDate: string;
    ServicePeriod: string;
    isChecked: boolean;
}

function BillingCopyComponents() {

    const [initialBilling, getBilling] = useState([]);
    const [countChecked, getChecked] = useState(0);

    const [billing, setBilling] = useState<BillingItem[]>(initialBilling);
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setBilling(billing.map(item => ({ ...item, isChecked: checked })));
        setIsCheckedAll(checked);
        getChecked(billing.length);
    };

    const handleCheckboxChange = (index: number) => {
        const updatedBilling = [...billing];
        updatedBilling[index].isChecked = !updatedBilling[index].isChecked;
        setBilling(updatedBilling);
        setIsCheckedAll(updatedBilling.every(item => item.isChecked));
        const checkedCount = updatedBilling.filter(item => item.isChecked).length;
        getChecked(checkedCount);
    };

    const handleRowClick = (index) => {
        const updatedBilling = [...billing];
        updatedBilling[index].isChecked = !updatedBilling[index].isChecked;
        setBilling(updatedBilling);
        setIsCheckedAll(updatedBilling.every(item => item.isChecked));
        const checkedCount = updatedBilling.filter(item => item.isChecked).length;
        getChecked(checkedCount);
    };

    function check_billing() {
        axios({
            method: "POST",
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/copy",
            data: {
                ID: '0',
            },
        }).then(function (response) {
            setBilling(response.data);
        });
    }


    useEffect(() => {
        check_billing()
    }, []);

    return (
        <div className="row g-gs">
            <div className="col-12">
                <div className="card h-100">
                    <div className="card-inner">
                        <h3 className="nk-block-title page-title">Billing Information</h3>
                        <p>Access comprehensive billing information at your fingertips, ensuring accuracy and transparency in financial transactions and records</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <span style={{ float: 'left' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-control-wrap">
                                                <div className="form-icon form-icon-left">
                                                    <em className="icon ni ni-search"></em>
                                                </div>
                                                <input type="text" className="form-control" id="default-03" placeholder="Search here.." />
                                            </div>
                                            <br />
                                        </div>
                                    </div>

                                </span>
                                <span style={{ float: 'right' }} className='mt-2'><b className='text-danger jutify-end'>NOTE : </b>Maximun of 1,000 per transaction.</span>
                                <table className="datatable-initx table table-stripped table-bordered table-hover" style={{ cursor: 'pointer' }}>
                                    <thead>
                                        <tr className='pb-0' onClick={() => handleCheckAll}>
                                            <th style={{ position: 'relative' }}>Account Number</th>
                                            <th style={{ position: 'relative', width: '180px' }}>Net Amount (<b>PHP</b>)</th>
                                            <th style={{ position: 'relative', width: '150px' }}>Due Date</th>
                                            <th style={{ position: 'relative', width: '150px' }}>Service Period</th>
                                            <th style={{ position: 'relative', width: '200px' }}>Date Sent</th>
                                            <th style={{ position: 'relative', width: '50px' }} className='text-center'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billing.map((result, index: number) => (
                                            <tr key={index} onClick={() => handleRowClick(index)}>
                                                <td className='pt-3'># {result['bill_account_number']}</td>
                                                <td className='pt-3' style={{ letterSpacing: '1px' }}>PHP <b className='text-danger'>{numeral(result['bill_amount']).format('0,0.00')}</b></td>
                                                <td className='pt-3'>{result['bill_due_date']}</td>
                                                <td className='pt-3'>{result['bill_period']}</td>
                                                <td className='pt-3'>{result['bill_registered']}</td>
                                                <td className='pt-2'><span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">Copy Sent</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingCopyComponents;
