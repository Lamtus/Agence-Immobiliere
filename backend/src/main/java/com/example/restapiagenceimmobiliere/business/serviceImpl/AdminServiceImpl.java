package com.example.restapiagenceimmobiliere.business.serviceImpl;

import com.example.restapiagenceimmobiliere.business.service.AdminService;
import com.example.restapiagenceimmobiliere.dao.models.Admin;
import com.example.restapiagenceimmobiliere.dao.repositories.AdminRepository;
import com.example.restapiagenceimmobiliere.web.dto.RegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Admin createAdmin(RegisterRequest request) {
        // Vérifier si l'email existe déjà
        if (adminRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        // Créer un nouvel admin
        Admin admin = new Admin();
        admin.setNom(request.nom());
        admin.setEmail(request.email());
        admin.setMot_de_passe(passwordEncoder.encode(request.mot_de_passe()));

        // Sauvegarder et retourner l'admin
        return adminRepository.save(admin);
    }
} 