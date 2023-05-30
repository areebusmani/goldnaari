import axios from 'axios';
import Store from '../models/store.js';
import jwt from 'jsonwebtoken';

const validateOtp = async (request, response) => {
    const {phone, otp} = request.query;
    const validateOtpUrl = `https://2factor.in/API/V1/${process.env['2FACTOR_API_KEY']}/SMS/VERIFY3/${phone}/${otp}`;
    try {
        const validateOtpResponse = await axios.get(validateOtpUrl);
        if (validateOtpResponse.data.Status === 'Success') {
            const store = await Store.findOne({where: {phoneNumber: phone}});
            const authDetails = {storeId: store.id};
            const jwtOptions = {};
            const authToken = jwt.sign(authDetails, process.env.JWT_SECRET_KEY, jwtOptions);
            response.json({success: true, authToken});
        } else {
            response.json({success: false});
        }
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default validateOtp;
