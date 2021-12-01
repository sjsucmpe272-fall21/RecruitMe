const BASE_URL = "http://3.16.108.26:8001";

// CANDIDATE
export const GETALLJOBS = `${BASE_URL}/jobs`;
export const GETCANDIDATEPROFILE = `${BASE_URL}/api/candidate/prof`;
export const JOBDETAILS = `${BASE_URL}/job_details`;
export const APPLYJOB = `${BASE_URL}/api/job_apply`

//RECRUITER
export const GETJOBS = `${BASE_URL}/api/emp_jobs`
export const GETCOMPANY = `${BASE_URL}/api/emp_company`
export const APP_CAN = `${BASE_URL}/api/applied_candidates`
export const SEL_CAN = `${BASE_URL}/api/selected_candidates`
export const GETCOMPFROMID = `${BASE_URL}/api/emp_company_fromid`



// Jobs
export const REJECT_CAN = `${BASE_URL}/api/reject_candidate`
export const SELECT_CAN = `${BASE_URL}/api/select_candidate`