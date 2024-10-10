package ug.dfcu.staff.payload;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Data
public class UpdateRequest {
    @PastOrPresent
    private LocalDate dateOfBirth;
    @Nullable
    private MultipartFile idPhoto;
}
