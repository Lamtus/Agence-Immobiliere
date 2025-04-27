package com.example.restapiagenceimmobiliere.web.dto;

import lombok.Builder;

@Builder
public record LoginRequest(
    String email,
    String mot_de_passe
) {} 