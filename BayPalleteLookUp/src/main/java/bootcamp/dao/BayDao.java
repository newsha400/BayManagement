package bootcamp.dao;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import bootcamp.model.Bay;

import bootcamp.model.Palette;

@Component
public class BayDao {

	private final String GET_BAY_BY_ID = "SELECT * FROM Bay WHERE id = ?;";
	private final String ADD_BAY = "INSERT INTO Bay (width, length, height, dep, "
			+ "bayClass, category, masterbay, palette) VALUES ( ?, ?, ?, ?, ?, ?, ?, 0)";	
	private final String EDIT_BAY =  "UPDATE Bay SET width=?, length=?, height=?, dep=?, "
			+ "bayClass=?, category=?, masterbay=?, palette=? WHERE id = ?;";
	private final String DELETE_BAY ="DELETE FROM Bay where id=?;";
	private final String UNLINK_PALETTE = "UPDATE Bay SET palette = 0 WHERE ID = ?";
	private final String EMPTY_BAYS = "SELECT * FROM Bay WHERE palette = 0 "
			+ "AND dep = ? AND width>=? AND length>=? AND height>=? ORDER BY (length*height*width) ASC;";
	private final String EMPTY_BAYS_OTHER_DEPARTMENTS = "SELECT * FROM Bay WHERE palette = 0 "
			+ "AND width>=? AND length>=? AND height>=? ORDER BY (length*height*width) ASC;";


	
	@Autowired
	JdbcTemplate jdbctemplate;
	
	public Bay getBayById(int id) {
		java.lang.Object[] args = {id};
		List<Bay> bayList = jdbctemplate.query(GET_BAY_BY_ID, args, new BeanPropertyRowMapper<>(Bay.class));
		if(bayList.isEmpty()) {
			return new Bay();
		}
		return bayList.get(0);
		
	}
	
	public void addBay(Bay bay) {
		java.lang.Object[] args = {bay.getWidth(), bay.getLength(), bay.getHeight(), bay.getDep(), bay.getBayClass(), bay.getCategory(), bay.getMasterbay()};
		jdbctemplate.update(ADD_BAY, args);
	}
	
//	 "UPDATE Bay SET width=?, length=?, height=?, dep=?, bayClass=?, category=?, masterbay=?, palette=? WHERE id = ?;";
	public void editBay(Bay bay) {
		java.lang.Object[] args = {bay.getWidth(), bay.getLength(), bay.getHeight(), bay.getDep(), bay.getBayClass(), bay.getCategory(), bay.getMasterbay(), bay.getPalette(), bay.getId()};
		jdbctemplate.update(EDIT_BAY, args);		
	}
	
	public void deleteBay(int id) {
		Object[] args = {id};
		jdbctemplate.update(DELETE_BAY,args);
	}
	
	public void unlinkPalette(int id) {
		Object[] args = {id};
		jdbctemplate.update(UNLINK_PALETTE,args);
	}
	
	public List<Bay> emptyBays(Palette palette){
		Object[] args = {palette.getDep(),palette.getWidth(), palette.getLength(), palette.getHeight()};
		return jdbctemplate.query(EMPTY_BAYS, args, new BeanPropertyRowMapper<>(Bay.class));
	}
	
	public List<Bay> emptyBaysOtherDepartments(Palette palette){
		Object[] args = {palette.getWidth(), palette.getLength(), palette.getHeight()};
			return jdbctemplate.query(EMPTY_BAYS_OTHER_DEPARTMENTS,args, new BeanPropertyRowMapper<>(Bay.class));
	}
	

}
