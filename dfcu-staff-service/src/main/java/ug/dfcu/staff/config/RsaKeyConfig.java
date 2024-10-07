package ug.dfcu.staff.config;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

// @Configuration
@ConfigurationProperties(prefix = "ug.dfcu.staff.rsa")
public record RsaKeyConfig(RSAPublicKey publicKey, RSAPrivateKey privateKey ) {
}