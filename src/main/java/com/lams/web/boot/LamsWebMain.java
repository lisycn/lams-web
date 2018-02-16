package com.lams.web.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages={"com.lams"})
@SpringBootApplication
public class LamsWebMain {

	public static void main(String[] args) {
		SpringApplication.run(LamsWebMain.class, args);
	}

}
