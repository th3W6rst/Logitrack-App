package com.fiap.logitrack.controller;

import com.fiap.logitrack.model.RoboLogistico;
import com.fiap.logitrack.service.RoboLogisticoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/robos")
public class RoboLogisticoController {

  private final RoboLogisticoService service;

  public RoboLogisticoController(RoboLogisticoService service) {
    this.service = service;
  }

  @GetMapping
  public List<RoboLogistico> listar(){ return service.findAll(); }

  @GetMapping("/{id}")
  public RoboLogistico obter(@PathVariable("id") Long id){
    return service.findById(id);
  }

  @PostMapping
  public RoboLogistico criar(@RequestBody RoboLogistico robo){ return service.create(robo); }

  @PutMapping("/{id}")
  public RoboLogistico atualizar(@PathVariable("id") Long id, @RequestBody RoboLogistico robo){
    return service.update(id, robo);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletar(@PathVariable("id") Long id){
    service.delete(id);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{id}/status")
  public RoboLogistico atualizarStatus(@PathVariable("id") Long id, @RequestBody Map<String, String> body){
    return service.updateStatus(id, body.getOrDefault("status", "ATIVO"));
  }

  @PatchMapping("/{id}/bateria")
  public RoboLogistico atualizarBateria(@PathVariable("id") Long id, @RequestBody Map<String, Integer> body){
    return service.updateBateria(id, body.getOrDefault("bateria", 100));
  }
}
