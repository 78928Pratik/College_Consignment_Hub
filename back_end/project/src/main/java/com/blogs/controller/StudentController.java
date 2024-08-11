package com.blogs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.custom_exceptions.StudentNotFoundException;
import com.blogs.dto.ApiResponse;
import com.blogs.dto.StudentDTO;
import com.blogs.entities.Student;
import com.blogs.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController 
{
	@Autowired
	private StudentService studentService;
	
	
	@GetMapping
	public List<StudentDTO> getAllDetails()
	{
		return studentService.getAllStudents();
	}
	
	
	
	@PostMapping("/addstudent")
	public ResponseEntity<ApiResponse> addStudent(@RequestBody StudentDTO studentDTO) {
        studentService.addStudent(studentDTO);
       return new ResponseEntity<ApiResponse>(new ApiResponse("student added sucessfully!!!"),HttpStatus.CREATED);
    }
	
	
	
	
	@SuppressWarnings("unlikely-arg-type")
	@PutMapping("/updatestudent/{id}")
	public ResponseEntity<ApiResponse>  updateStudent(@PathVariable Long id,@RequestBody StudentDTO studentDTO)
	{
		if(studentService.getStudentById(id).equals(studentDTO.getStudent_id()))
		{
			return new ResponseEntity<ApiResponse>(new ApiResponse("Id Not Found"),HttpStatus.NOT_FOUND);
		}
		studentService.updateStudent(studentDTO);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Student has been Updated"),HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{student_Id}")
	public ResponseEntity<ApiResponse>  deleteStudentDetails(@PathVariable Long student_Id)
	{
		try {
		studentService.deleteStudent(student_Id);
		 return ResponseEntity.ok(new ApiResponse("deleted successfully"));
		}
		catch(StudentNotFoundException e)
		{
			return ResponseEntity.status(404).body(new ApiResponse( e.getMessage()));
		}
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getStudentById(@PathVariable Long id) 
	{
		try 
		{
            Student student = studentService.getStudentById(id);
            return ResponseEntity.ok(new ApiResponse("Student details find(id) successfully"));
        } 
		catch (StudentNotFoundException e) 
		{
            return ResponseEntity.status(404).body(new ApiResponse( e.getMessage()));
        }
       
       
    }

}
