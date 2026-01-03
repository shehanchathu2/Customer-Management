package com.shehan.assignment.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String line1;
    private String line2;

    @ManyToOne
    private City city;

    @ManyToOne
    private Country country;

    @ManyToOne
    private Customer customer;
}
