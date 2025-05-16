package com.api.transferegov.service;

import com.api.transferegov.model.Bolsista;
import com.api.transferegov.repository.BolsistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BolsistaService {

    private final BolsistaRepository bolsistaRepository;
    private final TransfereGovClient transfereGovClient;

    @Autowired
    public BolsistaService(BolsistaRepository bolsistaRepository, TransfereGovClient transfereGovClient) {
        this.bolsistaRepository = bolsistaRepository;
        this.transfereGovClient = transfereGovClient;
    }

    public List<Bolsista> listarTodos() {
        return bolsistaRepository.findAll();
    }

    public Optional<Bolsista> buscarPorId(Long id) {
        return bolsistaRepository.findById(id);
    }

    public List<Bolsista> buscarPorProjeto(String projeto) {
        return bolsistaRepository.findByProjeto(projeto);
    }

    public Bolsista salvar(Bolsista bolsista) {
        return bolsistaRepository.save(bolsista);
    }

    public void excluir(Long id) {
        bolsistaRepository.deleteById(id);
    }

    public Map<String, Object> realizarPagamento(Long bolsistaId) {
        Optional<Bolsista> bolsistaOpt = bolsistaRepository.findById(bolsistaId);
        
        if (bolsistaOpt.isPresent()) {
            Bolsista bolsista = bolsistaOpt.get();
            
            Map<String, Object> pagamentoRequest = new HashMap<>();
            pagamentoRequest.put("cpfBeneficiario", bolsista.getCpf());
            pagamentoRequest.put("nomeBeneficiario", bolsista.getNome());
            pagamentoRequest.put("valorPagamento", bolsista.getValorBolsa());
            pagamentoRequest.put("contaBancaria", bolsista.getContaBancaria());
            pagamentoRequest.put("agencia", bolsista.getAgencia());
            pagamentoRequest.put("banco", bolsista.getBanco());
            pagamentoRequest.put("projeto", bolsista.getProjeto());
            pagamentoRequest.put("tipoPagamento", "BOLSA");
            
            ResponseEntity<Map> response = transfereGovClient.post("/pagamentos/bolsistas", pagamentoRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Bolsista não encontrado com o ID: " + bolsistaId);
        }
    }

    public List<Map<String, Object>> consultarPagamentos(String cpf) {
        ResponseEntity<List> response = transfereGovClient.get("/pagamentos/bolsistas?cpf=" + cpf, List.class);
        return response.getBody();
    }
}