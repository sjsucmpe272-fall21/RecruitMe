import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-data-table-component-extensions/dist/index.css";

const HeaderRecruiter = () => {
  const history = useHistory();

//   const handleLogout = () => {
//     localStorage.removeItem("email");
//     toast.success("Logout Sucessfull.");
//     history.push("/");
//   };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/newJobs">Create Job</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderRecruiter;
