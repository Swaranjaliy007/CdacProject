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
public class AdoptedChildDto extends BaseEntity{
	
	    private String adoptionDate;
	    private Long userId;  // Use Long for IDs
	    private Long childId;

}
