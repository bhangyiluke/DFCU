package ug.dfcu.staff.service;

import java.util.Calendar;
import java.io.UnsupportedEncodingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.model.OtpCode;
import ug.dfcu.staff.repository.OtpRepository;
import ug.dfcu.staff.utils.StaffUtils;

// import net.bytebuddy.utility.RandomString;
@Service
@Transactional
public class OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    OtpRepository otpRepository;

    @Autowired
    JavaMailSender mailSender;

    @Value("${ug.dfcu.staff.otpLength}")
    Integer otpLength;

    @Value("${ug.dfcu.staff.otpExpirationInMs}")
    Integer otpExpirationInMs;

    @Value("${ug.dfcu.staff.support.email}")
    String supportMail;

    @Value("${ug.dfcu.staff.support.name}")
    String supportName;

    /*
     * Generate the given length of AlphaNumeric and send it by email
     * 
     */
    public void generateToken(String email)
            throws JsonProcessingException, MessagingException, UnsupportedEncodingException {
        logger.info(String.format("User requested otp: %s", email));
        String otp = StaffUtils.randomAlphanumeric(otpLength);
        // TODO: First use the OTP without encording it
        String encorded = otp;//passwordEncoder.encode(otp);
        // Check if the user has an old OTP and repalce it
        OtpCode oneTimePassword = otpRepository.findByEmail(email)
                .orElse(new OtpCode());

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, otpExpirationInMs);
        oneTimePassword.setOtpExpiryTime(cal);
        oneTimePassword.setEmail(email);
        oneTimePassword.setOneTimePassword(encorded);
        
        otpRepository.save(oneTimePassword);
        try{
            sendTokenEmail(email, otp);
        }catch(MailException e){
            logger.info("**********");
            logger.info(String.format("User requested otp: %s", otp));
            logger.info("**********");
            logger.error(e.getLocalizedMessage(), e);
        }       

    }

    public boolean verifyToken(String token) throws ResourceNotFoundException {
        // TODO: First use the OTP without encording it
        String encorded = token;//passwordEncoder.encode(token);
        // logger.info("Encorded OTP: "+encorded);
        OtpCode oneTimePassword = otpRepository.findByOneTimePassword(encorded).orElseThrow(
                () -> new ResourceNotFoundException("One Time Password", "token", token));
        return checkTokenExpiry(oneTimePassword);
    }

    private boolean checkTokenExpiry(OtpCode oneTimePassword) {
        try {
            logger.info("OTP expired? :- "+!Calendar.getInstance().before(oneTimePassword.getOtpExpiryTime()));
            logger.info("");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return Calendar.getInstance().before(oneTimePassword.getOtpExpiryTime());
    }

    public void sendTokenEmail(String email, String otp) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        Integer expiry = otpExpirationInMs ;// 60 / 60;

        helper.setFrom(supportMail, supportName);
        helper.setTo(email);

        String subject = "Here's your One Time Password (OTP) - Expire in 5 minutes!";

        String content = String.format("<p>Hello %s </p>"
                + "<p>For security reason, you're required to use the following "
                + "One Time Password to ensure authenticity:</p>"
                + "<p><b> %s </b></p>"
                + "<br>"
                + "<p>Note: this OTP is set to expire in %s minutes.</p>", email, otp, expiry);

        helper.setSubject(subject);
        helper.setText(content, true);
        // TODO: Unblock this to facilitate sending actual mail
        mailSender.send(message);
    }
}
