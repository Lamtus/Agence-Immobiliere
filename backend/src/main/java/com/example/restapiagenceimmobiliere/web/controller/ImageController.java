package com.example.restapiagenceimmobiliere.web.controller;

import com.example.restapiagenceimmobiliere.business.service.ImageService;
import com.example.restapiagenceimmobiliere.dao.models.Annonce;

import org.springframework.beans.factory.annotation.Value;

import com.example.restapiagenceimmobiliere.business.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {

    private final ImageService imageService;
    private final AnnonceService annonceService;
    private final Path uploadDirectory;
    
    @Autowired
    public ImageController(ImageService imageService, AnnonceService annonceService, 
                          @Value("${file.upload-dir}") Path uploadDirectory) {
        this.imageService = imageService;
        this.annonceService = annonceService;
        this.uploadDirectory = uploadDirectory;
    }

    // Requiert authentification
    @PostMapping("/upload")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String filename = imageService.storeImage(file);
            return ResponseEntity.ok(Map.of(
                "filename", filename,
                "message", "Image uploadée avec succès"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Format de fichier invalide",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de l'upload",
                "message", e.getMessage()
            ));
        }
    }

    // Requiert authentification
    @PostMapping("/upload-multiple")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadMultipleImages(@RequestParam("files") List<MultipartFile> files) {
        try {
            List<String> filenames = imageService.storeImages(files);
            return ResponseEntity.ok(Map.of(
                "filenames", filenames,
                "message", "Images uploadées avec succès"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Format de fichier invalide",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de l'upload",
                "message", e.getMessage()
            ));
        }
    }

    // Requiert authentification
    @DeleteMapping("/{filename}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteImage(@PathVariable String filename) {
        try {
            imageService.deleteImage(filename);
            return ResponseEntity.ok(Map.of(
                "message", "Image supprimée avec succès"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la suppression",
                "message", e.getMessage()
            ));
        }
    }

    // Accessible publiquement
    @GetMapping("/{filename}")
    public ResponseEntity<?> getImage(@PathVariable String filename) {
        try {
            // Récupérer l'image du système de fichiers
            Path imagePath = uploadDirectory.resolve(filename);
            Resource resource = new FileSystemResource(imagePath.toFile());
            
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Déterminer le type de contenu
            String contentType = Files.probeContentType(imagePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            
            // Retourner l'image avec le bon Content-Type
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/annonce/{annonceId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadImagesForAnnonce(
            @PathVariable Long annonceId,
            @RequestParam("files") List<MultipartFile> files) {
        try {
            // 1. Upload les images
            List<String> filenames = imageService.storeImages(files);
            
            // 2. Mettre à jour l'annonce avec les nouvelles images
            Annonce updatedAnnonce = annonceService.ajouterPhotosAnnonce(annonceId, filenames);
            
            return ResponseEntity.ok(Map.of(
                "message", "Images ajoutées avec succès à l'annonce",
                "filenames", filenames,
                "annonceId", annonceId
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Format de fichier invalide",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de l'upload",
                "message", e.getMessage()
            ));
        }
    }
} 