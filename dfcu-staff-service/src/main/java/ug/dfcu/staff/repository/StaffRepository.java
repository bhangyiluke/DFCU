package ug.dfcu.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import ug.dfcu.staff.model.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Long>{
    Optional<Staff> findByEmployeeNo(Long employeeNo);
    boolean existsBySurname(String surname);
}
