package ug.dfcu.staff.model;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;
import lombok.Data;

import java.io.Serializable;
import java.util.Calendar;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public abstract class Auditable<T,Y> implements Serializable, Persistable<Y>{
    private static final long serialVersionUID = 1L;
    @CreatedBy
    @Column(name = "CREATED_BY",updatable = false)
    protected T createdBy;

    @CreatedDate
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "CREATED_DATE",updatable = false)
    protected Calendar createdDate;

    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    protected T updatedBy;

    @LastModifiedDate
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "UPDATED_DATE")
    protected Calendar updatedDate;

    @Transient
    private boolean isNew = true;

    @PrePersist
    @PostLoad
    void markNotNew() {
        this.isNew = false;
    }
}
