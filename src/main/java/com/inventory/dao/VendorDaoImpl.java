package com.inventory.dao;

import java.util.List;

import org.hibernate.FetchMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.inventory.entity.Vendor;

@Repository
public class VendorDaoImpl implements VendorDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void saveVendor(Vendor vendor) {
		sessionFactory.getCurrentSession().save(vendor);
	}

	@Override
	public void updateVendor(Vendor vendor) {
		sessionFactory.getCurrentSession().update(vendor);
	}

	@Override
	public Vendor findVendor(Long id) {
		return (Vendor)sessionFactory.getCurrentSession().get(Vendor.class, id);
	}

	@Override
	public List<Vendor> findAllVendors() {
		return sessionFactory.getCurrentSession().createCriteria(Vendor.class).list();
	}

	@Override
	public Vendor findVendorByName(String name) {
		return (Vendor) sessionFactory.getCurrentSession()
				.createQuery("FROM Vendor v WHERE UPPER(v.vendorName) = UPPER(:vendorName)")
				.setParameter("vendorName", name).uniqueResult();
	}

	@Override
	public void delete(Vendor vendor) {
		sessionFactory.getCurrentSession().delete(vendor);		
	}
	
	@SuppressWarnings("deprecation")
	public List<Object[]> getAllVendorWithItems() {
		String HQL = "SELECT v.vendorId, v.vendorName, v.address, v.contactNo, i.itemId, i.itemName FROM Vendor v INNER JOIN v.items i";
		return sessionFactory.getCurrentSession().createQuery(HQL).list();
	}

	@SuppressWarnings("deprecation")
	public List<Object[]> getAllVendorWithItems(int from, int pageSize) {
		String HQL = "SELECT v.vendorId, v.vendorName, v.address, v.contactNo, i.itemId, i.itemName FROM Vendor v INNER JOIN v.items i order by v.vendorId asc";
		return sessionFactory.getCurrentSession().createQuery(HQL).setFirstResult(from).setMaxResults(pageSize).list();
	}
}
