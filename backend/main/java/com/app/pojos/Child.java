package com.app.pojos;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "child")
@Data
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor

public class Child extends BaseEntity{
    private String name;
    private int age;
    @Column(nullable = false)
    private String gender;


    @ManyToOne
    @JoinColumn(name = "orphanage_id")
//    @JsonIgnore
    private Orphanage orphanage;
}

