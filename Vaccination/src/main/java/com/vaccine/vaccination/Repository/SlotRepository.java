package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.SlotBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SlotRepository extends JpaRepository<SlotBooking,Long> {
    int findAvailableSlotsById(long l);

}
