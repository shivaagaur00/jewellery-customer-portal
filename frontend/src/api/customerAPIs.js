import axios from "axios"
const URL="http://localhost:8000";
export const signUp=async (data)=>{
    try {
        let res=axios.post(`${URL}/signup`,data);
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const login=async (data)=>{
    try {
        console.log(data);
        let res=axios.post(`${URL}/login`,data);
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const getCustomer = async (token) => {
  try {
    const res = await axios.get(`${URL}/customer`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch customer data", error);
    throw error;
  }
};