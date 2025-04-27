package com.example.restapiagenceimmobiliere.dao.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titre;
    private String description;
    private double superficie;
    private int nombreDePieces;
    private String localisation;
    private double prix;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "annonce_photos",
        joinColumns = @JoinColumn(name = "annonce_id")
    )
    @Column(name = "photo_url")
    private List<String> photos;
    
    private String contact;
    private ZonedDateTime date_publication;
    
    @Enumerated(EnumType.STRING)
    private TypeBien typeBien;
    
    @Enumerated(EnumType.STRING)
    private Categorie categorie;
} 