package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.Register;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register,Long> {
    Register findByEmail(String email);

    Optional<Register> findRegisterByEmailAndPassword(String email, String encodedpassword);


    Optional<Register> findRegisterByEmail(String email);
}
