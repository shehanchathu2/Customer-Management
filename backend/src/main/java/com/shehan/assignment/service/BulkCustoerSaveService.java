package com.shehan.assignment.service;


import com.shehan.assignment.entity.Customer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.shehan.assignment.repository.CustomerRepository;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BulkCustoerSaveService {

    private final CustomerRepository repository;

    private final ExecutorService executor = Executors.newFixedThreadPool(10);

    public void upload(MultipartFile file) throws Exception {
        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            List<Customer> chunk = new ArrayList<>();
            int chunkSize = 10000;

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;
                Customer c = parseRowToCustomer(row);
                chunk.add(c);

                if (chunk.size() == chunkSize) {
                    List<Customer> toSave = new ArrayList<>(chunk);
                    executor.submit(() -> saveChunk(toSave));
                    chunk.clear();
                }
            }

            if (!chunk.isEmpty()) {
                List<Customer> toSave = new ArrayList<>(chunk);
                executor.submit(() -> saveChunk(toSave));
            }

            executor.shutdown();
            executor.awaitTermination(1, TimeUnit.HOURS);
        }
    }

    @Transactional
    public void saveChunk(List<Customer> chunk) {
        repository.saveAll(chunk);
    }

    private Customer parseRowToCustomer(Row row) {
        Customer c = new Customer();
        c.setName(row.getCell(0).getStringCellValue());
        Cell dobCell = row.getCell(1);
        if (dobCell.getCellType() == CellType.NUMERIC) {
            c.setDateOfBirth(
                    dobCell.getDateCellValue()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate()
            );
        } else {
            c.setDateOfBirth(LocalDate.parse(dobCell.getStringCellValue()));
        }
        c.setNic(row.getCell(2).getStringCellValue());
        return c;
    }
}

