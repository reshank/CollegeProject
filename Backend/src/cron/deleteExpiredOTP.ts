import Otp from "../models/otpModel";

const deleteExpiredOTP = async () => {
  await Otp.deleteMany({
    expiresAt: { $lte: Date.now() },
  });
};

export default deleteExpiredOTP;
