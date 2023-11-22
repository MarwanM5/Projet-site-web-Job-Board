package com.epitech.jobboard.Entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.*;

import com.epitech.jobboard.Enumeration.Status;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "job_applications")
public class Job_application {
    @Id
    public int ID;
    @ManyToOne
    @JoinColumn(name = "advertisement_id") // name = actual column name in DB
    private Advertissement advertissement;
    @ManyToOne
    @JoinColumn(name = "person_id")  // Assuming the column in the DB is named 'person_id'
    private People person;
    @Enumerated(EnumType.STRING)
    public Status status;

    public boolean email_sent;

    public boolean getEmail_sent() {
        return email_sent;
    }
}
