package com.example.restapiagenceimmobiliere.web.dto;

import java.util.List;

import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import com.example.restapiagenceimmobiliere.dao.models.Categorie;
import com.example.restapiagenceimmobiliere.dao.models.TypeBien;
import lombok.Builder;

@Builder
public record AnnonceSummaryDTO(
    Long id,
    String titre,
    double prix,
    String localisation,
    Categorie categorie,
    int nombre_de_pieces,
    double superficie,
    TypeBien typeBien,
    List<String> photos
) {
    public static AnnonceSummaryDTO fromEntity(Annonce annonce) {
        
        
        return AnnonceSummaryDTO.builder()
                .id(annonce.getId())
                .titre(annonce.getTitre())
                .prix(annonce.getPrix())
                .localisation(annonce.getLocalisation())
                .categorie(annonce.getCategorie())
                .typeBien(annonce.getTypeBien())
                .photos(annonce.getPhotos())
                .nombre_de_pieces(annonce.getNombreDePieces())
                .superficie(annonce.getSuperficie())
                .build();
    }
} 