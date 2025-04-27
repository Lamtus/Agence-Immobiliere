package com.example.restapiagenceimmobiliere.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Value;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StorageConfig {
    
    @Value("${upload.path}")
    private String uploadPath;

    @Bean
    public Path uploadDirectory() {
        Path path = Paths.get(uploadPath);
        if (!path.toFile().exists()) {
            path.toFile().mkdirs();
        }
        return path;
    }
} 