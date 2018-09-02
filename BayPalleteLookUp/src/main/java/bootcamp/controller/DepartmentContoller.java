package bootcamp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bootcamp.model.Department;
import bootcamp.service.DepartmentService;

@CrossOrigin(origins="http://35.231.206.44:3000")
@RestController
public class DepartmentContoller {
	@Autowired
	DepartmentService departmentService;
	
	
	//@CrossOrigin
	@RequestMapping(value="/getDepartments", method=RequestMethod.GET)
	public List<Department> getDepartments(){
		try {
		return departmentService.getDepartments();
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
//	@CrossOrigin
	@RequestMapping(value="/getClasses", method=RequestMethod.GET)
	public List<Department> getClasses(){
		try{
		return departmentService.getClasses();
		} catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	//@CrossOrigin
	@RequestMapping(value="/getCategories", method=RequestMethod.GET)
	public List<Department> getCategories(){
		try {
		return departmentService.getCategories();
		} catch (Exception e){
			e.printStackTrace();
			return null;
		}
	}
}
