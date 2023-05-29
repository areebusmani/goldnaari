import React, {useEffect, useState} from "react";
import {Table, Button} from 'antd';
import CustomerSnippet from '../common/customersnippet';
import CreatePlan from "../createplan";
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import axios from 'axios';
import './style.css';

const columns = [
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        fixed: 'left',
        render: (_, row) => <CustomerSnippet plan={row} />
    },
    {
     title: 'Installment amount',
     dataIndex: 'installmentAmount',
     key: 'amount',
     render: formatCurrency
    },
    {
     title: 'Start date',
     dataIndex: 'startedAt',
     key: 'startedAt',
     render: formatDate
    }
];

const AllPlans = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createPlanLaunched, setCreatePlanLaunched] = useState(false);

    const launchCreatePlan = () => {
        setCreatePlanLaunched(true);
    };

    const onPlanCreated = () => {
        setCreatePlanLaunched(false);
        fetchData();
    };

    const onCreatePlanCancel = () => {
        setCreatePlanLaunched(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/plans');
            setData(response.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, []);

    return (
        <>
            <Button className="all-plans-action" type="primary" onClick={launchCreatePlan}>
                Start a new plan
            </Button>
            <Table
                className="all-plans-table"
                loading={loading}
                columns={columns}
                dataSource={data}
            />
            <CreatePlan
                launched={createPlanLaunched}
                onPlanCreated={onPlanCreated}
                onCancel={onCreatePlanCancel}
            />
        </>
    );
}

export default AllPlans;
