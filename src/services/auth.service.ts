import axios from "axios";
import { Auth } from "../types/auth";

const loginUser = async (email: string, password: string): Promise<Auth> => {
  try {
    const  data  = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
    return data.data as Auth;
  } catch (error) {
    throw error;
  }
}

export default loginUser;