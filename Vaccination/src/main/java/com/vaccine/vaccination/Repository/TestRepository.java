package com.vaccine.vaccination.Repository;

import com.vaccine.vaccination.Model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test,Long> {
}
