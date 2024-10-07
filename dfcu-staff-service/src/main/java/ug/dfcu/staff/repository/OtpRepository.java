package ug.dfcu.staff.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ug.dfcu.staff.model.OtpCode;

@Repository
public interface OtpRepository extends JpaRepository<OtpCode,Long>{
    Optional<OtpCode> findByEmail(String email);
    Optional<OtpCode> deleteByEmail(String email);
    Optional<OtpCode> findByOneTimePassword(String oneTimePassword);
}
