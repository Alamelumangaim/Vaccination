package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.TImeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeRepository extends JpaRepository<TImeSlot,Long> {
}
