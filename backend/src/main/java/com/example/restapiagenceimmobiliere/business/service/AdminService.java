package com.example.restapiagenceimmobiliere.business.service;

import com.example.restapiagenceimmobiliere.web.dto.RegisterRequest;
import com.example.restapiagenceimmobiliere.dao.models.Admin;
 
public interface AdminService {
    Admin createAdmin(RegisterRequest request);
} 