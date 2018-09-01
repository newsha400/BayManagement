package bootcamp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import bootcamp.model.Department;


@Component
public class DepartmentDao {

	private final String DEPARTMENTS = "SELECT dep as value from Bay UNION SELECT dep from palette order by value;";
	private final String CLASSES = "select bayClass as value from Bay UNION select paletteClass from palette order by value;";
	private final String CATEGOIES = "select category as value from Bay UNION select category from palette order by value;";
	
	
	@Autowired
	JdbcTemplate jdbctemplate;
	
	public List<Department> getDepartments(){
		return jdbctemplate.query(DEPARTMENTS, new BeanPropertyRowMapper<>(Department.class));
	}
	
	public List<Department> getClasses(){
		return jdbctemplate.query(CLASSES, new BeanPropertyRowMapper<>(Department.class));
	}
	
	public List<Department> getCategories(){
		return jdbctemplate.query(CATEGOIES, new BeanPropertyRowMapper<>(Department.class));
	}

}
