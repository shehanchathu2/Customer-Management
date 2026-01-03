package com.shehan.assignment.service;


import com.shehan.assignment.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.shehan.assignment.repository.CustomerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer create(Customer customer){
        return customerRepository.save(customer);
    }

    public List<Customer>findAll(){
        return customerRepository.findAll();
    }

    public Customer update(Long id , Customer updated){
        Customer c = customerRepository.findById(id).orElseThrow();
        c.setName(updated.getName());
        c.setDateOfBirth(updated.getDateOfBirth());
        return customerRepository.save(c);
    }

    public void delete(Long id) {
        Customer c = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
        customerRepository.delete(c);
    }
}
