package ug.dfcu.staff;

import java.util.concurrent.ThreadPoolExecutor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

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

	@Bean(name = "asyncPoolTaskExecutor")
    public ThreadPoolTaskExecutor executor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        // Core thread count.
        taskExecutor.setCorePoolSize(10);
        // The maximum number of threads maintained in the thread pool. Only when the buffer queue is full will threads exceeding the core thread count be requested.
        taskExecutor.setMaxPoolSize(100);
        // Cache queue.
        taskExecutor.setQueueCapacity(50);
        // Allowed idle time. Threads other than core threads will be destroyed after the idle time arrives.
        taskExecutor.setKeepAliveSeconds(200);
        // Thread name prefix for asynchronous methods.
        taskExecutor.setThreadNamePrefix("async-");
        /**
         * When the task cache queue of the thread pool is full and the number of threads in the thread pool reaches maximumPoolSize, if there are still tasks coming, a task rejection policy will be adopted.
         * There are usually four policies:
         * ThreadPoolExecutor.AbortPolicy: Discard the task and throw RejectedExecutionException.
         * ThreadPoolExecutor.DiscardPolicy: Also discard the task, but do not throw an exception.
         * ThreadPoolExecutor.DiscardOldestPolicy: Discard the task at the front of the queue and then try to execute the task again (repeat this process).
         * ThreadPoolExecutor.CallerRunsPolicy: Retry adding the current task and automatically call the execute() method repeatedly until it succeeds.
         */
        taskExecutor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        taskExecutor.initialize();
        return taskExecutor;
    }
}
