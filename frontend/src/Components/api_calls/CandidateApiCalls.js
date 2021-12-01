
export const SelectJob = appliedJob => {
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`/api/job_apply`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appliedJob)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  export const GetSimilarJobs = appliedJob => {
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`/api/getSimilarJobs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appliedJob)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };