import { useEffect, useState } from "react";
import studentsService from "../services/students.service";
import { Card, Button, Table } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function StudentDetail({ id, setId }) {
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    getStudentDetails();
  }, [id]);

  const getStudentDetails = async () => {
    try {
      const response = await studentsService.getStudent(id);
      setStudentData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch student details:", error);
    }
  };

  return (
    <Card className="w-100 h-100 rounded-0 shadow">
      {studentData ? (
        <Card.Body>
          <button
            onClick={() => setId(null)}
            className="position-absolute top-0 end-0 btn "
          >
            <BsX size={28} />
          </button>
          <h2>{studentData.name}</h2>
          <p>
            Name: {studentData.first_name} {studentData.last_name}
          </p>
          <p>Email: {studentData.email}</p>
          <p>Gender: {studentData.gender}</p>
          <p>Date of Birth: {studentData.date_of_birth}</p>

          <button
            className="btn bg-dark text-white my-2 btn-sm"
            onClick={() => console.log("Add Marks clicked")}
          >
            Add Marks
          </button>
          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th className="bg-dark text-white">Subject</th>
                <th className="bg-dark text-white">Marks</th>
              </tr>
            </thead>
            <tbody>
              {studentData.Marks.length ? (
                studentData.Marks?.map((mark, index) => (
                  <tr key={index}>
                    <td>{mark.subject}</td>
                    <td>{mark.marks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No marks available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}
