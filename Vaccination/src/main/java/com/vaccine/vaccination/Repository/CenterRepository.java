package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.Centers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Centers,Long> {
    Centers findCenterById(Long id);
}
