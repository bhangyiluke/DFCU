package ug.dfcu.staff.payload;

// import org.springframework.security.core.Authentication;

import lombok.Data;
// import ug.dfcu.staff.model.User;
import ug.dfcu.staff.security.UserPrincipal;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserPrincipal user;
    public JwtAuthenticationResponse(String accessToken,UserPrincipal user){
        this.accessToken = accessToken;
        this.user = user;
    }
}