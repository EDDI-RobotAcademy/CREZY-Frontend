import axios from "axios";
import env from "@/env";

const springAxiosInst = axios.create({
    baseURL: env.api.SPRING_API_URL,
    timeout: 10000,
})

const fastApiAxiosInst = axios.create({
    baseURL: env.api.FAST_API_URL,
    timeout: 2500
})

export default { springAxiosInst, fastApiAxiosInst }