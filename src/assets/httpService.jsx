import httpCommon from "./http-common";

const getAll = () => {
  return httpCommon.get("/");
};

const get = id => {
  return httpCommon.get(`//${id}`);
};

const create = data => {
  return httpCommon.post("/", data);
};

const update = (id, data) => {
  return httpCommon.put(`//${id}`, data);
};

const remove = id => {
  return httpCommon.delete(`//${id}`);
};

const removeAll = () => {
  return httpCommon.delete(`/`);
};

const findByTitle = title => {
  return httpCommon.get(`/?title=${title}`);
};

const httpService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default httpService;