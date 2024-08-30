package com.vivek.jobapp.company;

import java.util.*;

public interface CompanyService {

    List<Company> getAllCompanies();
    boolean  updateCompany(Company company, Long id);
    void createCompany(Company company);
    boolean deleteCompanyById(Long id);
    Company getCompanyById(Long id);

}
