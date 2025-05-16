package com.api.transferegov.service;

import com.api.transferegov.model.Compra;
import com.api.transferegov.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final TransfereGovClient transfereGovClient;

    @Autowired
    public CompraService(CompraRepository compraRepository, TransfereGovClient transfereGovClient) {
        this.compraRepository = compraRepository;
        this.transfereGovClient = transfereGovClient;
    }

    public List<Compra> listarTodas() {
        return compraRepository.findAll();
    }

    public Optional<Compra> buscarPorId(Long id) {
        return compraRepository.findById(id);
    }

    public List<Compra> buscarPorProjeto(String projetoId) {
        return compraRepository.findByProjetoId(projetoId);
    }

    public Compra salvar(Compra compra) {
        return compraRepository.save(compra);
    }

    public void excluir(Long id) {
        compraRepository.deleteById(id);
    }

    public Map<String, Object> registrarCompraNoTransfereGov(Long compraId) {
        Optional<Compra> compraOpt = compraRepository.findById(compraId);
        
        if (compraOpt.isPresent()) {
            Compra compra = compraOpt.get();
            
            Map<String, Object> compraRequest = new HashMap<>();
            compraRequest.put("descricao", compra.getDescricao());
            compraRequest.put("valor", compra.getValor());
            compraRequest.put("data", compra.getData().toString());
            compraRequest.put("fornecedor", compra.getFornecedor());
            compraRequest.put("cnpjFornecedor", compra.getCnpjFornecedor());
            compraRequest.put("projetoId", compra.getProjetoId());
            compraRequest.put("numeroProcesso", compra.getNumeroProcesso());
            
            ResponseEntity<Map> response = transfereGovClient.post("/compras", compraRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Compra não encontrada com o ID: " + compraId);
        }
    }

    public Map<String, Object> atualizarStatusCompra(Long compraId, String novoStatus) {
        Optional<Compra> compraOpt = compraRepository.findById(compraId);
        
        if (compraOpt.isPresent()) {
            Compra compra = compraOpt.get();
            compra.setStatus(novoStatus);
            compraRepository.save(compra);
            
            Map<String, Object> statusRequest = new HashMap<>();
            statusRequest.put("compraId", compraId.toString());
            statusRequest.put("status", novoStatus);
            
            ResponseEntity<Map> response = transfereGovClient.put("/compras/status", statusRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Compra não encontrada com o ID: " + compraId);
        }
    }

    public List<Map<String, Object>> consultarComprasNoTransfereGov(String projetoId) {
        ResponseEntity<List> response = transfereGovClient.get("/compras?projetoId=" + projetoId, List.class);
        return response.getBody();
    }
}