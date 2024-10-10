package ug.dfcu.staff.model;

import java.time.LocalDate;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ug.dfcu.staff.utils.DatePrefixedSequenceIdGenerator;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employees")
public class Staff extends Auditable<Long,Long> {
    /*
     * Generate an employee number in the format 202400001
     */
    @Id
    @GeneratedValue(generator = "employee_seq")
    @GenericGenerator(name = "employee_seq", strategy = "ug.dfcu.staff.utils.DatePrefixedSequenceIdGenerator", parameters = {
            @Parameter(name = DatePrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = DatePrefixedSequenceIdGenerator.DATE_NUMBER_SEPARATOR_PARAMETER, value = "")
    })

    @Column(name = "EMPLOYEE_NO")
    Long employeeNo;

    @NotBlank
    @Size(max = 20)
    @Column(name = "SURNAME")
    String surname;

    @NotBlank
    @Size(max = 60)
    @Column(name = "OTHER_NAMES")
    String otherNames;

    @PastOrPresent
    @Column(name = "DATE_OF_BIRTH")
    LocalDate dateOfBirth;

    @Lob
    @Column(name = "ID_PHOTO")
    @JsonIgnore
    byte[] idPhoto;

    @Override
    public Long getId() {
        return employeeNo;
    }
}
