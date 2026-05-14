import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import studentsService from "../services/students.service";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import AddStudentForm from "./addStudentForm";
import StudentDetail from "./studentDetail";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const studentsData = await studentsService.getAllStudents();
      setStudents(studentsData.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const addStudent = async (studentFormData) => {
    try {
      const studentsData = await studentsService.createStudent(studentFormData);
      getStudents();
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const res = await studentsService.deleteStudent(id);
      setStudents(students.filter((student) => student.student_id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const handleViewClick = (id) => {
    setStudentId(id);
  };

  return (
    <div className="container mt-4 ">
      <Card className="border-0">
        <Card.Body className="p-0">
          <div className="py-3 border-bottom d-flex justify-content-between">
            <h5 className="mb-0 fw-semibold">Students</h5>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => setShowAddForm(true)}
            >
              Add Student
            </button>
          </div>

          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th className="bg-dark text-white">ID</th>
                <th className="bg-dark text-white">First Name</th>
                <th className="bg-dark text-white">Last Name</th>
                <th className="bg-dark text-white">Email</th>
                <th className="bg-dark text-white">Date of Birth</th>
                <th className="bg-dark text-white">Gender</th>
                <th className="bg-dark text-white"></th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.email}</td>
                    <td>
                      {new Date(student.date_of_birth).toLocaleDateString()}
                    </td>
                    <td className="text-capitalize">{student.gender}</td>
                    <td>
                      <button
                        className="btn btn-sm  me-2"
                        title="View"
                        onClick={() => handleViewClick(student.student_id)}
                      >
                        <BsEye size={18} className="text-primary" />
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => deleteStudent(student.student_id)}
                        title="Delete"
                      >
                        <BiTrash size={18} className="text-danger" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No students found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {showAddForm && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 1050,
          }}
        >
          <div className="position-relative">
            <AddStudentForm
              setShowAddForm={() => setShowAddForm(false)}
              addStudent={addStudent}
            />
          </div>
        </div>
      )}
      {studentId ? (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 1050,
          }}
        >
          <div className="position-relative vw-100 vh-100 d-flex justify-content-center align-items-center">
            <StudentDetail id={studentId} setId={(id) => setStudentId(id)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StudentTable;
