package com.inventory.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inventory.dao.UserDao;
import com.inventory.entity.UserRole;

@Service("userDetailsService")
@Transactional(readOnly=true)
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserDao userDao;

	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		com.inventory.entity.User user = null;
		try{
			 user = userDao.findByUserName(userName);
			
		}catch(Exception e){
			e.printStackTrace();
		}
	     List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	     for(UserRole userRole : user.getUserRoles()){
	    	 authorities.add(new SimpleGrantedAuthority(userRole.getUserRole()));
	     }
	     
		return new User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, authorities);
	}

/*	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}*/

	

}
