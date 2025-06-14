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
