import axios from 'axios';

const generateOtp = async (request, response) => {
    const phone = request.query.phone;
    const generateOtpUrl = `https://2factor.in/API/V1/${process.env['2FACTOR_API_KEY']}/SMS/${phone}/AUTOGEN2/otp `;
    try {
        await axios.get(generateOtpUrl);
        response.json({})
    } catch (error) {
        console.error(error);
        response.sendStatus(400);
    }
}

export default generateOtp;