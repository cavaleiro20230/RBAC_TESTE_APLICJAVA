package com.api.transferegov.service;

import com.api.transferegov.model.TransacaoFinanceira;
import com.api.transferegov.repository.TransacaoFinanceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FinanceiroService {

    private final TransacaoFinanceiraRepository transacaoRepository;
    private final TransfereGovClient transfereGovClient;

    @Autowired
    public FinanceiroService(TransacaoFinanceiraRepository transacaoRepository, TransfereGovClient transfereGovClient) {
        this.transacaoRepository = transacaoRepository;
        this.transfereGovClient = transfereGovClient;
    }

    public List<TransacaoFinanceira> listarTodas() {
        return transacaoRepository.findAll();
    }

    public Optional<TransacaoFinanceira> buscarPorId(Long id) {
        return transacaoRepository.findById(id);
    }

    public List<TransacaoFinanceira> buscarPorProjeto(String projetoId) {
        return transacaoRepository.findByProjetoId(projetoId);
    }

    public TransacaoFinanceira salvar(TransacaoFinanceira transacao) {
        return transacaoRepository.save(transacao);
    }

    public void excluir(Long id) {
        transacaoRepository.deleteById(id);
    }

    public Map<String, Object> realizarTransferencia(TransacaoFinanceira transacao) {
        transacao = transacaoRepository.save(transacao);
        
        Map<String, Object> transferenciaRequest = new HashMap<>();
        transferenciaRequest.put("tipo", transacao.getTipo());
        transferenciaRequest.put("valor", transacao.getValor());
        transferenciaRequest.put("descricao", transacao.getDescricao());
        transferenciaRequest.put("projetoId", transacao.getProjetoId());
        transferenciaRequest.put("destinatario", transacao.getDestinatario());
        transferenciaRequest.put("contaOrigem", transacao.getContaOrigem());
        transferenciaRequest.put("contaDestino", transacao.getContaDestino());
        
        ResponseEntity<Map> response = transfereGovClient.post("/financeiro/transferencias", transferenciaRequest, Map.class);
        
        return response.getBody();
    }

    public Map<String, Object> consultarSaldoProjeto(String projetoId) {
        ResponseEntity<Map> response = transfereGovClient.get("/financeiro/saldo?projetoId=" + projetoId, Map.class);
        return response.getBody();
    }

    public List<Map<String, Object>> consultarExtratoProjeto(String projetoId) {
        ResponseEntity<List> response = transfereGovClient.get("/financeiro/extrato?projetoId=" + projetoId, List.class);
        return response.getBody();
    }

    public Map<String, Object> estornarTransacao(Long transacaoId) {
        Optional<TransacaoFinanceira> transacaoOpt = transacaoRepository.findById(transacaoId);
        
        if (transacaoOpt.isPresent()) {
            TransacaoFinanceira transacao = transacaoOpt.get();
            
            Map<String, Object> estornoRequest = new HashMap<>();
            estornoRequest.put("transacaoOriginalId", transacaoId.toString());
            estornoRequest.put("motivo", "Estorno solicitado via API");
            
            ResponseEntity<Map> response = transfereGovClient.post("/financeiro/estornos", estornoRequest, Map.class);
            
            return response.getBody();
        } else {
            throw new RuntimeException("Transação não encontrada com o ID: " + transacaoId);
        }
    }
}