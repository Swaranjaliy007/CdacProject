package com.app.pojos;



import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orphanage")
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor

public class Orphanage extends BaseEntity{
    
    private String name;
    private String address;
    private String contact;
    private String email;
}
