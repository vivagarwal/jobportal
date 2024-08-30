package com.vivek.jobapp.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRespository extends JpaRepository<Review, Long>{

    List<Review> findByCompanyId(Long companyId);



}
