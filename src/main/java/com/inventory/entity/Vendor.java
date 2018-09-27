package com.inventory.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="vendors")
public class Vendor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="vendor_id", nullable = false, unique = true)
	private Long vendorId;
	
	@Column(name="vendor_name", nullable = false, unique = true)
	private String vendorName;
	
	@Column(name="address", nullable = false)
	private String address;
	
	@Column(name="contact_no", nullable = false)
	private String contactNo;
	
	@Column(name="status", nullable = false)
	private String status;
	
	@ManyToMany
	@JoinTable(name="item_vendor_assn", joinColumns=@JoinColumn(name="fk_vendor_id"), inverseJoinColumns=@JoinColumn(name="fk_item_id"))
	private List<Item> items = new ArrayList<Item>();

	public Long getVendorId() {
		return vendorId;
	}

	public void setVendorId(Long vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}
	
}
