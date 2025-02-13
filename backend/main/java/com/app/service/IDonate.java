package com.app.service;

import java.util.List;

import com.app.dto.DonateDto;
import com.app.pojos.Donate;

public interface IDonate {
    List<Donate> getAllDonations();
    DonateDto getDonationById(Long id);
    Donate addDonation(DonateDto donateDto);
    Donate updateDonation(Long id, DonateDto donateDto);
    String deleteDonation(Long id);
}
