import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Input, Alert } from 'antd';
import './style.css';
import axios from 'axios';

const infoText = `By creating a new plan you acknowledge that you have
    accepted the first installment amount from the customer
    and issued a receipt`;

const CreatePlan = ({ launched, onPlanCreated, onCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {
        control,
        handleSubmit,
        reset
    } = useForm();

    const createPlan = async (data) => {
        setConfirmLoading(true);
        try {
            await axios.post('/api/plans', data);
            onPlanCreated();
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <Modal
            title="Start a new Plan"
            wrapClassName="create-plan-modal"
            open={launched}
            onOk={handleSubmit(createPlan)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Create Plan"
            afterClose={reset}
        >
            <Alert message={infoText} type="info" />
            <form onSubmit={handleSubmit(createPlan)}>
                <div className="field">
                    <label className="label">Customer Name *</label>
                    <Controller
                        render={FieldInput}
                        name="customerName"
                        rules={{
                            required: 'Customer name is required',
                            validate: validateCustomerName
                        }}
                        control={control}
                    />
                </div>
                <div className="field">
                    <label className="label">Customer Phone Number *</label>
                    <Controller
                        render={FieldInput}
                        name="customerPhoneNumber"
                        rules={{
                            required: 'Customer phone number is required',
                            validate: validateCustomerPhone
                        }}
                        control={control}
                    />
                </div>
                <div className="field">
                    <label className="label">Installment Amount *</label>
                    <Controller
                        render={FieldInput}
                        name="installmentAmount"
                        rules={{
                            required: 'Installment amount is required',
                            validate: validateInstallmentAmount
                        }}
                        control={control}
                    />
                </div>
            </form>
        </Modal>
    );
}

const FieldInput = ({ field, fieldState, formState }) => {
    return <>
        <Input
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
        />
        {(formState.isSubmitted || fieldState.isTouched)
            && fieldState.error && <span className="error-message">{fieldState.error.message}</span>}
    </>
};

const validateCustomerName = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return 'Customer name should only contain letters and spaces';
    }
    return true;
}

const validateCustomerPhone = (value) => {
    if (!/^\d{10}$/.test(value)) {
        return 'Customer phone number should be a 10-digit number';
    }
    return true;
}

const validateInstallmentAmount = (value) => {
    if (isNaN(value)) {
        return 'Installment amount should be a number';
    }
    return true;
}


export default CreatePlan;
