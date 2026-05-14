import { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Card } from "react-bootstrap";

function AddStudentForm({ setShowAddForm, addStudent }) {
  const [studentFormData, setStudentFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudentFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(studentFormData);
  };

  return (
    <Card
      className="border-0 shadow-lg "
      style={{
        width: "700px",
        maxWidth: "95vw",
      }}
    >
      <Card.Header className="bg-dark text-white py-3 ">
        <h5 className="mb-0">Add Student</h5>
      </Card.Header>

      <Card.Body className="p-4">
        <Form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup controlId="first_name">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter first name"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </div>

            <div className="col-md-6 mb-3">
              <FormGroup controlId="last_name">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter last name"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </div>
          </div>

          <FormGroup controlId="email" className="mb-3">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
          </FormGroup>

          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup controlId="date_of_birth">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl type="date" onChange={handleInputChange} />
              </FormGroup>
            </div>

            <div className="col-md-6 mb-3">
              <FormGroup controlId="gender">
                <FormLabel>Gender</FormLabel>

                <Form.Select onChange={handleInputChange}>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </FormGroup>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button
              variant="outline-dark btn btn-sm"
              onClick={() => setShowAddForm(false)}
            >
              Close
            </Button>
            <Button variant="dark btn btn-sm" onClick={handleSubmit}>
              Add Student
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddStudentForm;
