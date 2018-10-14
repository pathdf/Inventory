package com.inventory.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex {

	public static boolean isValidValue(String value, String regex){
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
		
	}
}
