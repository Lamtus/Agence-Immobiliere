package com.example.restapiagenceimmobiliere.security;

import com.example.restapiagenceimmobiliere.dao.models.Admin;
import com.example.restapiagenceimmobiliere.dao.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin non trouvé avec l'email: " + email));

        return new User(admin.getEmail(), admin.getMot_de_passe(), new ArrayList<>());
    }

    public UserDetails loadUserById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Admin non trouvé avec l'id: " + id));

        return new User(admin.getEmail(), admin.getMot_de_passe(), new ArrayList<>());
    }
} 