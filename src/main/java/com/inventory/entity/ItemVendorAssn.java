package com.inventory.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="item_vendor_assn")
public class ItemVendorAssn {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="item_vendor_assn_id", nullable = false, unique = true)
	private Long itemVendorAssnId;
	
	@Column(name="fk_item_id", nullable=false)
	private Long fkItemId;
	
	@Column(name="fk_vendor_id", nullable = false)
	private Long fkVendorId;

	public Long getItemVendorAssnId() {
		return itemVendorAssnId;
	}

	public void setItemVendorAssnId(Long itemVendorAssnId) {
		this.itemVendorAssnId = itemVendorAssnId;
	}

	public Long getFkItemId() {
		return fkItemId;
	}

	public void setFkItemId(Long fkItemId) {
		this.fkItemId = fkItemId;
	}

	public Long getFkVendorId() {
		return fkVendorId;
	}

	public void setFkVendorId(Long fkVendorId) {
		this.fkVendorId = fkVendorId;
	}
	
}
