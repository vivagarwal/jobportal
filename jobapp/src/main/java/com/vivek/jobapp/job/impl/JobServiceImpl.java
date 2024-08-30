package com.vivek.jobapp.job.impl;

import java.util.*;

import org.springframework.stereotype.Service;

import com.vivek.jobapp.company.Company;
import com.vivek.jobapp.company.CompanyRepository;
import com.vivek.jobapp.job.Job;
import com.vivek.jobapp.job.JobRepository;
import com.vivek.jobapp.job.JobService;

@Service
public class JobServiceImpl implements JobService {

    private JobRepository jobRepository;
    private CompanyRepository companyRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository=companyRepository;
    }

    //get all jobs
    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    //create a job 
    @Override
    public void createJob(Job job) {
       // Save the job in the database
        jobRepository.save(job);
    }

    //get a specifiv job by id
    @Override
    public Job getJobById(Long id) {
       return jobRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteJobById(Long id) {
        try{
            jobRepository.deleteById(id);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    @Override
    public boolean updateJob(Long id, Job updatedJob) {
        Optional<Job> jobOptional = jobRepository.findById(id);

        if(jobOptional.isPresent()){
                Job job = jobOptional.get();
                job.setTitle(updatedJob.getTitle());
                job.setDescription(updatedJob.getDescription());
                job.setMinSalary(updatedJob.getMinSalary());
                job.setMaxSalary(updatedJob.getMaxSalary());
                job.setLocation(updatedJob.getLocation());
                job.setCompany(updatedJob.getCompany());
                jobRepository.save(job);
                return true;
            }
        return false;
    }
}
