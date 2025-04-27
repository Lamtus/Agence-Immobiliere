package com.example.restapiagenceimmobiliere.dao.repositories;
import com.example.restapiagenceimmobiliere.dao.models.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    List<Annonce> findByPrixLessThanEqual(double prix);
    List<Annonce> findByNombreDePiecesGreaterThanEqual(int nombrePieces);
    List<Annonce> findBySuperficieGreaterThanEqual(double surface);
    List<Annonce> findByLocalisationContainingIgnoreCase(String localisation);
} 