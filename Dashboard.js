import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { 
  People as PeopleIcon, 
  Folder as FolderIcon, 
  AttachMoney as AttachMoneyIcon, 
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import bolsistaService from '../services/bolsistaService';
import projetoService from '../services/projetoService';
import financeiroService from '../services/financeiroService';
import compraService from '../services/compraService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    bolsistas: 0,
    projetos: 0,
    transacoes: 0,
    compras: 0,
  });
  const [recentProjetos, setRecentProjetos] = useState([]);
  const [recentTransacoes, setRecentTransacoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bolsistasRes, projetosRes, transacoesRes, comprasRes] = await Promise.all([
          bolsistaService.getAll(),
          projetoService.getAll(),
          financeiroService.getTransacoes(),
          compraService.getAll(),
        ]);

        setStats({
          bolsistas: bolsistasRes.data.length,
          projetos: projetosRes.data.length,
          transacoes: transacoesRes.data.length,
          compras: comprasRes.data.length,
        });

        setRecentProjetos(projetosRes.data.slice(0, 5));
        setRecentTransacoes(transacoesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ['Bolsistas', 'Projetos', 'Transações', 'Compras'],
    datasets: [
      {
        data: [stats.bolsistas, stats.projetos, stats.transacoes, stats.compras],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Pagamentos',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#2196F3',
      },
      {
        label: 'Compras',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: '#F44336',
      },
    ],
  };

  return (
    <Layout>
      <PageHeader title="Dashboard" />
      
      <Grid container spacing={3}>
        {/* Cards de estatísticas */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ color: '#4CAF50', fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats.bolsistas}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bolsistas
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FolderIcon sx={{ color: '#2196F3', fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats.projetos}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Projetos
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff8e1',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ color: '#FFC107', fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats.transacoes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transações
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ffebee',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCartIcon sx={{ color: '#F44336', fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats.compras}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compras
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Movimentações Financeiras
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar 
                data={barData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true 
                }} 
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Registros
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Pie 
                data={pieData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true 
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Listas de itens recentes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Projetos Recentes" />
            <CardContent>
              <List>
                {recentProjetos.length > 0 ? (
                  recentProjetos.map((projeto, index) => (
                    <React.Fragment key={projeto.id}>
                      <ListItem>
                        <ListItemText
                          primary={projeto.nome}
                          secondary={`Orçamento: R$ ${projeto.orcamentoTotal.toLocaleString('pt-BR')}`}
                        />
                      </ListItem>
                      {index < recentProjetos.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Nenhum projeto encontrado" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Transações Recentes" />
            <CardContent>
              <List>
                {recentTransacoes.length > 0 ? (
                  recentTransacoes.map((transacao, index) => (
                    <React.Fragment key={transacao.id}>
                      <ListItem>
                        <ListItemText
                          primary={transacao.descricao}
                          secondary={`Valor: R$ ${transacao.valor.toLocaleString('pt-BR')} - Tipo: ${transacao.tipo}`}
                        />
                      </ListItem>
                      {index < recentTransacoes.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Nenhuma transação encontrada" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;