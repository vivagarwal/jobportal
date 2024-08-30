package com.vivek.jobapp.review.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vivek.jobapp.company.Company;
import com.vivek.jobapp.company.CompanyService;
import com.vivek.jobapp.review.Review;
import com.vivek.jobapp.review.ReviewRespository;
import com.vivek.jobapp.review.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRespository reviewRespository;
    private CompanyService companyService;


    public ReviewServiceImpl(ReviewRespository reviewRespository, CompanyService companyService) {
        this.reviewRespository = reviewRespository;
        this.companyService = companyService;
    }

    @Override
    public List<Review> getAllReviews(Long companyId) {
        List<Review> reviews = reviewRespository.findByCompanyId(companyId);
        return reviews;
        
    }

    @Override
    public boolean addReview(Long companyId, Review review) {
        Company company = companyService.getCompanyById(companyId);
        if(company!=null){
            review.setCompany(company);
            reviewRespository.save(review);
            return true;
        }
        return false;
    }

    @Override
    public Review getReview(Long companyId, Long reviewId) {
        List<Review> reviews = reviewRespository.findByCompanyId(companyId);
        return reviews.stream().filter(review -> review.getId().equals(reviewId)).findFirst().orElse(null);
    }

    @Override
    public boolean updateReview(Long companyId, Long reviewId, Review updatedReview) {
       if(companyService.getCompanyById(companyId)!= null){
        updatedReview.setCompany(companyService.getCompanyById(companyId));
        updatedReview.setId(reviewId);
        reviewRespository.save(updatedReview);
        return true;
       }else{
        return false;
       }
    }

    @Override
    public boolean deleteReview(Long companyId, Long reviewId) {
        if(companyService.getCompanyById(companyId)!= null && reviewRespository.existsById(reviewId)){
            Review review = reviewRespository.findById(reviewId).orElse(null);
            Company company = review.getCompany();
            company.getReviews().remove(review);
            review.setCompany(null);
            companyService.updateCompany(company, companyId);
            reviewRespository.deleteById(reviewId);
            return true;
        }
        return false;
    }

}
