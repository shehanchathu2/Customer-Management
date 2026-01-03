package com.shehan.assignment.repository;

import com.shehan.assignment.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer ,Long> {
    boolean existsByNic(String nic);
}
