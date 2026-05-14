import httpService from "./http.Service";

const addMarks = async (data) => {
  const res = await httpService.post("/marks", data);
  return res.data;
};

const getMarksById = async (id) => {
  const res = await httpService.get(`/marks/${id}`);
  return res.data;
};

const updateMarks = async (id, data) => {
  const res = await httpService.put(`/marks/${id}`, data);
};

const deleteMarks = async (id) => {
  const res = await httpService.delete(`/marks/${id}`);
  return res.data;
};

export default {
  addMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
};
