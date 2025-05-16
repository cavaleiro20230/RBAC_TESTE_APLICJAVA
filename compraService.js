import api from './api';

const getAll = () => {
  return api.get('/compras');
};

const getById = (id) => {
  return api.get(`/compras/${id}`);
};

const getByProjeto = (projetoId) => {
  return api.get(`/compras/projeto/${projetoId}`);
};

const create = (data) => {
  return api.post('/compras', data);
};

const update = (id, data) => {
  return api.put(`/compras/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/compras/${id}`);
};

const registrarNoTransfereGov = (id) => {
  return api.post(`/compras/${id}/registrar`);
};

const atualizarStatus = (id, status) => {
  return api.put(`/compras/${id}/status`, { status });
};

const consultarComprasNoTransfereGov = (projetoId) => {
  return api.get(`/compras/transferegov/${projetoId}`);
};

const compraService = {
  getAll,
  getById,
  getByProjeto,
  create,
  update,
  remove,
  registrarNoTransfereGov,
  atualizarStatus,
  consultarComprasNoTransfereGov,
};

export default compraService;