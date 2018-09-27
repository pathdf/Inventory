package com.inventory.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.inventory.entity.User;

@Repository
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private SessionFactory sessionFactory;

	public User findByUserName(String userName) {
		List<User> users = sessionFactory.getCurrentSession().createQuery("FROM User u Where u.username = ?").setParameter(0, userName).list();
		
		if(users != null){
			return users.get(0);
		}
		return null;
	}

	/*public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
*/	
	

}
