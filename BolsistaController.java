package com.api.transferegov.controller;

import com.api.transferegov.model.Bolsista;
import com.api.transferegov.service.BolsistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bolsistas")
public class BolsistaController {

    private final BolsistaService bolsistaService;

    @Autowired
    public BolsistaController(BolsistaService bolsistaService) {
        this.bolsistaService = bolsistaService;
    }

    @GetMapping
    public ResponseEntity<List<Bolsista>> listarTodos() {
        return ResponseEntity.ok(bolsistaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bolsista> buscarPorId(@PathVariable Long id) {
        return bolsistaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projeto/{projeto}")
    public ResponseEntity<List<Bolsista>> buscarPorProjeto(@PathVariable String projeto) {
        return ResponseEntity.ok(bolsistaService.buscarPorProjeto(projeto));
    }

    @PostMapping
    public ResponseEntity<Bolsista> criar(@Valid @RequestBody Bolsista bolsista) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bolsistaService.salvar(bolsista));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bolsista> atualizar(@PathVariable Long id, @Valid @RequestBody Bolsista bolsista) {
        return bolsistaService.buscarPorId(id)
                .map(bolsistaExistente -> {
                    bolsista.setId(id);
                    return ResponseEntity.ok(bolsistaService.salvar(bolsista));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        return bolsistaService.buscarPorId(id)
                .map(bolsista -> {
                    bolsistaService.excluir(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/pagamento")
    public ResponseEntity<Map<String, Object>> realizarPagamento(@PathVariable Long id) {
        try {
            Map<String, Object> resultado = bolsistaService.realizarPagamento(id);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/pagamentos/{cpf}")
    public ResponseEntity<List<Map<String, Object>>> consultarPagamentos(@PathVariable String cpf) {
        try {
            List<Map<String, Object>> pagamentos = bolsistaService.consultarPagamentos(cpf);
            return ResponseEntity.ok(pagamentos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}