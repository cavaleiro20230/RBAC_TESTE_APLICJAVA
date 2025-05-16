package com.api.transferegov.controller;

import com.api.transferegov.model.TransacaoFinanceira;
import com.api.transferegov.service.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/financeiro")
public class FinanceiroController {

    private final FinanceiroService financeiroService;

    @Autowired
    public FinanceiroController(FinanceiroService financeiroService) {
        this.financeiroService = financeiroService;
    }

    @GetMapping("/transacoes")
    public ResponseEntity<List<TransacaoFinanceira>> listarTransacoes() {
        return ResponseEntity.ok(financeiroService.listarTodas());
    }

    @GetMapping("/transacoes/{id}")
    public ResponseEntity<TransacaoFinanceira> buscarTransacaoPorId(@PathVariable Long id) {
        return financeiroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/transacoes/projeto/{projetoId}")
    public ResponseEntity<List<TransacaoFinanceira>> buscarTransacoesPorProjeto(@PathVariable String projetoId) {
        return ResponseEntity.ok(financeiroService.buscarPorProjeto(projetoId));
    }

    @PostMapping("/transacoes")
    public ResponseEntity<TransacaoFinanceira> criarTransacao(@Valid @RequestBody TransacaoFinanceira transacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(financeiroService.salvar(transacao));
    }

    @PutMapping("/transacoes/{id}")
    public ResponseEntity<TransacaoFinanceira> atualizarTransacao(@PathVariable Long id, @Valid @RequestBody TransacaoFinanceira transacao) {
        return financeiroService.buscarPorId(id)
                .map(transacaoExistente -> {
                    transacao.setId(id);
                    return ResponseEntity.ok(financeiroService.salvar(transacao));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/transacoes/{id}")
    public ResponseEntity<Void> excluirTransacao(@PathVariable Long id) {
        return financeiroService.buscarPorId(id)
                .map(transacao -> {
                    financeiroService.excluir(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/transferencias")
    public ResponseEntity<Map<String, Object>> realizarTransferencia(@Valid @RequestBody TransacaoFinanceira transacao) {
        try {
            Map<String, Object> resultado = financeiroService.realizarTransferencia(transacao);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/saldo/{projetoId}")
    public ResponseEntity<Map<String, Object>> consultarSaldo(@PathVariable String projetoId) {
        try {
            Map<String, Object> saldo = financeiroService.consultarSaldoProjeto(projetoId);
            return ResponseEntity.ok(saldo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/extrato/{projetoId}")
    public ResponseEntity<List<Map<String, Object>>> consultarExtrato(@PathVariable String projetoId) {
        try {
            List<Map<String, Object>> extrato = financeiroService.consultarExtratoProjeto(projetoId);
            return ResponseEntity.ok(extrato);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/estornos/{transacaoId}")
    public ResponseEntity<Map<String, Object>> estornarTransacao(@PathVariable Long transacaoId) {
        try {
            Map<String, Object> resultado = financeiroService.estornarTransacao(transacaoId);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}