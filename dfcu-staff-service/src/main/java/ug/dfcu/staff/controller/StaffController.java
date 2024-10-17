package ug.dfcu.staff.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.payload.StaffRequest;
import ug.dfcu.staff.payload.UpdateRequest;
import ug.dfcu.staff.service.StaffService;

@Validated
@RestController
// @CrossOrigin(origins = "*")
@RequestMapping("/api/staff")
@Tag(name = "Staff Controller")
public class StaffController {
    @Autowired
    StaffService staffService;

    @Operation(summary = "Staff Registration API", description = "This API allows new staff members to register by providing the following information")
    @PostMapping(path = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerStaff(@Valid StaffRequest request) throws IOException {
        return staffService.registerStaff(request);
    }

    /*
     * Retrieve details of a staff on passing employee number
     * Or else return the list of all employees
     * Throw a ResourceNotFoundException exception if the employee number is not
     * found in the database
     */
    @Operation(summary = "Staff Retrieval API", description = "This API returns the details of either one or more staff members.\r\n"
            + //
            " If an Employee Number is passed to the API, it will return the details of the associated staff member else it will return a list of all staff.")
    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = { "/retrieval", "/retrieval/{employeeNo}" })
    public ResponseEntity<?> staffRetrieval(@PathVariable(required = false) Long employeeNo)
            throws ResourceNotFoundException {
        return staffService.staffRetrieval(employeeNo);
    }

    /*
     * Update only the Date of birth or the ID Photo of the given employee
     * This method will be able to handle update of any number of fields as they
     * come from client side
     */
    @Operation(summary = "Staff Update API", description = "For a selected staff member, this API shall provide for updating the\r\n"
            + //
            "Date of Birth and ID Photo.")
    @PreAuthorize("isAuthenticated()")
    @PatchMapping(path = "/update/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> updateStaff(@PathVariable Long id, UpdateRequest patch)
            throws ResourceNotFoundException, IllegalArgumentException, IOException {
        return staffService.updateStaff(id, patch);
    }

    // @Operation(summary = "Staff Update API", description = "For a selected staff
    // member, this API shall provide for updating the\r\n"
    // + //
    // "Date of Birth and ID Photo.")
    // @PreAuthorize("isAuthenticated()")
    // @PatchMapping(path = "/update/{id}", consumes = {
    // "application/json-patch+json", MediaType.APPLICATION_JSON_VALUE })
    // public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody
    // Map<String, Object> patch)
    // throws ResourceNotFoundException, JsonProcessingException,
    // IllegalArgumentException, JsonPatchException {
    // return staffService.updateStaff(id,patch);
    // }
}
