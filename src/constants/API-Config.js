import BaseApi from './BaseApi';

const BASEURL=BaseApi.URL;

const API = 
{
    USER_LOGIN:BASEURL+ "/auth/login",
    GET_POSTED_JOBS: BASEURL+"/recruiters/jobs"
}

export default API;