package com.app.dto;

import com.app.pojos.BaseEntity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Data
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor

public class ChildDto extends BaseEntity{
	
    private String name;
    private int age;
    @Column(nullable = false)
    private String gender;
//    private Long orphanage_id;
    
}