package com.blogs.service;



import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import com.blogs.custom_exceptions.StudentNotFoundException;
import com.blogs.dto.StudentDTO;
import com.blogs.dto.WatchlistDTO;
import com.blogs.entities.Student;
import com.blogs.entities.Watchlist;
import com.blogs.repository.StudentRepository;
import com.blogs.repository.WatchlistRepository;

@Service   //spring bean containing business logic

//@Transactional    // auto trasactional management

public class StudentServiceImpl implements StudentService
{
	//inject dependency
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public void addStudent(StudentDTO studentDTO) 
	{
		Student student = modelMapper.map(studentDTO, Student.class);
		
		studentRepository.save(student);
	}
	@Override
	public Student getStudentById(Long id) 
	{
		

		Optional<Student> student = studentRepository.findById(id);
		return student.orElseThrow(() -> new StudentNotFoundException("Invalid Student ID!!!!"));
		
		
	}

	@Override
	public List<StudentDTO> getAllStudents()
	{
		List<Student> students = studentRepository.findAll();
		return students.stream().map(student->modelMapper.map(student,StudentDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void updateStudent(StudentDTO studentDTO) 
	{
		if(!studentRepository.findById(studentDTO.getStudent_id()).isPresent())
		{
			throw new StudentNotFoundException("student is not present!!!!");
		}
		Student student = modelMapper.map(studentDTO, Student.class);

		student.setStudent_name(studentDTO.getStudent_name());
		student.setUsername(studentDTO.getUsername());
		student.setEmail(studentDTO.getEmail());
		student.setPassword(studentDTO.getPassword());
		student.setAddress(studentDTO.getAddress());
		studentRepository.save(student);
	}

	@Override
	public void deleteStudent(Long id) 
	{
		if(studentRepository.findById(id).isPresent())
		{
			studentRepository.deleteById(id);
		}
		else
		{
			throw new StudentNotFoundException("student id is not found!!!!");
		}
		
		
	}
	
	

}
