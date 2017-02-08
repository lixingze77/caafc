package com.sunyard.domain;

public class ApProcess {
	private String bussType;// 业务类型
	private String status;// 状态
	private String imageUploadTime;// 影像保存日期

	public String getBussType() {
		return bussType;
	}

	public void setBussType(String bussType) {
		this.bussType = bussType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getImageUploadTime() {
		return imageUploadTime;
	}

	public void setImageUploadTime(String imageUploadTime) {
		this.imageUploadTime = imageUploadTime;
	}

}
