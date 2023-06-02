import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from 'antd';
import CustomerSnippet from '../common/customersnippet';
import CreatePlan from "../createplan";
import CreateCollection from "../createcollection";
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const AllPlans = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createPlanLaunched, setCreatePlanLaunched] = useState(false);
    const [createCollectionLaunched, setCreateCollectionLaunched] = useState(false);

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

    const selectedPlanId = useRef('');

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

    const launchCreateCollection = (planId) => {
        selectedPlanId.current = planId;
        setCreateCollectionLaunched(true);
    }

    const onCancelCreateCollection = () => {
        selectedPlanId.current = 0;
        setCreateCollectionLaunched(false);
    }

    const onCollectionCreated = () => {
        fetchData();
        setCreateCollectionLaunched(false);
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modeQueryParam = queryParams.get('mode');

    const renderActions = (planId) => {
        return (
            <Button
                type="primary"
                onClick={() => launchCreateCollection(planId)}
            >
                Collect
            </Button>
        );
    }

    const columns = [
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            fixed: 'left',
            render: (_, row) => <CustomerSnippet plan={row} />
        },
        {
            title: 'Installment Amount',
            dataIndex: 'installmentAmount',
            key: 'amount',
            render: formatCurrency
        }
    ];

    if (modeQueryParam === 'collect') {
        columns.push({
            title: '',
            dataIndex: 'id',
            key: 'actions',
            render: renderActions
        });
    } else {
        columns.push({
            title: 'Start date',
            dataIndex: 'startedAt',
            key: 'startedAt',
            render: formatDate
        });
    }

    return (
        <>
            {modeQueryParam !== 'collect' &&
                <Button
                    className="all-plans-action"
                    type="primary"
                    onClick={launchCreatePlan}
                >
                    Start a new plan
                </Button>
            }
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
            <CreateCollection
                launched={createCollectionLaunched}
                planId={selectedPlanId.current}
                onCancel={onCancelCreateCollection}
                onCollectionCreated={onCollectionCreated}
            />
        </>
    );
}

export default AllPlans;
