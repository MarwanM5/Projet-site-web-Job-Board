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
@Table(name = "routes")
public class Routes {
    @Id
    public int ID;
    public String paths;
    public String namePaths;
    public Boolean isLoggedIn;
}
