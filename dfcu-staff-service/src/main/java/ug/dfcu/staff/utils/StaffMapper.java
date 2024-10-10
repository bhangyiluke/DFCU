package ug.dfcu.staff.utils;

import org.mapstruct.Mapper;
// import org.mapstruct.extensions.spring.example.boot.mappers.MapperSpringConfig;
import org.springframework.core.convert.converter.Converter;

import ug.dfcu.staff.model.Staff;
import ug.dfcu.staff.payload.UpdateRequest;

@Mapper
public interface StaffMapper extends Converter<Staff, UpdateRequest> {
    // @Override
    Staff convert(UpdateRequest source);
}