import React, {useEffect, useState} from "react";
import {Table} from 'antd';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';
import axios from 'axios';
import './style.css';

const columns = [
    {
        title: 'Name',
        dataIndex: 'customerName',
        key: 'name',
        fixed: 'left'
    },
    {
     title: 'Phone',
     dataIndex: 'customerPhoneNumber',
     key: 'phone',
     render: (number) => <a href={`tel:${number}`}>{number}</a>
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
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/plans');
                setData(response.data.data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return <Table
                className="all-plans-table"
                loading={loading}
                columns={columns}
                dataSource={data}
            />;
}

export default AllPlans;
