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

function BillingComponents() {

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
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/billing",
            data: {
                ID: '0',
            },
        }).then(function (response) {
            setBilling(response.data);
        });
    }

    const handleSubmit = () => {
        if (countChecked == 0) {
            Swal.fire({
                title: "Sorry, Please Select Account",
                text: "Please select a record to proceed.",
                icon: "error"
            });
        } else {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    let timerInterval;

                    Swal.fire({
                        title: "Processing Online Billings...",
                        html: "Please wait..",
                        timer: 15000,
                        timerProgressBar: true,
                        imageUrl: "/logo.png",
                        didOpen: () => {
                            Swal.showLoading();
                            const checkedItems = billing.filter(item => item.isChecked);

                            axios({
                                method: "POST",
                                url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api",
                                data: {
                                    billing: checkedItems,
                                },
                            }).then(function (response) {
                                Swal.fire({
                                    title: "Submitted!",
                                    text: '',
                                    icon: "success",
                                    willClose: () => {
                                        clearInterval(timerInterval);
                                        getChecked(0)
                                        check_billing();
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    };


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
                                        <div className="col-md-6">
                                            <div className="form-control-wrap">
                                                <div className="form-icon form-icon-left">
                                                    <em className="icon ni ni-search"></em>
                                                </div>
                                                <input type="text" className="form-control" id="default-03" placeholder="Search here.." />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <button onClick={handleSubmit} className="btn-wider btn btn-outline-light  bg-dim mb-2 mt-0">
                                                (<b className='text-danger'> {countChecked} </b>)&ensp;
                                                <span>Send Bulk Billing</span>&ensp;
                                                <em className="icon ni ni-send"></em>
                                            </button>
                                        </div>
                                    </div>

                                </span>
                                <span style={{ float: 'right' }} className='mt-2'><b className='text-danger jutify-end'>NOTE : </b>Maximun of 1,000 per transaction.</span>
                                <table className="datatable-initx table table-stripped table-bordered table-hover" style={{ cursor: 'pointer' }}>
                                    <thead>
                                        <tr className='pb-0' onClick={() => handleCheckAll}>
                                            <th style={{ width: '50px' }}>
                                                <input type="checkbox" checked={isCheckedAll} className='custom-checkbox mt-1' style={{ transform: 'scale(1.0)', border: '1px solid gray' }} onChange={handleCheckAll} />
                                            </th>
                                            <th style={{ position: 'relative', top: '-6px' }}>Account Number</th>
                                            <th style={{ position: 'relative', top: '-6px', width: '180px' }}>Net Amount (<b>PHP</b>)</th>
                                            <th style={{ position: 'relative', top: '-6px', width: '150px' }}>Due Date</th>
                                            <th style={{ position: 'relative', top: '-6px', width: '150px' }}>Service Period</th>
                                            <th style={{ position: 'relative', top: '-6px', width: '50px' }} className='text-center'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billing.map((result, index: number) => (
                                            <tr key={index} onClick={() => handleRowClick(index)}>
                                                <td className='pt-3 pb-0'>
                                                    <input type='checkbox'
                                                        className='custom-checkbox'
                                                        value={result['AccountNumber']}
                                                        checked={result.isChecked}
                                                        onChange={() => handleCheckboxChange(index)}
                                                        style={{ transform: 'scale(1.5)', border: '1px dashed lightgray' }}
                                                    />
                                                </td>
                                                <td className='pt-3'># {result['AccountNumber']}</td>
                                                <td className='pt-3' style={{ letterSpacing: '1px' }}>PHP <b className='text-danger'>{numeral(result['NetAmount']).format('0,0.00')}</b></td>
                                                <td className='pt-3'>{result['DueDate']}</td>
                                                <td className='pt-3'>{result['ServicePeriod']}</td>
                                                <td className='pt-2'><span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">Pending</span></td>
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

export default BillingComponents;
