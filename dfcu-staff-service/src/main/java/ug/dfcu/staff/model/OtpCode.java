package ug.dfcu.staff.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Calendar;
import lombok.Data;

@Data
@Entity
@Table(name = "OTP_CODES")
public class OtpCode extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @Column(name = "email")
    private String email;

    @Column(name = "one_time_password")
    private String oneTimePassword;

    @Column(name = "otp_expiry_time")
    private Calendar otpExpiryTime;

    // public OtpCode() {

    // }

    // public OtpCode(String email, String oneTimePassword, Integer expiration) {
    //     this.email = email;
    //     this.oneTimePassword = oneTimePassword;

    //     Calendar cal = Calendar.getInstance();
    //     cal.add(Calendar.MILLISECOND, expiration);
    //     this.otpExpiryTime = cal;
    // }
}
