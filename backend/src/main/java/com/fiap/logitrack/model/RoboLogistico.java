package com.fiap.logitrack.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
public class RoboLogistico {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false)
  private String status; // ATIVO, INATIVO, MANUTENCAO, CRITICO

  private Integer bateria; // 0..100
  private String ultimaLocalizacao;
  private LocalDateTime atualizadoEm;

  public RoboLogistico(){}

  public RoboLogistico(String nome, String status, Integer bateria, String ultimaLocalizacao){
    this.nome = nome;
    this.status = status;
    this.bateria = bateria;
    this.ultimaLocalizacao = ultimaLocalizacao;
    this.atualizadoEm = LocalDateTime.now();
  }

  @PrePersist @PreUpdate
  public void touch(){ this.atualizadoEm = LocalDateTime.now(); }

  public Long getId(){ return id; }
  public void setId(Long id){ this.id = id; }

  public String getNome(){ return nome; }
  public void setNome(String nome){ this.nome = nome; }

  public String getStatus(){ return status; }
  public void setStatus(String status){ this.status = status; }

  public Integer getBateria(){ return bateria; }
  public void setBateria(Integer bateria){ this.bateria = bateria; }

  public String getUltimaLocalizacao(){ return ultimaLocalizacao; }
  public void setUltimaLocalizacao(String ultimaLocalizacao){ this.ultimaLocalizacao = ultimaLocalizacao; }

  public LocalDateTime getAtualizadoEm(){ return atualizadoEm; }
  public void setAtualizadoEm(LocalDateTime atualizadoEm){ this.atualizadoEm = atualizadoEm; }
}
