package com.ghoststrength;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GhoststrengrhApplication {

    public static void main(String[] args) {
        SpringApplication.run(GhoststrengrhApplication.class, args);
    }

}