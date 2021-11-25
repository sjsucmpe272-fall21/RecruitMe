import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { jobs_list_columns, jobs_list_data } from "./recruiter_data";
import HeaderRecruiter from "./recruiter_header"
import { GETALLJOBS } from "../../api";
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
    axios.get(GETALLJOBS).then((response) => {
      setTable_jobs_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_jobs_list(false);
    });

  }, []);

  

  if (isLoading_jobs_list) {
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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
