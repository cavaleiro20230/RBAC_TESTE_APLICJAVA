package com.api.transferegov.controller;

import com.api.transferegov.model.Projeto;
import com.api.transferegov.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    @Autowired
    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    @GetMapping
    public ResponseEntity<List<Projeto>> listarTodos() {
        return ResponseEntity.ok(projetoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscarPorId(@PathVariable Long id) {
        return projetoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Projeto> criar(@Valid @RequestBody Projeto projeto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projetoService.salvar(projeto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @Valid @RequestBody Projeto projeto) {
        return projetoService.buscarPorId(id)
                .map(projetoExistente -> {
                    projeto.setId(id);
                    return ResponseEntity.ok(projetoService.salvar(projeto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        return projetoService.buscarPorId(id)
                .map(projeto -> {
                    projetoService.excluir(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/registrar")
    public ResponseEntity<Map<String, Object>> registrarNoTransfereGov(@PathVariable Long id) {
        try {
            Map<String, Object> resultado = projetoService.registrarProjetoNoTransfereGov(id);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        try {
            String novoStatus = statusMap.get("status");
            Map<String, Object> resultado = projetoService.atualizarStatusProjeto(id, novoStatus);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/transferegov")
    public ResponseEntity<List<Map<String, Object>>> consultarProjetosNoTransfereGov() {
        try {
            List<Map<String, Object>> projetos = projetoService.consultarProjetosNoTransfereGov();
            return ResponseEntity.ok(projetos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}