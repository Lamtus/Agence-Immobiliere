package com.example.restapiagenceimmobiliere.business.serviceImpl;

import com.example.restapiagenceimmobiliere.business.service.AuthenticationService;
import com.example.restapiagenceimmobiliere.dao.models.Admin;
import com.example.restapiagenceimmobiliere.dao.repositories.AdminRepository;
import com.example.restapiagenceimmobiliere.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    // Set pour stocker les tokens invalidés (logout)
    private final Set<String> invalidatedTokens = new HashSet<>();

    @Autowired
    public AuthenticationServiceImpl(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(String email, String password) {
        logger.info("Tentative de connexion pour l'email: {}", email);
        
        // Rechercher l'admin par email
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Email ou mot de passe incorrect"));

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(password, admin.getMot_de_passe())) {
            logger.warn("Mot de passe incorrect pour l'email: {}", email);
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }

        // Générer le token JWT
        String token = jwtTokenProvider.generateToken(admin.getId());
        logger.info("Token généré avec succès pour l'admin ID: {}", admin.getId());
        return token;
    }

    @Override
    public void logout(String token) {
        logger.info("Tentative de déconnexion avec token");
        // Vérifier si le token est valide avant de l'invalider
        if (token != null && validateToken(token)) {
            // Ajouter le token à la liste des tokens invalidés
            invalidatedTokens.add(token);
            logger.info("Token invalidé avec succès");
        } else {
            logger.warn("Tentative de déconnexion avec un token invalide");
        }
    }

    @Override
    public boolean validateToken(String token) {
        if (token == null) {
            logger.warn("Token null fourni pour validation");
            return false;
        }
        
        if (invalidatedTokens.contains(token)) {
            logger.warn("Token invalidé (déconnecté) détecté");
            return false;
        }

        boolean isValid = jwtTokenProvider.validateToken(token);
        logger.info("Validation de token: {}", isValid ? "valide" : "invalide");
        return isValid;
    }
} 