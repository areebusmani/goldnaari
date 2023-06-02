import React, { useState, useEffect } from 'react';
import { Modal, List, Alert, Spin } from 'antd';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import './style.css';
import axios from 'axios';

const beforeDueDateText = `You are collecting the installment before the due date.`
const infoText = `Please confirm the details below.`;

const CreateCollection = ({ collection, launched, onCollectionCreated, onCancel, planId }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [collectionDetails, setCollectionDetails] = useState(null);

    const fetchCollectionDetails = async () => {
        try {
            const response = await axios.get(`/api/plans/${planId}/upcoming-collection`);
            setCollectionDetails(response.data);
        } catch (error) {
            // Ignore
        }
    }
    useEffect(() => {
        if (collection) {
            setCollectionDetails(collection);
        } else if (planId) {
            fetchCollectionDetails();
        } 
    }, [planId]);

    const createCollection = async () => {
        const {planId} = collectionDetails;
        setConfirmLoading(true);
        try {
            await axios.post('/api/collections', {planId});
            onCollectionCreated();
        } finally {
            setConfirmLoading(false);
        }
    };

    const collectionAttributes = collectionDetails ? [
        {
          label: 'Customer Name',
          value: collectionDetails.customerName
        },
        {
          label: 'Customer Phone Number',
          value: collectionDetails.customerPhoneNumber

        },
        {
          label: 'Due Amount',
          value: formatCurrency(collectionDetails.dueAmount)

        },
        {
          label: 'Due Date',
          value: formatDate(collectionDetails.dueDate)
        },
      ] : [];

    return (
        <Modal
            title="Collect Installment"
            wrapClassName="create-collection-modal"
            open={launched}
            onOk={createCollection}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okText="Collect Installment"
        >
            <div className="spacer"></div>
            {!!collectionDetails ?
                <>
                    <Alert message={
                        <>
                            {collectionDetails.isDueDateInFuture && <strong>{beforeDueDateText + ' '}</strong>}
                            <span>{infoText}</span>
                        </>
                    } type="info" />
                    <List
                        itemLayout="horizontal"
                        className="collection-details"
                        dataSource={collectionAttributes}
                        renderItem={(attribute) => (
                            <List.Item key="label">
                                <List.Item.Meta
                                    title={attribute.label}
                                    description={attribute.value}
                                />
                            </List.Item>
                        )}
                    />
                </>
                : <Spin />
            }
        </Modal>
    );
}

export default CreateCollection;
