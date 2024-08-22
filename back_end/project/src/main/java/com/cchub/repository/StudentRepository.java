package com.cchub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cchub.dto.StudentDTO;
import com.cchub.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

	Student findByEmailAndPassword(String email, String password);

	Student findByEmail(String email);

}
