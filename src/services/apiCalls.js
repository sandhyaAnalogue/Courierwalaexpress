import axios from "axios"
import HybridStorage from "../utils/helpers/HybridStorage"
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL


export const loginApi = async(phNum) => {
  console.log("in api call", BASE_URL);
  const res=await axios.post(`${BASE_URL}/user/v1/login`, phNum, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const otpVerification = async(userOtp)=>{
  const token = await HybridStorage.getItem("token");
  const otpRes = await axios.post(`${BASE_URL}/user/v1/verify-otp`,userOtp,{
     headers: {
      Authorization:`Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return otpRes;
}

export const resendOtpVerification = async()=>{
  const token = await HybridStorage.getItem("token");
  const resendOtpRes = await axios.post(`${BASE_URL}/user/v1/resend-otp`,{},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   return resendOtpRes;
}

export const createProfileVerification = async(data)=>{
  const token = await HybridStorage.getItem("token");
  const createProfileRes = await axios.post(`${BASE_URL}/user/v1/create-profile`,data,{
    headers: {
      Authorization:`Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return createProfileRes;
}
