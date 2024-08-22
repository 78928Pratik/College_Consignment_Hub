package com.cchub.custom_exceptions;

@SuppressWarnings("serial")
public class ItemNotFoundException extends RuntimeException 
{
	public ItemNotFoundException(String mesg) 
	{
		super(mesg);
	}
}
