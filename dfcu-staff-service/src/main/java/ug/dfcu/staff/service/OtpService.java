package ug.dfcu.staff.service;

import java.util.Calendar;
import java.io.UnsupportedEncodingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.model.OtpCode;
import ug.dfcu.staff.repository.OtpRepository;
import ug.dfcu.staff.utils.SendEmail;
import ug.dfcu.staff.utils.StaffUtils;

// import net.bytebuddy.utility.RandomString;
@Service
public class OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    SendEmail sendEmail;

    @Autowired
    OtpRepository otpRepository;

    @Value("${ug.dfcu.staff.otpLength}")
    Integer otpLength;

    @Value("${ug.dfcu.staff.otpExpirationInMs}")
    Integer otpExpirationInMs;

    /*
     * Generate the given length of AlphaNumeric and send it by email
     * 
     */
    public void generateToken(String email)
            throws JsonProcessingException, MessagingException, UnsupportedEncodingException {
        logger.info(String.format("User requested otp: %s", email));
        String otp = StaffUtils.randomAlphanumeric(otpLength);
        // TODO: First use the OTP without encording it
        String encorded = otp;// passwordEncoder.encode(otp);
        // Check if the user has an old OTP and repalce it
        OtpCode oneTimePassword = otpRepository.findByEmail(email)
                .orElse(new OtpCode());

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, otpExpirationInMs);
        oneTimePassword.setOtpExpiryTime(cal);
        oneTimePassword.setEmail(email);
        oneTimePassword.setOneTimePassword(encorded);
        otpRepository.save(oneTimePassword);

        //Send message in asycn mode to gain faster return from token generation process.
        sendEmail.sendTokenEmail(email, otp);

    }

    public boolean verifyToken(String token) throws ResourceNotFoundException {
        // TODO: First use the OTP without encording it
        String encorded = token;// passwordEncoder.encode(token);
        // logger.info("Encorded OTP: "+encorded);
        OtpCode oneTimePassword = otpRepository.findByOneTimePassword(encorded).orElseThrow(
                () -> new ResourceNotFoundException("One Time Password", "token", token));
        return checkTokenExpiry(oneTimePassword);
    }

    private boolean checkTokenExpiry(OtpCode oneTimePassword) {
        return Calendar.getInstance().before(oneTimePassword.getOtpExpiryTime());
    }    
}
