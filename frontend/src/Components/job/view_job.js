import React, { useState, useEffect } from "react";
import axios from "axios";
import { JOBDETAILS, APPLYJOB } from "../../api";
import "../../css/view_job.css"

const ViewJob = () => {
    const [jid, setJid] = useState("")
    const [can_id, setCan_id] = useState("")

    const [api_error, setApi_error] = useState(true);
    const [isLoading_job, setLoading_job] = useState(true);
    const [id, setId] = useState("")
    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [level, setLevel] = useState("")
    const [industries, setIndustries] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")

    const apply_job = async () =>
    {
        const payload = {'job_id':jid,'candidate_id':can_id}
        let selected = await axios.post(APPLYJOB,payload)
        alert("Applied for the job!")
        window.location = "/candidate_dashboard"
    }
  
    useEffect(() => {


        const queryParams = new URLSearchParams(window.location.search)
        const job_id = queryParams.get('job_id')
        const candidate_id = localStorage.getItem("userID") ? localStorage.getItem("userID") : null;

        setJid(job_id)
        setCan_id(candidate_id)

        const get_details = async () =>
        {
            const queryParams = new URLSearchParams(window.location.search)
            const job_id = queryParams.get('job_id')

            let job_details_response = await axios.post(JOBDETAILS,{'job_id':job_id})
            console.log(job_details_response)
            if(job_details_response.data.length != 0)
            {
                let job_details = job_details_response.data[0]
                console.log(job_details)

                setId(job_details._id || "")
                setDate(job_details.dateposted || "")
                setName(job_details.name || "")
                setType(job_details.jobType || "")
                setLevel(job_details.senorityLevel || "")
                setIndustries(job_details.industries || "")
                setCompany(job_details.company || "")
                setLocation(job_details.jobLocation || "")
                setDescription(job_details.jobDescription || "")
                
                setApi_error(false)
            }
            setLoading_job(false)
            
        }
        get_details()
        

    }, [])
  
    if (isLoading_job)
    {
        return <div className="main">Loading...</div>;
    }

  if (api_error)
  {
    return <div className="main">Could not fetch details. Try again later.</div>;
  }

    return (
        <>
        <div className="p-4">  
            <div className="row">
                <div className="title col-4">
                    Job Details
                </div>

                <div className="a title col-8 d-flex justify-content-end">
                    <div className="mx-3 bu">
                        <button type="button" className="btn-lg btn-success rounded-pill" onClick={apply_job}>Apply</button>
                    </div>
                
                </div>  
            </div>
            <div className="row">
                <div className="heading col-4">
                    Job ID: {id}
                </div>
                <div className="heading col-4">
                    Job Title: {name}
                </div>
                <div className="heading col-4">
                    Date Posted: {date}
                </div>
            </div>       
  
            <div className="row">
              <div className="heading col-4">
                  Level: {level}
              </div>
  
              <div className="heading col-4">
                  Type: {type}
              </div>
              <div className="heading col-4">
                  Company: {company}
              </div>
              
            </div>     
          
  
          <div className="heading mt-4">
              Industries: {industries}
          </div>

          <div className="heading mt-4">
              Location: {location}
          </div>
  
          <div className="heading mt-5">
              Description:
          </div>
  
          <div className="heading mt-n2 description_text">
              {description}
          </div>
        </div>
      </>
    );
  }
  
  export default ViewJob;