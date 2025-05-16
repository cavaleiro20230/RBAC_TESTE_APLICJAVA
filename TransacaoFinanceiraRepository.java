package com.api.transferegov.repository;

import com.api.transferegov.model.TransacaoFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoFinanceiraRepository extends JpaRepository<TransacaoFinanceira, Long> {
    List<TransacaoFinanceira> findByProjetoId(String projetoId);
}