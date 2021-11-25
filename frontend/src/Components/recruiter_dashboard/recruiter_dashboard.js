import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { jobs_list_columns } from "./recruiter_data";
import HeaderRecruiter from "./recruiter_header"
import { GETCOMPANY, GETJOBS, JOBDETAILS} from "../../api";
import "../../css/recruiter_dashboard.css"

const Dashboard = () => {
  const [isLoading_jobs_list, setLoading_jobs_list] = useState(true);
  const [table_jobs_list, setTable_jobs_list] = useState({
    columns: jobs_list_columns,
    data: {},
  });

  const view_job = (job_id) =>
  {
    window.location = "/view_job?job_id=" + job_id;
  }


  useEffect(() => {
    // List Jobs
    const getjobs = async () =>
    {
      axios.post(GETCOMPANY,{'email':'davidlee@google.com'}).then((result) => 
      {
        let company = result.data[0].company
        axios.post(GETJOBS,{'company':company}).then((response) =>
        {
          console.log(response.data)
          let jobids = response.data
          
          setTable_jobs_list((prevState) => ({
            ...prevState,
    
            data: response.data,
          }));
          setLoading_jobs_list(false);

          let promises = []
          for (let i=0; i=jobids.length; i++)
          {
            console.log(jobids[i])
          }
          //   promises.push(axios.post(JOBDETAILS,{'job_id':jobids[i]._id}).then((job_det) =>
          //   {
          //     console.log(job_det)
          //   }))
          // }
          // promises.toLocaleString(promises).then(() => {
          //   console.log("abc")
          // })
          

        })
      })
    }

    getjobs()
    

  }, [])

  

  if (isLoading_jobs_list ) {
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

                {/* <Tab eventKey="app_jobs" title="Applied Jobs">
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
                </Tab> */}

              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
