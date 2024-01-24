package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.Availabledates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateRepository extends JpaRepository<Availabledates,Long> {

}
