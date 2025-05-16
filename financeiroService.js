import api from './api';

const getTransacoes = () => {
  return api.get('/financeiro/transacoes');
};

const getTransacaoById = (id) => {
  return api.get(`/financeiro/transacoes/${id}`);
};

const getTransacoesByProjeto = (projetoId) => {
  return api.get(`/financeiro/transacoes/projeto/${projetoId}`);
};

const createTransacao = (data) => {
  return api.post('/financeiro/transacoes', data);
};

const updateTransacao = (id, data) => {
  return api.put(`/financeiro/transacoes/${id}`, data);
};

const removeTransacao = (id) => {
  return api.delete(`/financeiro/transacoes/${id}`);
};

const realizarTransferencia = (data) => {
  return api.post('/financeiro/transferencias', data);
};

const consultarSaldo = (projetoId) => {
  return api.get(`/financeiro/saldo/${projetoId}`);
};

const consultarExtrato = (projetoId) => {
  return api.get(`/financeiro/extrato/${projetoId}`);
};

const estornarTransacao = (transacaoId) => {
  return api.post(`/financeiro/estornos/${transacaoId}`);
};

const financeiroService = {
  getTransacoes,
  getTransacaoById,
  getTransacoesByProjeto,
  createTransacao,
  updateTransacao,
  removeTransacao,
  realizarTransferencia,
  consultarSaldo,
  consultarExtrato,
  estornarTransacao,
};

export default financeiroService;