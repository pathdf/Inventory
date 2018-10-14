<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
  <!-- Modal -->
  <div class="modal fade" id="alertPopup" role="dialog" tabindex='-1'>
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 id="alertTitle"class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <p id="alertMessage"></p>
        </div>
        <div class="modal-footer">
          <button id="alertOkButton" type="button" class="btn btn-default" data-dismiss="modal"></button>
        </div>
      </div>
    </div>
  </div>
  
 <div class="modal fade" id="confirmPopup" role="dialog" tabindex='-1'>
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 id="confirmTitle"class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <p id="confirmMessage"></p>
        </div>
        <div class="modal-footer">
          <button id="confirmOkButton" type="button" class="btn btn-default" data-dismiss="modal"></button>
          <button id="confirmCancelButton" type="button" class="btn btn-default" data-dismiss="modal"></button>
        </div>
      </div>
    </div>
  </div> 