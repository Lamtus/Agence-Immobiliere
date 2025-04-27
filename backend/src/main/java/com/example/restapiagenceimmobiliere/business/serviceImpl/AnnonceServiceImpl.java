package com.example.restapiagenceimmobiliere.business.serviceImpl;

import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import com.example.restapiagenceimmobiliere.dao.repositories.AnnonceRepository;
import com.example.restapiagenceimmobiliere.business.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AnnonceServiceImpl implements AnnonceService {

    private final AnnonceRepository annonceRepository;

    @Autowired
    public AnnonceServiceImpl(AnnonceRepository annonceRepository) {
        this.annonceRepository = annonceRepository;
    }

    @Override
    public Annonce sauvegarderAnnonce(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    @Override
    public List<Annonce> recupererToutesAnnonces() {
        return annonceRepository.findAll();
    }

    @Override
    public Annonce recupererAnnonceParId(Long id) {
        return annonceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée avec l'ID: " + id));
    }

    @Override
    public void supprimerAnnonce(Long id) {
        annonceRepository.deleteById(id);
    }

    @Override
    public List<Annonce> rechercherParPrixMax(double prixMax) {
        return annonceRepository.findByPrixLessThanEqual(prixMax);
    }

    @Override
    public List<Annonce> rechercherParNombreMinPieces(int nombrePieces) {
        return annonceRepository.findByNombreDePiecesGreaterThanEqual(nombrePieces);
    }

    @Override
    public List<Annonce> rechercherParSurfaceMin(double surface) {
        return annonceRepository.findBySuperficieGreaterThanEqual(surface);
    }

    @Override
    public List<Annonce> rechercherParLocalisation(String localisation) {
        return annonceRepository.findByLocalisationContainingIgnoreCase(localisation);
    }

    @Override
    @Transactional
    public Annonce ajouterPhotosAnnonce(Long annonceId, List<String> newPhotos) {
        // Récupérer l'annonce existante
        Annonce annonce = recupererAnnonceParId(annonceId);
        
        // Initialiser la liste des photos si elle est null
        List<String> photos = annonce.getPhotos();
        if (photos == null) {
            photos = new ArrayList<>();
        }
        
        // Ajouter les nouvelles photos
        photos.addAll(newPhotos);
        
        // Mettre à jour l'annonce
        annonce.setPhotos(photos);
        
        // Sauvegarder et retourner l'annonce mise à jour
        return annonceRepository.save(annonce);
    }

    @Override
    public List<String> recupererPhotosParAnnonceId(Long annonceId) {
        Annonce annonce = recupererAnnonceParId(annonceId);
        return annonce.getPhotos() != null ? annonce.getPhotos() : new ArrayList<>();
    }
} 