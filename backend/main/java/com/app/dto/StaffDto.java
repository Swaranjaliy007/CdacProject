package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class StaffDto extends BaseEntity {
	 private String name;
	    private LocalDate hireDate;
	    private String contactNo;
	   

}
