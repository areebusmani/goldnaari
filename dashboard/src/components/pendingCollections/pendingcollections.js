import React, {useEffect, useState, useRef} from "react";
import {Table, Button} from 'antd';
import CustomerSnippet from '../common/customersnippet';
import CreateCollection from "../createcollection";
import { formatCurrency } from '../../utils/currency';
import axios from 'axios';
import './style.css';

const PendingCollections = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createCollectionLaunched, setCreateCollectionLaunched] = useState(false);

    let selectedCollection = useRef(null);

    const launchCreateCollection = (pendingCollection) => {
        selectedCollection.current = pendingCollection;
        setCreateCollectionLaunched(true);
    }

    const onCancelCreateCollection = () => {
        selectedCollection.current = null;
        setCreateCollectionLaunched(false);
    }

    const onCollectionCreated = () => {
        fetchData();
        setCreateCollectionLaunched(false);
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/pendingCollections');
            setData(response.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const renderActions = (_, pendingCollection) => {
        return (
            <Button
                type="primary"
                onClick={() => launchCreateCollection(pendingCollection)}
            >
                Collect
            </Button>
        );
    }

    const columns = [
        {
            title: 'Customer',
            dataIndex: 'id',
            key: 'customer',
            fixed: 'left',
            render: (_, row) => <CustomerSnippet plan={row} />
        },
        {
         title: 'Due Amount',
         dataIndex: 'dueAmount',
         key: 'dueAmount',
         render: formatCurrency
        },
        {
            title: '',
            dataIndex: 'PlanId',
            key: 'actions',
            render: renderActions
        }
    ];

    return (
        <>
            <Table
                className="pending-collections-table"
                loading={loading}
                columns={columns}
                dataSource={data}
            />
            <CreateCollection
                launched={createCollectionLaunched}
                collection={selectedCollection.current}
                onCancel={onCancelCreateCollection}
                onCollectionCreated={onCollectionCreated}
            />
        </>
    );
}

export default PendingCollections;
