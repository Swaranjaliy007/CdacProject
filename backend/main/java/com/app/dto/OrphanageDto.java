package com.app.dto;


import com.app.pojos.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrphanageDto extends BaseEntity{
//    private int id;
    private String name;
    private String address;
    private String contact;
    private String email;
}
