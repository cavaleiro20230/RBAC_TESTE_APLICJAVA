package com.api.transferegov.repository;

import com.api.transferegov.model.Bolsista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BolsistaRepository extends JpaRepository<Bolsista, Long> {
    List<Bolsista> findByProjeto(String projeto);
}