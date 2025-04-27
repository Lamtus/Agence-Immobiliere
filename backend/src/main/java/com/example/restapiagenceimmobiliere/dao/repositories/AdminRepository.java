package com.example.restapiagenceimmobiliere.dao.repositories;

import com.example.restapiagenceimmobiliere.dao.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
} 