package com.cchub.custom_exceptions;

@SuppressWarnings("serial")
public class CategoryNotFoundException extends RuntimeException 
{
	public CategoryNotFoundException(String mesg) 
	{
		super(mesg);
	}
}
