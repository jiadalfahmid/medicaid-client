import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.warn("VITE_API_URL is undefined; falling back to http://localhost:5000");
}

const axiosPublic = axios.create({
    baseURL: apiUrl || "http://localhost:5000"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;