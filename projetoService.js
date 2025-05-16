import api from './api';

const getAll = () => {
  return api.get('/projetos');
};

const getById = (id) => {
  return api.get(`/projetos/${id}`);
};

const create = (data) => {
  return api.post('/projetos', data);
};

const update = (id, data) => {
  return api.put(`/projetos/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/projetos/${id}`);
};

const registrarNoTransfereGov = (id) => {
  return api.post(`/projetos/${id}/registrar`);
};

const atualizarStatus = (id, status) => {
  return api.put(`/projetos/${id}/status`, { status });
};

const consultarProjetosNoTransfereGov = () => {
  return api.get('/projetos/transferegov');
};

const projetoService = {
  getAll,
  getById,
  create,
  update,
  remove,
  registrarNoTransfereGov,
  atualizarStatus,
  consultarProjetosNoTransfereGov,
};

export default projetoService;