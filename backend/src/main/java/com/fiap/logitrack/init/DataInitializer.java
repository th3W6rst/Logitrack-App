package com.fiap.logitrack.init;

import com.fiap.logitrack.model.RoboLogistico;
import com.fiap.logitrack.repository.RoboLogisticoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
  @Bean
  CommandLineRunner seed(RoboLogisticoRepository robos){
    return args -> {
      if(robos.count() == 0){
        robos.save(new RoboLogistico("Robo-AZ01","ATIVO",87,"Doca 3"));
        robos.save(new RoboLogistico("Robo-BX22","MANUTENCAO",45,"Oficina"));
        robos.save(new RoboLogistico("Robo-CL19","INATIVO",12,"Corredor B"));
        robos.save(new RoboLogistico("Robo-DK07","CRITICO",5,"Armazem 2"));
      }
    };
  }
}
