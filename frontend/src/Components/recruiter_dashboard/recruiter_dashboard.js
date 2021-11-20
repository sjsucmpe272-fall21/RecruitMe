import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { jobs_list_columns, jobs_list_data } from "./recruiter_data";
import HeaderRecruiter from "./recruiter_header"
// import { PRODUCT_LIST, TOP_PRODUCTS } from "../../api";

const Dashboard = () => {
  const [isLoading_jobs_list, setLoading_jobs_list] = useState(true);
  const [table_jobs_list, setTable_jobs_list] = useState({
    columns: jobs_list_columns,
    data: {},
  });


  useEffect(() => {
    // List Jobs
//     axios.get(JOBS_API).then((response) => {
//       setTable_top_products_list((prevState) => ({
//         ...prevState,

//         data: response.data,
//       }));
//       setLoading_jobs_list(false);
//     });

    setTable_jobs_list((prevState) => ({
      ...prevState,

      data: jobs_list_data,
      }));
      setLoading_jobs_list(false);

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
