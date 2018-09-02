package bootcamp.service;

import org.springframework.beans.factory.annotation.Autowired;


import bootcamp.dao.PaletteDao;
import bootcamp.model.Palette;

public class PaletteService {

	@Autowired
	PaletteDao paletteDao;
	
    public void addPalette(Palette palette) {
    	paletteDao.addPalette(palette);
    }
    
    public Palette getPaletteById(String id) {
    	return paletteDao.getPaletteById(id);
    }
    
    public void editPalette(Palette palette) {
    	paletteDao.editPalette(palette);
    }
    
    public void deletePalette(String id) {
    	paletteDao.deletePalette(id);
    }
	
}
