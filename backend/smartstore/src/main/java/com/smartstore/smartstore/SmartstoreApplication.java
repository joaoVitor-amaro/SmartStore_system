package com.smartstore.smartstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {
		UserDetailsServiceAutoConfiguration.class,
		SecurityAutoConfiguration.class
})
@EnableAsync
@EnableScheduling
public class SmartstoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartstoreApplication.class, args);
	}

}
