package com.shehan.assignment.controller;


import com.shehan.assignment.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.shehan.assignment.service.BulkCustoerSaveService;
import com.shehan.assignment.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {
    private final CustomerService service;
    private final BulkCustoerSaveService bulkCustoerSaveService;

    @PostMapping
    public Customer create(@RequestBody Customer c){
        return service.create(c);
    }

    @GetMapping
    public List<Customer> all(){
        return service.findAll();
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id , @RequestBody Customer c){
        return service.update(id,c);
    }

    @PostMapping("/upload")
    public String upload (@RequestParam MultipartFile file) throws Exception{
        bulkCustoerSaveService.upload(file);
        return "Uploaded Sucessfully";
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        service.delete(id);
        return "Customer deleted successfully";
    }
}
