package com.api.transferegov.service;

import com.api.transferegov.model.Projeto;
import com.api.transferegov.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProjetoService {

    private final ProjetoRepository projetoRepository;
    private final TransfereGovClient transfereGovClient;

    @Autowired
    public ProjetoService(ProjetoRepository projetoRepository, TransfereGovClient transfereGovClient) {
        this.projetoRepository = projetoRepository;
        this.transfereGovClient = transfereGovClient;
    }

    public List<Projeto> listarTodos() {
        return projetoRepository.findAll();
    }

    public Optional<Projeto> buscarPorId(Long id) {
        return projetoRepository.findById(id);
    }

    public Projeto salvar(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    public void excluir(Long id) {
        projetoRepository.deleteById(id);
    }

    public Map<String, Object> registrarProjetoNoTransfereGov(Long projetoId) {
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);
        
        if (projetoOpt.isPresent()) {
            Projeto projeto = projetoOpt.get();
            
            Map<String, Object> projetoRequest = new HashMap<>();
            projetoRequest.put("nome", projeto.getNome());
            projetoRequest.put("descricao", projeto.getDescricao());
            projetoRequest.put("dataInicio", projeto.getDataInicio().toString());
            projetoRequest.put("dataFim", projeto.getDataFim().toString());
            projetoRequest.put("orcamentoTotal", projeto.getOrcamentoTotal());
            projetoRequest.put("responsavel", projeto.getResponsavel());
            
            ResponseEntity<Map> response = transfereGovClient.post("/projetos", projetoRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Projeto não encontrado com o ID: " + projetoId);
        }
    }

    public Map<String, Object> atualizarStatusProjeto(Long projetoId, String novoStatus) {
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);
        
        if (projetoOpt.isPresent()) {
            Projeto projeto = projetoOpt.get();
            projeto.setStatus(novoStatus);
            projetoRepository.save(projeto);
            
            Map<String, Object> statusRequest = new HashMap<>();
            statusRequest.put("projetoId", projetoId.toString());
            statusRequest.put("status", novoStatus);
            
            ResponseEntity<Map> response = transfereGovClient.put("/projetos/status", statusRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Projeto não encontrado com o ID: " + projetoId);
        }
    }

    public List<Map<String, Object>> consultarProjetosNoTransfereGov() {
        ResponseEntity<List> response = transfereGovClient.get("/projetos", List.class);
        return response.getBody();
    }
}