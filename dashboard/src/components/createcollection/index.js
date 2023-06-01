import React, { useState } from 'react';
import { Modal, List, Alert } from 'antd';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import './style.css';
import axios from 'axios';

const infoText = `Please confirm the details`;

const CreateCollection = ({ collection, launched, onCollectionCreated, onCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(collection);

    const createCollection = async () => {
        const {planId} = selectedCollection.current;
        setConfirmLoading(true);
        try {
            await axios.post('/api/collections', {planId});
            onCollectionCreated();
        } finally {
            setConfirmLoading(false);
        }
    };

    const collectionAttributes = selectedCollection.current ? [
        {
          label: 'Customer Name',
          value: selectedCollection.current.customerName
        },
        {
          label: 'Customer Phone Number',
          value: selectedCollection.current.customerPhoneNumber

        },
        {
          label: 'Due Amount',
          value: formatCurrency(selectedCollection.current.dueAmount)

        },
        {
          label: 'Due Date',
          value: formatDate(selectedCollection.current.dueDate)
        },
      ] : [];

    return (
        <Modal
            title={collection ? 'Register collection' : 'Register a collection'}
            wrapClassName="create-collection-modal"
            open={launched}
            onOk={createCollection}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okText="Register collection"
        >
            <div className="spacer"></div>
            {!!selectedCollection.current &&
                <>
                    <Alert message={infoText} type="info" />
                    <List
                        itemLayout="horizontal"
                        className="collection-details"
                        dataSource={collectionAttributes}
                        renderItem={(attribute) => (
                        <List.Item>
                            <List.Item.Meta
                            title={attribute.label}
                            description={attribute.value}
                            />
                        </List.Item>
                        )}
                    />
                </>
            }
        </Modal>
    );
}

export default CreateCollection;
