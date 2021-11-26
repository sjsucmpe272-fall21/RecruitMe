import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { jobs_list_columns, applied_columns } from "./recruiter_data";
import HeaderRecruiter from "./recruiter_header"
import { GETCOMPANY, GETJOBS, APP_CAN} from "../../api";
import "../../css/recruiter_dashboard.css"

const Dashboard = () => {
  const [isLoading_jobs_list, setLoading_jobs_list] = useState(true);
  const [isLoading_applied, setLoading_Applied] = useState(true);
  const [table_jobs_list, setTable_jobs_list] = useState({
    columns: jobs_list_columns,
    data: {},
  });
  const [table_applied, setTable_applied] = useState({
    columns: applied_columns,
    data: {},
  });

  const view_job = (job_id) =>
  {
    window.location = "/view_job?job_id=" + job_id;
  }

  const view_candidate = (row) =>
  {
    window.location = "/sel_rej_can?candidate_id=" + row.candidate_id + "&&job_id=" + row.job_id
  }


  useEffect(() => {
    // List Jobs
    const getjobs = async () =>
    {
      // get employer's company
      let company_response = await axios.post(GETCOMPANY,{'email':'davidlee@google.com'})
      let company = company_response.data[0].company

      // get all jobs for this company
      let jobs_response = await  axios.post(GETJOBS,{'company':company})
      let jobs = jobs_response.data

        setTable_jobs_list((prevState) => ({
        ...prevState,

        data: jobs,
      }));
      setLoading_jobs_list(false);

      let job_det = {}
      // get applied candidate's names
      let applied_candidates = {}
      for (let i=0; i<jobs.length; i++)
      {
        let jobid = jobs[i]._id
        applied_candidates[jobid] = jobs[i].candidates_applied
        job_det[jobid] = jobs[i]
      }

      let app_can_response = await axios.post(APP_CAN,applied_candidates)
      let app_can = app_can_response.data

      let app_can_data = []
      for (let jid in app_can)
      {
            for (let i=0; i<app_can[jid].length; i++)
            {
                  let temp = {}
                  temp.job_id = jid
                  temp.job_title = job_det[jid].name
                  temp.candidate_id = app_can[jid][i]._id
                  temp.candidate_name = app_can[jid][i].firstName + ' ' + app_can[jid][i].lastName
                  temp.phone = app_can[jid][i].phoneNumber
                  app_can_data.push(temp)
            }
      }

        setTable_applied((prevState) => ({
          ...prevState,

          data: app_can_data,
        }));
        setLoading_Applied(false);
    }
    getjobs()
    

  }, [])

  

  if (isLoading_jobs_list || isLoading_applied ) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
    <HeaderRecruiter />
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
                  <DataTableExtensions {...table_applied}>
                    <DataTable
                      columns1={table_applied.columns}
                      data1={table_applied.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      onRowClicked={(row) => view_candidate(row)}
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
