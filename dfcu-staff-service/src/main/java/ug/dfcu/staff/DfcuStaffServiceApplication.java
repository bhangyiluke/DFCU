package ug.dfcu.staff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
// @EntityScan(basePackageClasses = { 
// 		PollsApplication.class,
// 		Jsr310JpaConverters.class 
// })
public class DfcuStaffServiceApplication {

	// @PostConstruct
	// void init() {
	// 	TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	// }

	public static void main(String[] args) {
		SpringApplication.run(DfcuStaffServiceApplication.class, args);
	}

}
