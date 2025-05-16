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
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String descricao;
    
    @NotNull
    private BigDecimal valor;
    
    @NotNull
    private LocalDate data;
    
    @NotBlank
    private String fornecedor;
    
    @NotBlank
    private String cnpjFornecedor;
    
    private String projetoId;
    
    private String numeroProcesso;
    
    private String status;
}