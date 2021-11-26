
export const SelectJob = appliedJob => {
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`http://localhost:8001/api/job_apply`, {
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