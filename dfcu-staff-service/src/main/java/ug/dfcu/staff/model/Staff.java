package ug.dfcu.staff.model;

import java.time.LocalDate;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Parameter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ug.dfcu.staff.utils.DatePrefixedSequenceIdGenerator;

@Data
@Entity
@Table(name = "employees")
public class Staff {
    // @Id
    // @GeneratedValue(strategy=GenerationType.IDENTITY)
    // @Column(name="EMPLOYEE_ID")
    // Long id;
    /*
     * Generate an employee number in the format 202400001
     */
    @Id
    @GeneratedValue(generator = "employee_seq")
    @GenericGenerator(name = "employee_seq", strategy = "ug.dfcu.staff.utils.DatePrefixedSequenceIdGenerator", parameters = {
            @Parameter(name = DatePrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = DatePrefixedSequenceIdGenerator.DATE_NUMBER_SEPARATOR_PARAMETER, value = "")
    })
    @Size(max = 40)
    @Column(name = "EMPLOYEE_NO")
    // @GeneratedValue
    Long employeeNo;

    @NotBlank
    @Size(max = 20)
    @Column(name = "SURNAME")
    String surname;

    @NotBlank
    @Size(max = 60)
    @Column(name = "OTHER_NAMES")
    String otherNames;

    @NotBlank
    @Column(name = "DATE_OF_BIRTH")
    LocalDate dateOfBirth;

    @Column(name = "ID_PHOTO")
    byte[] idPhoto;
}
