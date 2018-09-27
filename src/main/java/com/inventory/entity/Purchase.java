package com.inventory.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="purchase")
public class Purchase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="purchase_id", nullable = false, unique = true)
	private Long purchaseId;
	
	@OneToOne
	@JoinColumn(name="item_vendor_assn", nullable = false, unique = true)
	private ItemVendorAssn itemVendorAssn;
	
	@Column(name="quantity", nullable = false)
	private Long quantity;
	
	@Column(name="price_per_quantity", nullable = false)
	private Long pricePerQuantity;
	
	@Column(name="creation_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(name="modified_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;

	public Long getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(Long purchaseId) {
		this.purchaseId = purchaseId;
	}

	public ItemVendorAssn getItemVendorAssn() {
		return itemVendorAssn;
	}

	public void setItemVendorAssn(ItemVendorAssn itemVendorAssn) {
		this.itemVendorAssn = itemVendorAssn;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getPricePerQuantity() {
		return pricePerQuantity;
	}

	public void setPricePerQuantity(Long pricePerQuantity) {
		this.pricePerQuantity = pricePerQuantity;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	
}
