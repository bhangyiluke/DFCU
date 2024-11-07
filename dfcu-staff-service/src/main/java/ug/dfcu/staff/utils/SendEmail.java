package ug.dfcu.staff.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class SendEmail {

    private static final Logger logger = LoggerFactory.getLogger(SendEmail.class);

    @Value("${ug.dfcu.staff.otpExpirationInMs}")
    Integer otpExpirationInMs;

    @Value("${ug.dfcu.staff.support.email}")
    String supportMail;

    @Value("${ug.dfcu.staff.support.name}")
    String supportName;

    @Autowired
    JavaMailSender mailSender;

    @Async("asyncPoolTaskExecutor")
    public void sendTokenEmail(String email, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            Integer expiry = otpExpirationInMs;// 60 / 60;

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
            mailSender.send(message);
        } catch (Exception e) {
            logger.info("**********");
            logger.info(String.format("User requested otp: %s", otp));
            logger.info("**********");
            logger.error(e.getLocalizedMessage(), e);
        }
    }
}
