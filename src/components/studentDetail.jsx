import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Spinner,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { BsX, BsPlusLg } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";

import subjectService from "../services/subject.service";
import marksService from "../services/marks.service";
import studentsService from "../services/students.service";

export default function StudentDetail({ id, setId }) {
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddMarks, setShowAddMarks] = useState(false);
  const [editingMarkId, setEditingMarkId] = useState(null);

  const [markData, setMarkData] = useState({
    subject_id: "",
    marks_obtained: "",
  });

  useEffect(() => {
    if (id) {
      getStudentDetails();
      getSubjects();
    }
  }, [id]);

  const getSubjects = async () => {
    try {
      const res = await subjectService.getSubjects();
      setSubjects(res.data);
    } catch (error) {
      console.log("Failed to fetch subjects:", error);
    }
  };

  const getStudentDetails = async () => {
    try {
      setLoading(true);

      const response = await studentsService.getStudent(id);
      setStudentData(response.data);
    } catch (error) {
      console.error("Failed to fetch student details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setMarkData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setMarkData({
      subject_id: "",
      marks_obtained: "",
    });

    setEditingMarkId(null);
  };

  const handleAddOrUpdateMarks = async (e) => {
    e.preventDefault();

    try {
      if (editingMarkId) {
        await marksService.updateMarks(editingMarkId, markData);
      } else {
        await marksService.addMarks({
          ...markData,
          student_id: id,
        });
      }

      resetForm();
      getStudentDetails();
    } catch (error) {
      console.error("Failed to save marks:", error);
    }
  };

  const handleEditMarks = (mark) => {
    setEditingMarkId(mark.mark_id);

    setMarkData({
      subject_id: mark.Subject.subject_id,
      marks_obtained: mark.marks_obtained,
    });

    setShowAddMarks(true);
  };

  const handleDeleteMarks = async (marksId) => {
    try {
      await marksService.deleteMarks(marksId);
      getStudentDetails();
    } catch (error) {
      console.error("Failed to delete marks:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  return (
    <Card
      className="border-0 shadow-sm h-100 overflow-hidden"
      style={{ width: "800px" }}
    >
      {studentData && (
        <Card.Body className="p-4 position-relative overflow-auto">
          <button
            className="position-absolute top-0 end-0 m-2 btn btn-sm"
            onClick={() => setId(null)}
          >
            <BsX size={28} />
          </button>

          <div className="mb-5 ">
            <div className="mb-3 ">
              <h3 className="fw-bold mb-1">
                {studentData.first_name} {studentData.last_name}
              </h3>

              <p className="text-muted mb-0">
                Student Details & Academic Records
              </p>
            </div>

            <Row className="g-3">
              <Col md={4}>
                <Card className="border-0 bg-light rounded-4 h-100">
                  <Card.Body>
                    <small className="text-muted d-block mb-1">Email</small>
                    <div className="fw-semibold">{studentData.email}</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="border-0 bg-light rounded-4 h-100">
                  <Card.Body>
                    <small className="text-muted d-block mb-1">Gender</small>
                    <div className="fw-semibold text-capitalize">
                      {studentData.gender}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="border-0 bg-light rounded-4 h-100">
                  <Card.Body>
                    <small className="text-muted d-block mb-1">
                      Date of Birth
                    </small>
                    <div className="fw-semibold">
                      {studentData.date_of_birth}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">Marks</h5>
              <p className="text-muted small mb-0">
                Manage student subject marks
              </p>
            </div>

            <Button
              variant={showAddMarks ? "outline-secondary" : "dark"}
              className="px-4 d-flex align-items-center gap-2"
              onClick={() => {
                if (showAddMarks) {
                  resetForm();
                  setShowAddMarks(false);
                } else {
                  setShowAddMarks(true);
                }
              }}
            >
              {showAddMarks ? (
                "Cancel"
              ) : (
                <>
                  <BsPlusLg />
                  Add Marks
                </>
              )}
            </Button>
          </div>

          {showAddMarks && (
            <Card className="border-0 bg-light rounded-4 mb-4">
              <Card.Body>
                <Form onSubmit={handleAddOrUpdateMarks}>
                  <Row className="g-3 align-items-end">
                    <Col md={5}>
                      <Form.Group controlId="subject_id">
                        <Form.Label className="fw-semibold">Subject</Form.Label>

                        <Form.Select
                          value={markData.subject_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Subject</option>

                          {subjects.map((subject) => (
                            <option
                              key={subject.subject_id}
                              value={subject.subject_id}
                            >
                              {subject.subject_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={5}>
                      <Form.Group controlId="marks_obtained">
                        <Form.Label className="fw-semibold">Marks</Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="Enter marks"
                          value={markData.marks_obtained}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2}>
                      <Button type="submit" variant="dark" className="w-100">
                        {editingMarkId ? "Update" : "Save"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          )}

          <Table responsive hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="bg-dark text-white">Subject</th>
                <th className="bg-dark text-white">Marks</th>
                <th className="bg-dark text-white">Actions</th>
              </tr>
            </thead>

            <tbody>
              {studentData.Marks?.length > 0 ? (
                studentData.Marks.map((mark) => (
                  <tr key={mark.mark_id}>
                    <td className="px-4 fw-medium">
                      {mark.Subject.subject_name}
                    </td>

                    <td>{mark.marks_obtained}</td>

                    <td className="text-end px-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm "
                          onClick={() => handleEditMarks(mark)}
                          title="Edit"
                        >
                          <BiEdit size={18} className="text-dark" />
                        </button>

                        <button
                          className="btn btn-sm "
                          onClick={() => handleDeleteMarks(mark.mark_id)}
                          title="Delete"
                        >
                          <BiTrash size={18} className="text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-5">
                    No marks available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      )}
    </Card>
  );
}
