package com.fiap.logitrack.service;

import com.fiap.logitrack.model.RoboLogistico;
import com.fiap.logitrack.repository.RoboLogisticoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoboLogisticoService {

  private final RoboLogisticoRepository repository;

  public RoboLogisticoService(RoboLogisticoRepository repository) {
    this.repository = repository;
  }

  public List<RoboLogistico> findAll(){ return repository.findAll(); }

  public RoboLogistico findById(Long id){
    return repository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Robô não encontrado"));
  }

  public RoboLogistico create(RoboLogistico r){ return repository.save(r); }

  public RoboLogistico update(Long id, RoboLogistico dados){
    RoboLogistico r = findById(id);
    r.setNome(dados.getNome());
    r.setStatus(dados.getStatus());
    r.setBateria(dados.getBateria());
    r.setUltimaLocalizacao(dados.getUltimaLocalizacao());
    return repository.save(r);
  }

  public void delete(Long id){ repository.deleteById(id); }

  public RoboLogistico updateStatus(Long id, String status){
    RoboLogistico r = findById(id);
    r.setStatus(status);
    return repository.save(r);
  }

  public RoboLogistico updateBateria(Long id, Integer bateria){
    RoboLogistico r = findById(id);
    r.setBateria(bateria);
    return repository.save(r);
  }
}
