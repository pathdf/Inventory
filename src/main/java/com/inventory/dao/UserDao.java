package com.inventory.dao;

import com.inventory.entity.User;

public interface UserDao {

	User findByUserName(String userName); 
}
