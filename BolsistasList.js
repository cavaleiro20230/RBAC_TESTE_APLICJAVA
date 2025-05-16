import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import PageHeader from '../../components/common/PageHeader';
import bolsistaService from '../../services/bolsistaService';

const BolsistasList = () => {
  const [bolsistas, setBolsistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBolsistas();
  }, []);

  const fetchBolsistas = async () => {
    try {
      setLoading(true);
      const response = await bolsistaService.getAll();
      setBolsistas(response.data);
    } catch (error) {
      console.error('Erro ao buscar bolsistas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    navigate(`/bolsistas/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este bolsista?')) {
      try {
        await bolsistaService.remove(id);
        fetchBolsistas();
      } catch (error) {
        console.error('Erro ao excluir bolsista:', error);
      }
    }
  };

  const handleRealizarPagamento = async (id) => {
    try {
      await bolsistaService.realizarPagamento(id);
      alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar pagamento:', error);
      alert('Erro ao realizar pagamento. Tente novamente.');
    }
  };

  const filteredBolsistas = bolsistas.filter(
    (bolsista) =>
      bolsista.nome.toLowerCase().includes(search.toLowerCase()) ||
      bolsista.cpf.includes(search) ||
      bolsista.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader
        title="Bolsistas"
        breadcrumbs={[{ label: 'Bolsistas', path: '/bolsistas' }]}
      />

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar bolsista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/bolsistas/novo')}
        >
          Novo Bolsista
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Valor da Bolsa</TableCell>
                <TableCell>Projeto</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredBolsistas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum bolsista encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredBolsistas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bolsista) => (
                    <TableRow key={bolsista.id}>
                      <TableCell>{bolsista.nome}</TableCell>
                      <TableCell>{bolsista.cpf}</TableCell>
                      <TableCell>{bolsista.email}</TableCell>
                      <TableCell>
                        {bolsista.valorBolsa.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </TableCell>
                      <TableCell>{bolsista.projeto}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(bolsista.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(bolsista.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Realizar Pagamento">
                          <IconButton
                            color="success"
                            onClick={() => handleRealizarPagamento(bolsista.id)}
                          >
                            <PaymentsIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBolsistas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Paper>
    </Layout>
  );
};

export default BolsistasList;