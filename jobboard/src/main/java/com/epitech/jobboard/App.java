package com.epitech.jobboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// @ComponentScan can be omitted if you have only one package to scan
@ComponentScan(basePackages = { "com.epitech.jobboard.Controllers",
        "com.epitech.jobboard.Services",
"com.epitech.jobboard.Entities", "com.epitech.jobboard.Repository", "com.epitech.jobboard" })
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}