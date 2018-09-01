package bootcamp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bootcamp.dao.BayDao;
import bootcamp.dao.PaletteDao;
import bootcamp.model.Bay;
import bootcamp.model.DimensionMatch;
import bootcamp.model.Palette;

@Component
public class PaletteService {

	@Autowired
	PaletteDao paletteDao;
	
	@Autowired 
	BayDao bayDao;
		
    public int addPalette(Palette palette) {
		return paletteDao.addPalette(palette);
    }
    
    public Palette getPaletteById(int id) {
    	return paletteDao.getPaletteById(id);
    }
    
    public DimensionMatch editPalette(Palette palette) {
    	boolean dimensionMatch = false;    			
    	if(palette.getBay()!=0) {
	    	Bay bay = bayDao.getBayById(palette.getBay());
	    	if(bay.getWidth()<palette.getWidth() || bay.getHeight()<palette.getHeight() || bay.getLength() < palette.getLength()) {
	    		dimensionMatch = false;
	    	}else{
	    		dimensionMatch = paletteDao.editPalette(palette);
	    		bay.setPalette(palette.getId());
	    		bayDao.editBay(bay);
	    	}
    	}else {
    		dimensionMatch = paletteDao.editPalette(palette);
    	}
    	return new DimensionMatch(dimensionMatch);
    }
    
    public void deletePalette(int id) {
    	Palette palette = paletteDao.getPaletteById(id);
    	if(palette.getBay() > 0){
    		//remove the palette from bay table
    		bayDao.unlinkPalette(palette.getBay());
    	}
    	paletteDao.deletePalette(id);
    	
    }
    
    public void unlinkPalette(int id) {
    	int bayId = paletteDao.getPaletteById(id).getBay();
    	bayDao.unlinkPalette(bayId);
    	paletteDao.unlinkPlatte(id);
    }

	
}
