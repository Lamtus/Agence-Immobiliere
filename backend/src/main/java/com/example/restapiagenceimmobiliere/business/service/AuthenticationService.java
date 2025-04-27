package com.example.restapiagenceimmobiliere.business.service;

public interface AuthenticationService {
    /**
     * Authentifie un utilisateur et retourne un token JWT
     * @param email email de l'utilisateur
     * @param password mot de passe de l'utilisateur
     * @return token JWT
     */
    String login(String email, String password);

    /**
     * Déconnecte un utilisateur
     * @param token le token JWT à invalider
     */
    void logout(String token);

    /**
     * Vérifie si un token est valide
     * @param token le token JWT à vérifier
     * @return true si le token est valide, false sinon
     */
    boolean validateToken(String token);
} 