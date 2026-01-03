package com.shehan.assignment.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false,unique = true)
    private String nic;

    @ElementCollection
    private List<String> mobileNumber;

    @OneToMany(mappedBy = "customer" ,cascade = CascadeType.ALL)
    private List<Address> addresses;
}
