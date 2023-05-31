import React, { useState } from 'react';
import { Button, Card, Input, Alert } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { setAuthToken, setAuthHeaders } from '../../utils/auth';

import './style.css';

const Login = ({onLogin}) => {
    const [otpSent, setOtpSent] = useState(false);
    const [phone, setPhone] = useState('')
    const handleOtpSent = (_phone) => {
        setPhone(_phone);
        setOtpSent(true);
    }

    return (
        <div className="login-container">
            <Card className="login-card">
                <h3>Sign in</h3>
                <p>to continue to the Dashboard</p>
                {otpSent ? <EnterOtp phone={phone} onLogin={onLogin} />
                    : <SendOtp onOtpSent={handleOtpSent} />}
            </Card>
        </div>
    )
};

const SendOtp = ({onOtpSent}) => {
    const {
        control,
        handleSubmit
    } = useForm();
    const [loading, setLoading] = useState(false);

    const sendOtp = async ({phone}) => {
        setLoading(true);
        try {
            await axios.get(`/api/generate-otp?phone=${phone}`);
            onOtpSent(phone);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(sendOtp)}>
            <div className="field">
                <label className="label">Phone Number</label>
                <Controller
                    render={FieldInput}
                    name="phone"
                    rules={{
                        required: 'Phone number is required',
                        validate: validateCustomerPhone
                    }}
                    control={control}
                />
            </div>
            <Button type="primary" loading={loading} onClick={handleSubmit(sendOtp)}>
                Generate OTP
            </Button>
        </form>
    );
}

const EnterOtp = ({onLogin, phone}) => {
    const {
        control,
        handleSubmit
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(false);

    const login = async ({otp}) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/validate-otp?phone=${phone}&otp=${otp}`);
            const {success, authToken} = response.data;
            if (!success || !authToken) {
                setFailure(true);
            } else {
                setAuthToken(authToken);
                setAuthHeaders(authToken);
                onLogin();
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(login)}>
            {failure && <Alert message="Invalid OTP" type="error" showIcon closable />}
            <div className="field">
                <label className="label">OTP</label>
                <Controller
                    render={FieldInput}
                    name="otp"
                    rules={{
                        required: 'OTP is required',
                        validate: validateOTP
                    }}
                    control={control}
                />
            </div>
            <Button type="primary" loading={loading} onClick={handleSubmit(login)}>
                Login
            </Button>
        </form>
    );
}

const FieldInput = ({ field, fieldState, formState }) => {
    return <>
        <Input
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
            className="field-input"
        />
        {(formState.isSubmitted || fieldState.isTouched)
            && fieldState.error && <span className="error-message">{fieldState.error.message}</span>}
    </>
};

const validateCustomerPhone = (value) => {
    if (!/^\d{10}$/.test(value)) {
        return 'Customer phone number should be a 10-digit number';
    }
    return true;
}

const validateOTP = (value) => {
    if (!/^\d{6}$/.test(value)) {
        return 'OTP should be a 6-digit number';
    }
    return true;
}

export default Login;
