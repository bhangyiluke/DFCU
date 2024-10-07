package ug.dfcu.staff.model;

/*
 * Create the enumerator of a role and its description
 */
public enum  RoleName { 
    USER("Default user role"), 
    ADMIN("Administrator role"), 
    SUPER_ADMIN("Super Administrator role");

    private final String description;

    RoleName(String description){
        this.description = description;
    }

    public String getDescription(){
        return this.description;
    }

}