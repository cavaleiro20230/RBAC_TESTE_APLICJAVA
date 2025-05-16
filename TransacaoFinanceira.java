package com.api.transferegov.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TransacaoFinanceira {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String tipo; // PAGAMENTO, TRANSFERENCIA, ESTORNO
    
    @NotNull
    private BigDecimal valor;
    
    @NotNull
    private LocalDateTime dataHora;
    
    @NotBlank
    private String descricao;
    
    private String projetoId;
    
    private String destinatario;
    
    private String contaOrigem;
    
    private String contaDestino;
    
    private String status;
}