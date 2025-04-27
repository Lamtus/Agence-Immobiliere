package com.example.restapiagenceimmobiliere.web.controller;

import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import com.example.restapiagenceimmobiliere.business.service.AnnonceService;
import com.example.restapiagenceimmobiliere.web.dto.AnnonceDTO;
import com.example.restapiagenceimmobiliere.web.dto.AnnonceSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;     
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/annonces")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AnnonceController {

    private final AnnonceService annonceService;

    @Autowired
    public AnnonceController(AnnonceService annonceService) {
        this.annonceService = annonceService;
    }

    @GetMapping
    public ResponseEntity<List<AnnonceSummaryDTO>> getAllAnnonces() {
        List<AnnonceSummaryDTO> annonces = annonceService.recupererToutesAnnonces()
                .stream()
                .map(AnnonceSummaryDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(annonces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnonceDTO> getAnnonceById(@PathVariable Long id) {
        Annonce annonce = annonceService.recupererAnnonceParId(id);
        return ResponseEntity.ok(AnnonceDTO.fromEntity(annonce));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AnnonceDTO> createAnnonce(@RequestBody AnnonceDTO annonceDTO) {
        Annonce annonce = AnnonceDTO.toEntity(annonceDTO);
        annonce.setDate_publication(ZonedDateTime.now());
        Annonce savedAnnonce = annonceService.sauvegarderAnnonce(annonce);
        return ResponseEntity.ok(AnnonceDTO.fromEntity(savedAnnonce));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AnnonceDTO> updateAnnonce(@PathVariable Long id, @RequestBody AnnonceDTO annonceDTO) {
        Annonce annonce = AnnonceDTO.toEntity(annonceDTO);
        annonce.setId(id);
        Annonce updatedAnnonce = annonceService.sauvegarderAnnonce(annonce);
        return ResponseEntity.ok(AnnonceDTO.fromEntity(updatedAnnonce));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.supprimerAnnonce(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recherche")
    public ResponseEntity<List<AnnonceSummaryDTO>> rechercherAnnonces(
            @RequestParam(required = false) Double prixMax,
            @RequestParam(required = false) Integer nombrePieces,
            @RequestParam(required = false) Double surfaceMin,
            @RequestParam(required = false) String localisation) {
        
        List<Annonce> annonces;
        if (prixMax != null) {
            annonces = annonceService.rechercherParPrixMax(prixMax);
        } else if (nombrePieces != null) {
            annonces = annonceService.rechercherParNombreMinPieces(nombrePieces);
        } else if (surfaceMin != null) {
            annonces = annonceService.rechercherParSurfaceMin(surfaceMin);
        } else if (localisation != null) {
            annonces = annonceService.rechercherParLocalisation(localisation);
        } else {
            annonces = annonceService.recupererToutesAnnonces();
        }

        List<AnnonceSummaryDTO> annonceSummaries = annonces.stream()
                .map(AnnonceSummaryDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(annonceSummaries);
    }

    @GetMapping("/{id}/photos")
    public ResponseEntity<List<String>> getAnnoncePhotos(@PathVariable Long id) {
        List<String> photos = annonceService.recupererPhotosParAnnonceId(id);
        return ResponseEntity.ok(photos);
    }
} 