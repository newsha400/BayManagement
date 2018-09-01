package bootcamp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import bootcamp.dao.BayDao;
import bootcamp.dao.MasterBayDao;
import bootcamp.dao.PaletteDao;
import bootcamp.model.Bay;
import bootcamp.model.MasterBay;
import bootcamp.model.Message;
import bootcamp.model.Palette;

@Component
public class BayService {

	@Autowired
	BayDao bayDao;
	
	@Autowired
	MasterBayDao masterBayDao;
	
	@Autowired
	PaletteDao paletteDao;
	
	private final Message tooWide = new Message("Bay too wide");
    
    public Message addBay(Bay bay) {
    	MasterBay masterBay = masterBayDao.getMasterbayById(bay.getMasterbay());
    	List<Bay> bayList = masterBay.getBayList();
    	int bayWidthSum=0;
    	for(Bay b: bayList) {
    		bayWidthSum += b.getWidth();
    	}
    	bayWidthSum += bay.getWidth();
    	if(bayWidthSum>masterBay.getWidth()) {
    		return tooWide;
    	}
    	bayDao.addBay(bay);
    	return new Message("Add successful");
    }
    
    public Bay getBayById(int id) {
    	return bayDao.getBayById(id);
    }
    
    public Message editBay(Bay bay) {
    	Message message = new Message("");
    	int bayCurrentWidth =   bayDao.getBayById(bay.getId()).getWidth();
    	System.out.println(bay.getMasterbay());
    	MasterBay masterBay = masterBayDao.getMasterbayById(bay.getMasterbay());
    	List<Bay> bayList = masterBay.getBayList();
    	int bayWidthSum=0;
    	for(Bay b: bayList) {
    		bayWidthSum += b.getWidth();
    	}
    	bayWidthSum -= bayCurrentWidth; 
    	bayWidthSum += bay.getWidth();
    	//sum of the width of bays should not be greater than the masterbay
    	if(bayWidthSum>masterBay.getWidth()) {
    		System.out.println("???????????");
    		System.out.println("we are in masterbay is smaller");
    		message = tooWide;
    	} 
    	//if bay is associated with a palette should not be smaller than the palette
    	else if(bay.getPalette()>0) {
    		System.out.println("???????????");
    		System.out.println("we are in palette check");
    		Palette palette = paletteDao.getPaletteById(bay.getPalette());
    				if(palette.getWidth()>bay.getWidth()) {
    					message = new Message("Bay width too small for palette P" + palette.getId());
    				}else if(palette.getLength()>bay.getLength()) {
    					message = new Message("Bay length too small for palette P" + palette.getId());
    				}else if(palette.getHeight()>bay.getHeight()) {
    					message =new Message("Bay height too small for palette P" + palette.getId());
    				}else {
    			    	bayDao.editBay(bay);
    			    	message = new Message("Edit successful");
    				}
    	} else {
    		System.out.println("???????????");
    		System.out.println("we are in else statement");
	    	bayDao.editBay(bay);
	    	message = new Message("Edit successful");
    	}
    	
    	return message;
    }

     
    public Message deleteBay(int id) {
    	Bay bay = bayDao.getBayById(id);
    	if(bay.getPalette() > 0) {
    		return new Message("Failed to delete! Unlink Palette P" + bay.getPalette());
    	}
    	bayDao.deleteBay(id);
    	return new Message("Delete successful");
    }
    
    public List<Bay> getEmptyBays(int id){
    	Palette palette = paletteDao.getPaletteById(id);
    	List<Bay> bayList = bayDao.emptyBays(palette);
    	for(Bay b: bayList) {
    		System.out.println("bay id is: " + b.getId());
    	}
    	System.out.println(bayList.isEmpty());
    	if(bayList.isEmpty()) {
    		return bayDao.emptyBaysOtherDepartments(palette);
    	}
    	return bayList;
    }
}

