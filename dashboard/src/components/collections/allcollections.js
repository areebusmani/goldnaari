import React, {useEffect, useState} from "react";
import {Table} from 'antd';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';
import axios from 'axios';
import './style.css';

const columns = [
    {
        title: 'Name',
        dataIndex: 'id',
        key: 'name',
        fixed: 'left',
        render: (_, row) => row.Plan.customerName
    },
    {
     title: 'Phone',
     dataIndex: 'id',
     key: 'phone',
     render: (_, row) => (
            <a href={`tel:${row.Plan.customerPhoneNumber}`}>
                {row.Plan.customerPhoneNumber}
            </a>
        )
    },
    {
     title: 'Amount',
     dataIndex: 'amount',
     key: 'amount',
     render: formatCurrency
    },
    {
     title: 'Date',
     dataIndex: 'createdAt',
     key: 'createdAt',
     render: formatDate
    }
];

const AllCollections = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/collections');
                setData(response.data.data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return <Table
                className="all-collections-table"
                loading={loading}
                columns={columns}
                dataSource={data}
            />;
}

export default AllCollections;
