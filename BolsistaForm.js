import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../components/common/Layout';
import PageHeader from '../../components/common/PageHeader';
import bolsistaService from '../../services/bolsistaService';
import projetoService from '../../services/projetoService';

const BolsistaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const isEditing = !!id;

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await projetoService.getAll();
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();

    if (isEditing) {
      fetchBolsista();
    }
  }, [id, isEditing]);

  const fetchBolsista = async () => {
    try {
      setLoading(true);
      const response = await bolsistaService.getById(id);
      formik.setValues(response.data);
    } catch (error) {
      console.error('Erro ao buscar bolsista:', error);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    contaBancaria: Yup.string().required('Conta bancária é obrigatória'),
    agencia: Yup.string().required('Agência é obrigatória'),
    banco: Yup.string().required('Banco é obrigatório'),
    valorBolsa: Yup.number()
      .required('Valor da bolsa é obrigatório')
      .positive('Valor deve ser positivo'),
    projeto: Yup.string().required('Projeto é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      contaBancaria: '',
      agencia: '',
      banco: '',
      valorBolsa: '',
      projeto: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (isEditing) {
          await bolsistaService.update(id, values);
        } else {
          await bolsistaService.create(values);
        }
        navigate('/bolsistas');
      } catch (error) {
        console.error('Erro ao salvar bolsista:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Layout>
      <PageHeader
        title={isEditing ? 'Editar Bolsista' : 'Novo Bolsista'}
        breadcrumbs={[
          { label: 'Bolsistas', path: '/bolsistas' },
          {
            label: isEditing ? 'Editar Bolsista' : 'Novo Bolsista',
            path: isEditing ? `/bolsistas/editar/${id}` : '/bolsistas/novo',
          },
        ]}
      />

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="nome"
                name="nome"
                label="Nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="cpf"
                name="cpf"
                label="CPF"
                value={formik.values.cpf}
                onChange={formik.handleChange}
                error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                helperText={formik.touched.cpf && formik.errors.cpf}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="banco"
                name="banco"
                label="Banco"
                value={formik.values.banco}
                onChange={formik.handleChange}
                error={formik.touched.banco && Boolean(formik.errors.banco)}
                helperText={formik.touched.banco && formik.errors.banco}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="agencia"
                name="agencia"
                label="Agência"
                value={formik.values.agencia}
                onChange={formik.handleChange}
                error={formik.touched.agencia && Boolean(formik.errors.agencia)}
                helperText={formik.touched.agencia && formik.errors.agencia}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="contaBancaria"
                name="contaBancaria"
                label="Conta Bancária"
                value={formik.values.contaBancaria}
                onChange={formik.handleChange}
                error={
                  formik.touched.contaBancaria &&
                  Boolean(formik.errors.contaBancaria)
                }
                helperText={
                  formik.touched.contaBancaria && formik.errors.contaBancaria
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="valorBolsa"
                name="valorBolsa"
                label="Valor da Bolsa"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={formik.values.valorBolsa}
                onChange={formik.handleChange}
                error={
                  formik.touched.valorBolsa && Boolean(formik.errors.valorBolsa)
                }
                helperText={
                  formik.touched.valorBolsa && formik.errors.valorBolsa
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="projeto"
                name="projeto"
                select
                label="Projeto"
                value={formik.values.projeto}
                onChange={formik.handleChange}
                error={
                  formik.touched.projeto && Boolean(formik.errors.projeto)
                }
                helperText={formik.touched.projeto && formik.errors.projeto}
              >
                {projetos.map((projeto) => (
                  <MenuItem key={projeto.id} value={projeto.nome}>
                    {projeto.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/bolsistas')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Layout>
  );
};

export default BolsistaForm;