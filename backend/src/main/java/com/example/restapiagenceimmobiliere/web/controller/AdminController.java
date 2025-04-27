package com.example.restapiagenceimmobiliere.web.controller;

import com.example.restapiagenceimmobiliere.business.service.AdminService;
import com.example.restapiagenceimmobiliere.dao.models.Admin;
import com.example.restapiagenceimmobiliere.web.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@Valid @RequestBody RegisterRequest request) {
        try {
            Admin admin = adminService.createAdmin(request);
            return ResponseEntity.ok(Map.of(
                "message", "Admin créé avec succès",
                "admin", Map.of(
                    "id", admin.getId(),
                    "nom", admin.getNom(),
                    "email", admin.getEmail()
                )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
} 