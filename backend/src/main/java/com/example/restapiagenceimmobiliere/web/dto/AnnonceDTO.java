package com.example.restapiagenceimmobiliere.web.dto;

import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import com.example.restapiagenceimmobiliere.dao.models.Categorie;
import com.example.restapiagenceimmobiliere.dao.models.TypeBien;
import lombok.Builder;

import java.time.ZonedDateTime;
import java.util.List;

@Builder
public record AnnonceDTO(
    Long id,
    String titre,
    String description,
    double superficie,
    int nombre_de_pieces,
    String localisation,
    double prix,
    List<String> photos,
    String contact,
    ZonedDateTime date_publication,
    TypeBien typeBien,
    Categorie categorie
) {
    public static AnnonceDTO fromEntity(Annonce annonce) {
        return AnnonceDTO.builder()
                .id(annonce.getId())
                .titre(annonce.getTitre())
                .description(annonce.getDescription())
                .superficie(annonce.getSuperficie())
                .nombre_de_pieces(annonce.getNombreDePieces())
                .localisation(annonce.getLocalisation())
                .prix(annonce.getPrix())
                .photos(annonce.getPhotos())
                .contact(annonce.getContact())
                .date_publication(annonce.getDate_publication())
                .typeBien(annonce.getTypeBien())
                .categorie(annonce.getCategorie())
                .build();
    }

    public static Annonce toEntity(AnnonceDTO annonceDTO) {
        return Annonce.builder()
                .id(annonceDTO.id)
                .titre(annonceDTO.titre)
                .description(annonceDTO.description)
                .superficie(annonceDTO.superficie)
                .nombreDePieces(annonceDTO.nombre_de_pieces)
                .localisation(annonceDTO.localisation)
                .prix(annonceDTO.prix)
                .photos(annonceDTO.photos)
                .contact(annonceDTO.contact)
                .date_publication(annonceDTO.date_publication)
                .typeBien(annonceDTO.typeBien)
                .categorie(annonceDTO.categorie)
                .build();
    }
} 