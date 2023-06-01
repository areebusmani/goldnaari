import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Statistic, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import axios from 'axios';
import CreatePlan from '../createplan';
import './style.css';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState();
    const [createPlanLaunched, setCreatePlanLaunched] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/store');
            setStoreData(response.data);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchData();
    }, []);

    const colProps = {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
        lg: { span: 8 }
    };

    if (loading || !storeData) {
        return <Spin className="loader" />;
    }
    return (
        <>
            <h1>Welcome {storeData.ownerName}!</h1>
            <Row gutter={16}>
                <Col {...colProps}>
                    <Card bordered className="statistic-card">
                        <Link to="/plans" className="stat-link">
                            <Statistic title="Total Plans" value={storeData.totalPlans} />
                        </Link>
                        <Button className="card-action first" type="primary" onClick={launchCreatePlan}>
                            Start a new plan
                        </Button>
                    </Card>
                </Col>
                <Col {...colProps}>
                    <Card bordered className="statistic-card">
                        <Link to="/collections" className="stat-link">
                            <Statistic title="Total Collections"
                                value={formatCurrency(storeData.totalCollections)} precision={2} />
                        </Link>

                        <Button className="card-action secondary" disabled>
                            View pending collections (0)
                        </Button>
                    </Card>
                </Col>
                <CreatePlan
                    launched={createPlanLaunched}
                    onPlanCreated={onPlanCreated}
                    onCancel={onCreatePlanCancel}
                />
            </Row>
        </>);
}

export default Home;
