package com.cchub.custom_exceptions;

@SuppressWarnings("serial")
public class CartNotFoundException extends RuntimeException 
{
	public CartNotFoundException(String mesg) 
	{
		super(mesg);
	}
}
