package ug.dfcu.staff.service;

import java.util.Arrays;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import ug.dfcu.staff.model.Role;
import ug.dfcu.staff.model.RoleName;
import ug.dfcu.staff.repository.RoleRepository;

@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.loadRoles();
        logger.info("Successfully seeded default roles - "+RoleName.values().length);
    }

    private void loadRoles() {
        Arrays.asList(RoleName.values()).forEach((roleName) -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);

            optionalRole.ifPresentOrElse(System.out::println, () -> {
                Role roleToCreate = new Role(roleName);
                roleRepository.save(roleToCreate);
                // roleRepository.save(roleToCreate);
            });
        });

    }
}
