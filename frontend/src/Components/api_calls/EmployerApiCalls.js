export const SelectCandidate = appliedJob => {
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`/api/select_candidate`, {
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

  // export const getCandidates = job => {
  //   console.log(process.env.REACT_APP_BACKEND);
  //   return fetch(`/api/getCandidates`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(job)
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .catch(err => console.log(err));
  // };
  export const getCandidates = () => {
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`/api/getCandidates`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };