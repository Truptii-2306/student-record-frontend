import httpService from "./http.Service";

const addSubject = async (data) => {
  const res = await httpService.post("/subjects", data);
  return res.data;
};

const getSubjects = async () => {
  const res = await httpService.get(`/subjects`);
  return res.data;
};

const updateSubject = async (id, data) => {
  const res = await httpService.put(`/subjects/${id}`, data);
};

const deleteSubject = async (id) => {
  const res = await httpService.delete(`/subjects/${id}`);
  return res.data;
};

export default {
  addSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};
