package com.epitech.jobboard.Entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "companies")
public class Companies {
    @Id
    public int ID;
    public String name;
    public String address;
    public String contact_email;
}
