import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { jobs_list_columns, jobs_list_data } from "./candidate_data";
import CandidateHeader from "./candidate_header"
import { GETALLJOBS, GETCANDIDATEPROFILE, JOBDETAILS } from "../../api";
import "../../css/candidate_dashboard.css"
import Header from '../Header';

const Dashboard = () => {
  const userID  = localStorage.getItem("userID") ? localStorage.getItem("userID") : null;
  console.log("userID: ",userID)

  const [isLoading_jobs_list, setLoading_jobs_list] = useState(true);
  const [isLoading_applied_jobs, setLoading_Applied_jobs] = useState(true);
  const [isLoading_offers, setLoading_Offers] = useState(true);
  const [table_jobs_list, setTable_jobs_list] = useState({
    columns: jobs_list_columns,
    data: {},
  });
  const [table_jobs_applied, setTable_jobs_applied] = useState({
    columns: jobs_list_columns,
    data: {},
  });
  const [table_offers, setTable_offers] = useState({
    columns: jobs_list_columns,
    data: {},
  });

  const view_job = (job_id) =>
  {
    window.location = "/view_job?job_id=" + job_id;
  }


  useEffect(() => {
    // List Jobs
    axios.get(GETALLJOBS).then((response) => {
      setTable_jobs_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_jobs_list(false);
    });

    const payload = {'candidate_id':userID}



    const get_jobs = async () =>
    {
      let job_ids;

      const [candidate] = await Promise.all([axios.post(GETCANDIDATEPROFILE,payload)])

        // Get offers data
        let jobs_selected = candidate.data[0].jobsSelected

        let offers = []
        for (let i=0; i<jobs_selected.length; i++)
        {
          let selected_jobs_response = await axios.post(JOBDETAILS,{'job_id':jobs_selected[i]})
          offers.push(selected_jobs_response.data[0])
        }
        setTable_offers((prevState) => ({
          ...prevState,
  
          data: offers,
        }));
        
        setLoading_Offers(false);
        

      job_ids = candidate.data[0].jobsAppliedTo
      let promises = []
      let job_details = []
      for (let i in job_ids)
      {
        promises.push(axios.post(JOBDETAILS,{'job_id':job_ids[i]}).then((response) =>
          {
            job_details.push(response.data);
          })
        )
      }
      
      Promise.all(promises).then(() => 
      {
        let job_det = []
        for (let i=0; i<job_details.length; i++)
        {
          job_det.push(job_details[i][0])
        }

        setTable_jobs_applied((prevState) => ({
          ...prevState,
  
          data: job_det,
        }));
        
        setLoading_Applied_jobs(false);
      })
    }

    get_jobs()

  }, [])

  

  if (isLoading_jobs_list || isLoading_applied_jobs || isLoading_offers ) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
    <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="jobs" title="Jobs">
                  <DataTableExtensions {...table_jobs_list}>
                    <DataTable
                      columns1={table_jobs_list.columns}
                      data1={table_jobs_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      onRowClicked={(row) => view_job(row._id)}
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="app_jobs" title="Applied Jobs">
                  <DataTableExtensions {...table_jobs_applied}>
                    <DataTable
                      columns1={table_jobs_applied.columns}
                      data1={table_jobs_applied.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      onRowClicked={(row) => view_job(row._id)}
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="offers" title="Offers">
                  <DataTableExtensions {...table_offers}>
                    <DataTable
                      columns1={table_offers.columns}
                      data1={table_offers.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      onRowClicked={(row) => view_job(row._id)}
                    />
                  </DataTableExtensions>
                </Tab>

              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
