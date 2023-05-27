import React, { useState } from 'react';
import { Button } from 'antd';

const CreatePlan = ({isLaunched, onPlanCreated, onCancel}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
    };
    const handleCancel = () => {
    };
    return (
        <Modal
          title="Create Plan"
          open={isLaunched}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
        </Modal>
    );
}

export default CreatePlan;
