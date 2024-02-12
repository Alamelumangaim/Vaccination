package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.BookAppointment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
@Transactional
public interface BookAppointmentRepository extends JpaRepository<BookAppointment,Long> {

    @Query("select count(u) from BookAppointment u")
    BookAppointment condition(BookAppointment bookAppointment);
}
