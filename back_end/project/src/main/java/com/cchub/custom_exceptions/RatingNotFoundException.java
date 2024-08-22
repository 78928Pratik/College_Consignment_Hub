package com.cchub.custom_exceptions;

@SuppressWarnings("serial")
public class RatingNotFoundException extends RuntimeException 
{
	public RatingNotFoundException(String mesg) 
	{
		super(mesg);
	}
}
