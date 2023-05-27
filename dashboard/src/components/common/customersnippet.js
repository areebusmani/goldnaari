import React from 'react';
import './style.css';

const CustomerSnippet = ({plan}) => (
    <>
        <div className="customer-name">{plan.customerName}</div>
        <div className="customer-phone">
            <a href={`tel:${plan.customerPhoneNumber}`}>{plan.customerPhoneNumber}</a>
        </div>
    </>
);

export default CustomerSnippet;
