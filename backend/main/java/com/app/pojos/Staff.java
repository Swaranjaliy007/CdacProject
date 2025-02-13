package com.app.pojos;



import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "staff")
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
public class Staff extends BaseEntity {
  
    private String name;
    private LocalDate hireDate;
    private String contactNo;

    @ManyToOne
    @JoinColumn(name = "orphanage_id",nullable=false)
    private Orphanage orphanage;
}

