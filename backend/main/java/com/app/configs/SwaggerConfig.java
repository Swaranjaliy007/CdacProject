package com.app.configs;

import org.springdoc.core.models.GroupedOpenApi;

//import org.springdoc.core.GroupedOpenApi;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;

//@Configuration
//public class SpringDocConfig {
  
//  @Bean
//  public GroupedOpenApi api() {
//      return GroupedOpenApi.builder()
//              .group("public-api")
//              .pathsToMatch("/api/**") // Adjust the base path as needed
//              .build();
//  }
//}
//import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
  @Bean
  public GroupedOpenApi publicApi() {
      return GroupedOpenApi.builder()
              .group("public-api")
              .pathsToMatch("/api/**") 
              .build();
  }
}
