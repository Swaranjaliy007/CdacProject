package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class DonateDto {
	
	private Long donationId;
	private Long userId;
	private double payAmount;
    private LocalDate donationDate;
 
    
    

}
