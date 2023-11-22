package com.epitech.jobboard.Entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "advertisements")
public class Advertissement {

    @Id
    private int ID;
    private String title;
    private String description;
    private String location;
    private double salary;
    private String category;
    private Date created_at;

    @ManyToOne
    @JoinColumn(name="company_id", referencedColumnName = "id")
    private Companies company;
}
