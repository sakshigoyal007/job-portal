import BaseApi from './BaseApi';

// const ENV = "build";
const BASEURL=BaseApi.URL;

const API = 
{
    USER_LOGIN:BASEURL+ "/auth/login",
    GET_POSTED_JOBS: BASEURL+"/recruiters/jobs",
    GET_JOB_CANDIDATES: BASEURL+"/",
}

export default API;