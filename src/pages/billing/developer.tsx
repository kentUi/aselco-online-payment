import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'

import numeral from 'numeral';

import CryptoJS from 'crypto-js';

import Sidemenu from '../layout/sidemenu'
import Topmenu from '../layout/topmenu'
import PendingComponents from './components/Pending'
import IncommingComponents from './components/Incoming'
import BillingCopyComponents from './components/BillingCopy'
import HeaderComponents from './components/Headerf'

import '../../App.css';

interface BillingItem {
    AccountNumber: string;
    NetAmount: number;
    DueDate: string;
    ServicePeriod: string;
    isChecked: boolean;
}

function ListCopy() {

    const [initialBilling, getBilling] = useState([]);
    const [countChecked, getChecked] = useState(0);

    const [billing, setBilling] = useState<BillingItem[]>(initialBilling);

    const [secretKey, setSecretKey] = useState('');
    const [name, setSecretName] = useState('');
    const [keys, setKeys] = useState([]);

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

    const generateSHA256Key = () => {
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const sha256Key = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex);
        setSecretKey(sha256Key);
    };

    const handleSubmit = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/client_key_registration",
            data: {
                ID: '0',
                name: name,
                key: secretKey
            },
        }).then(function (response) {
            window.location.reload();
        });
    }

    function check_keys() {
        axios({
            method: "POST",
            url: "http://127.0.0.1/acelco-proxy-server-api/index.php/api/keys",
            data: {
                ID: '0',
            },
        }).then(function (response) {
            setKeys(response.data);
        });
    }

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

    useEffect(() => {
        check_keys()
        check_billing()
    }, []);


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
                                            <div className="row g-gs">
                                                <div className="col-12">
                                                    <div className="card h-100">
                                                        <div className="card-inner">
                                                            <h3 className="nk-block-title page-title">Developer Mode</h3>
                                                            <p>You can create client application or user for authentication or authorization.</p>
                                                            <hr />
                                                            <div className="row">

                                                                <div className="col-md-8 pt-1">
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
                                                                    <span style={{ float: 'right' }} className='mt-2'><b className='text-danger jutify-end'>NOTE : </b>Authentication & Authorization Client`s Keys.</span>
                                                                    <table className="datatable-initx table table-stripped table-bordered" style={{ cursor: 'pointer' }}>
                                                                        <thead>
                                                                            <tr className='pb-0'>
                                                                                <th style={{ position: 'relative' }}>Client`s Name</th>
                                                                                <th style={{ position: 'relative' }}>Client`s Keys</th>
                                                                                <th style={{ width: '50px' }}></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className=''>
                                                                            {keys.map((result, index: number) => (
                                                                                <tr key={index}>
                                                                                    <td className=''>{result['ss_name']}</td>
                                                                                    <td className=''>{result['ss_client_key']}</td>
                                                                                    <td><button className="btn btn-danger btn-xs btn-block" style={{ width: '100%' }}><em className="icon ni ni-trash"></em></button></td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="col-md-4" style={{ borderLeft: '1px solid #eee' }}>
                                                                    <h3 className='mb-2 text-uppercase'><b>Client Key</b></h3>
                                                                    <p>Client application or user for authentication or authorization.</p>
                                                                    <hr />
                                                                    <form onSubmit={handleSubmit} action='javascript:void(0)'>
                                                                        <div className="input-group">
                                                                            <input required type="text" className="form-control" value={name} onChange={(e) => setSecretName(e.target.value)} placeholder="Client`s Complete Name here.." />
                                                                        </div>
                                                                        <div className="form-control-wrap mt-3">
                                                                            <div className="input-group">
                                                                                <input
                                                                                    required
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Client's Secret key"
                                                                                    value={secretKey}
                                                                                    onChange={(e) => setSecretKey(e.target.value)}
                                                                                />
                                                                                <div className="input-group-append">
                                                                                    <button
                                                                                        type='button'
                                                                                        className="btn btn-outline-danger btn-dim text-uppercase"
                                                                                        onClick={generateSHA256Key}
                                                                                    >
                                                                                        Generate Key
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button className="btn btn-primary mt-4 btn-block text-uppercase">Register Key</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-12">
                                                    <div className="card h-100">
                                                        <div className="card-inner">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <h3 className="nk-block-title page-title">Offline Billing</h3>
                                                                    <p>Please select the billing data to cloud server by selecting the records.</p>
                                                                    <hr />
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
} export default ListCopy;
