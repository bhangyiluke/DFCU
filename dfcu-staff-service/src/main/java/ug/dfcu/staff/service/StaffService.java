package ug.dfcu.staff.service;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.persistence.EntityManager;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.model.Staff;
import ug.dfcu.staff.payload.ApiResponse;
import ug.dfcu.staff.payload.StaffRequest;
import ug.dfcu.staff.payload.UpdateRequest;
import ug.dfcu.staff.repository.StaffRepository;
import ug.dfcu.staff.utils.StaffMapper;
import ug.dfcu.staff.utils.StaffUpdateMapper;

@Service
public class StaffService {

    private static final Logger logger = LoggerFactory.getLogger(StaffService.class);

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    private EntityManager entityManager;

    // @Autowired
    // private StaffUpdateMapper updateMapper;

    public ResponseEntity<?> registerStaff(StaffRequest request) throws IOException {
        if (staffRepository.existsBySurname(request.getSurname())) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Staff member has already registered in the system!"));
        }

        MultipartFile file = request.getIdPhoto();
        Staff staff = Staff.builder()
                .surname(request.getSurname())
                .otherNames(request.getOtherNames())
                .dateOfBirth(request.getDateOfBirth())
                // .idPhoto(file.getBytes())
                .build();
        if(file!=null){
            staff.setIdPhoto(file.getBytes());
        }
        staffRepository.save(staff);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/staff/retrieval/{employeeNo}")
                .buildAndExpand(staff.getEmployeeNo()).toUri();
        //
        return ResponseEntity.created(location).body(new ApiResponse(true, "Staff member registered successfully. Your employee number is:- "+staff.getEmployeeNo()));
    }

    public ResponseEntity<?> staffRetrieval(Long employeeNo) throws ResourceNotFoundException {
        
        if (employeeNo != null) {
            Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee", "employee number", employeeNo));
            return ResponseEntity.ok(staff);
        }
        
        List<Staff> employees = staffRepository.findAll();
        logger.warn("Now retrieving info for staff:=> "+employeeNo+" ["+employees.size()+"]");
        return ResponseEntity.ok(employees);
    }

    public ResponseEntity<?> updateStaff(Long id, UpdateRequest patch)
            throws ResourceNotFoundException, IllegalArgumentException, IOException {
        logger.info("Now updating the staff details");
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "employee id", id));
        var file = patch.getIdPhoto();
        if(patch.getDateOfBirth()!=null){
           staff.setDateOfBirth(patch.getDateOfBirth()); 
        }
        
        if (file != null) {
            staff.setIdPhoto(file.getBytes());
        }
        // updateMapper.updateValues(staff,patch);
        staffRepository.save(staff);
        return ResponseEntity.ok(staff);
    }

    // Filter on a soft deleted item
    public List<?> findAll(boolean isDeleted) {
        Session session = entityManager.unwrap(Session.class);
        var filter = session.enableFilter("deletedProductFilter");
        filter.setParameter("isDeleted", isDeleted);
        var products = staffRepository.findAll();
        session.disableFilter("deletedProductFilter");
        return products;
    }
}
