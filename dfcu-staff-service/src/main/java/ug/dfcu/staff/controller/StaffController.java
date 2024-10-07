package ug.dfcu.staff.controller;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
// import jakarta.transaction.Transactional;
// import jakarta.transaction.Transactional.TxType;
import jakarta.validation.Valid;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.model.Staff;
import ug.dfcu.staff.payload.ApiResponse;
import ug.dfcu.staff.payload.StaffRequest;
import ug.dfcu.staff.repository.StaffRepository;
import ug.dfcu.staff.utils.StaffUtils;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Validated
@RestController
@RequestMapping("/api/staff")
@Tag(name = "Staff Controller")
public class StaffController {
    @Autowired
    StaffRepository staffRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW,readOnly = true)
    @Operation(summary="Staff Registration API",description = "This API allows new staff members to register by providing the following information")
    @RequestMapping(path = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, method = RequestMethod.POST)
    public ResponseEntity<?> registerStaff(@Valid StaffRequest request) throws IOException {

        Staff staff=new Staff();
        staff.setSurname(request.getSurname());
        staff.setOtherNames(request.getOtherNames());
        staff.setDateOfBirth(request.getDateOfBirth());
        MultipartFile file= request.getIdPhoto();
        if(file !=null){
            staff.setIdPhoto(request.getIdPhoto().getBytes());
        }            
        
        staffRepository.save(staff);
        URI location = ServletUriComponentsBuilder
        .fromCurrentContextPath().path("/api/staff/retrieval/{employeeNo}")
        .buildAndExpand(staff.getEmployeeNo()).toUri();
        // new ApiResponse(true, "User registered successfully")
        return ResponseEntity.created(location).body(new ApiResponse(true, "Staff member registered successfully"));
    }

    /*
     * Retrieve details of a staff on passing employee number
     * Or else return the list of all employees
     * Throw a ResourceNotFoundException exception if the employee number is not
     * found in the database
     */
    @Operation(summary="Staff Retrieval API",description = "This API returns the details of either one or more staff members.\r\n" + //
                " If an Employee Number is passed to the API, it will return the details of the associated staff member else it will return a list of all staff.")
    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = { "/retrieval", "/retrieval/{employeeNo}" })
    public ResponseEntity<?> staffRetrieval(@PathVariable(required = false) Long employeeNo)
            throws ResourceNotFoundException {
        if (employeeNo != null) {
            Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee", "employee number", employeeNo));
            return ResponseEntity.ok(staff);
        }
        List<Staff> employees = staffRepository.findAll();
        return ResponseEntity.ok(employees);
    }

    /*
     * Update only the Date of birth or the ID Photo of the given employee
     * This method will be able to handle update of any number of fields as they
     * come from client side
     */
    @Operation(summary="Staff Update API",description = "For a selected staff member, this API shall provide for updating the\r\n" + //
                "Date of Birth and ID Photo.")
    @PreAuthorize("isAuthenticated()")
    @PatchMapping(path = "/update/{id}", consumes = { "application/json-patch+json", MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody JsonPatch patch)
            throws ResourceNotFoundException, JsonProcessingException, IllegalArgumentException, JsonPatchException {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "employee id", id));
        Staff patched = StaffUtils.applyPatch(patch, staff);
        return ResponseEntity.ok(patched);
    }
}
