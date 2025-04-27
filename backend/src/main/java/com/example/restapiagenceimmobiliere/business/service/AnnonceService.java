package com.example.restapiagenceimmobiliere.business.service;

import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import java.util.List;

public interface AnnonceService {
    /**
     * Sauvegarde une nouvelle annonce ou met à jour une annonce existante
     */
    Annonce sauvegarderAnnonce(Annonce annonce);

    /**
     * Récupère toutes les annonces
     */
    List<Annonce> recupererToutesAnnonces();

    /**
     * Récupère une annonce par son ID
     */
    Annonce recupererAnnonceParId(Long id);

    /**
     * Supprime une annonce par son ID
     */
    void supprimerAnnonce(Long id);

    /**
     * Recherche les annonces avec un prix inférieur ou égal au prix maximum spécifié
     */
    List<Annonce> rechercherParPrixMax(double prixMax);

    /**
     * Recherche les annonces avec un nombre de pièces supérieur ou égal au nombre spécifié
     */
    List<Annonce> rechercherParNombreMinPieces(int nombrePieces);

    /**
     * Recherche les annonces avec une surface supérieure ou égale à la surface spécifiée
     */
    List<Annonce> rechercherParSurfaceMin(double surface);

    /**
     * Recherche les annonces par localisation
     */
    List<Annonce> rechercherParLocalisation(String localisation);

    // backend/src/main/java/com/example/restapiagenceimmobiliere/business/service/AnnonceService.java

    /**
     * Ajoute des images à une annonce existante
     * @param annonceId ID de l'annonce
     * @param newPhotos Liste des noms de fichiers des nouvelles photos
     * @return L'annonce mise à jour
     */
    Annonce ajouterPhotosAnnonce(Long annonceId, List<String> newPhotos);

    /**
     * Récupère les photos d'une annonce par son ID
     */
    List<String> recupererPhotosParAnnonceId(Long annonceId);
}