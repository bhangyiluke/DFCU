package ug.dfcu.staff.utils;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

import ug.dfcu.staff.model.Staff;
import ug.dfcu.staff.payload.UpdateRequest;

@Mapper
//(componentModel = MappingConstants.ComponentModel.SPRING)
public interface StaffUpdateMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateValues(@MappingTarget Staff target, UpdateRequest source);
}