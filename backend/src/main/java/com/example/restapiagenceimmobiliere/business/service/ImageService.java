package com.example.restapiagenceimmobiliere.business.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface ImageService {
    /**
     * Stocke une seule image et retourne son nom de fichier
     */
    String storeImage(MultipartFile file) throws IOException;

    /**
     * Stocke plusieurs images et retourne leurs noms de fichiers
     */
    List<String> storeImages(List<MultipartFile> files) throws IOException;

    /**
     * Supprime une image par son nom de fichier
     */
    void deleteImage(String filename) throws IOException;

    /**
     * Vérifie si le fichier est une image valide
     */
    boolean isImageValid(MultipartFile file);
} 