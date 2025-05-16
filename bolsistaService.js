import api from './api';

const getAll = () => {
  return api.get('/bolsistas');
};

const getById = (id) => {
  return api.get(`/bolsistas/${id}`);
};

const getByProjeto = (projeto) => {
  return api.get(`/bolsistas/projeto/${projeto}`);
};

const create = (data) => {
  return api.post('/bolsistas', data);
};

const update = (id, data) => {
  return api.put(`/bolsistas/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/bolsistas/${id}`);
};

const realizarPagamento = (id) => {
  return api.post(`/bolsistas/${id}/pagamento`);
};

const consultarPagamentos = (cpf) => {
  return api.get(`/bolsistas/pagamentos/${cpf}`);
};

const bolsistaService = {
  getAll,
  getById,
  getByProjeto,
  create,
  update,
  remove,
  realizarPagamento,
  consultarPagamentos,
};

export default bolsistaService;