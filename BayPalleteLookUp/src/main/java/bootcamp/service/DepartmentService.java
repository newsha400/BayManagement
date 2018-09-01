package bootcamp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bootcamp.dao.DepartmentDao;
import bootcamp.model.Department;

@Component
public class DepartmentService {
 
	@Autowired
 DepartmentDao departmentDao;
 
 public List<Department> getDepartments(){
	 return departmentDao.getDepartments();
 }
 public List<Department> getClasses(){
	 return departmentDao.getClasses();
 }
 public List<Department> getCategories(){
	 return departmentDao.getCategories();
 }
	
}
