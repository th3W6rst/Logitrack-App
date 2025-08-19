package com.fiap.logitrack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
          .allowedOrigins(
            "http://localhost:8082",
            "http://127.0.0.1:8082",
            "http://localhost:19006",
            "http://localhost:5173",
            "http://localhost:3000"
          )
          .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
          .allowedHeaders("*");
      }
    };
  }
}
