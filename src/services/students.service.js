import httpService from "./http.Service";

const getAllStudents = async () => {
  const res = await httpService.get("/students");
  return res.data;
};

const getStudent = async (id) => {
  const res = await httpService.get(`/students/${id}`);
  return res.data;
};

const createStudent = async (studentData) => {
  const res = await httpService.post("/students", studentData);
  return res.data;
};

const updateStudent = async (id, studentData) => {
  const res = await httpService.put(`/students/${id}`, studentData);
  return res.data;
};

const deleteStudent = async (id) => {
  const res = await httpService.delete(`/students/${id}`);
  return res.data;
};

export default {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
