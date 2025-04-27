package com.example.restapiagenceimmobiliere.business.serviceImpl;

import com.example.restapiagenceimmobiliere.business.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    private final Path uploadDirectory;

    @Autowired
    public ImageServiceImpl(Path uploadDirectory) {
        this.uploadDirectory = uploadDirectory;
    }

    @Override
    public String storeImage(MultipartFile file) throws IOException {
        if (!isImageValid(file)) {
            throw new IllegalArgumentException("Le fichier doit être une image valide");
        }

        // Génération d'un nom de fichier unique
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = UUID.randomUUID().toString() + extension;

        // Sauvegarde du fichier
        Path targetLocation = uploadDirectory.resolve(newFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return newFilename;
    }

    @Override
    public List<String> storeImages(List<MultipartFile> files) throws IOException {
        List<String> filenames = new ArrayList<>();
        
        for (MultipartFile file : files) {
            if (!isImageValid(file)) {
                // Si une image n'est pas valide, on supprime toutes les images déjà uploadées
                filenames.forEach(filename -> {
                    try {
                        deleteImage(filename);
                    } catch (IOException e) {
                        // Log l'erreur mais continue
                        e.printStackTrace();
                    }
                });
                throw new IllegalArgumentException("Tous les fichiers doivent être des images valides");
            }
            filenames.add(storeImage(file));
        }
        
        return filenames;
    }

    @Override
    public void deleteImage(String filename) throws IOException {
        Path file = uploadDirectory.resolve(filename);
        Files.deleteIfExists(file);
    }

    @Override
    public boolean isImageValid(MultipartFile file) {
        if (file.isEmpty()) {
            return false;
        }

        String contentType = file.getContentType();
        if (contentType == null) {
            return false;
        }

        // Liste des types MIME autorisés
        return contentType.equals("image/jpeg") ||
               contentType.equals("image/png") ||
               contentType.equals("image/gif") ||
               contentType.equals("image/bmp") ||
               contentType.equals("image/webp");
    }

    /**
     * Méthode utilitaire pour créer le répertoire de stockage s'il n'existe pas
     */
    private void createUploadDirectoryIfNotExists() throws IOException {
        if (!Files.exists(uploadDirectory)) {
            Files.createDirectories(uploadDirectory);
        }
    }
} 