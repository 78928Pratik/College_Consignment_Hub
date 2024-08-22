package com.cchub.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO 
{
	private Long student_id;
	private String student_name;
	private String username;
	private String email;
	private String password;  
	private String address;
	
}
