package com.example.restapiagenceimmobiliere.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Le nom est obligatoire")
    String nom,


    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    String email,

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    String mot_de_passe
) {} 