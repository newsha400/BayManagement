package bootcamp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import bootcamp.dao.MasterBayDao;
import bootcamp.dao.PaletteDao;
import bootcamp.model.Bay;
import bootcamp.model.MasterBay;
import bootcamp.model.Message;
import bootcamp.model.Palette;

@Component
public class MasterBayService {

	@Autowired
	MasterBayDao masterBayDao;
	
	@Autowired
	BayService bayService;
	
	@Autowired
	PaletteDao paletteDao;
	

  public List<MasterBay> getMasterBayList() {
  	return masterBayDao.getMasterBayList();
  }
  
  public MasterBay getMasterbayById(int id) {
	  return masterBayDao.getMasterbayById(id);
  }
  
  public int addMasterBay(MasterBay masterBay) {
	  return masterBayDao.addMasterBay(masterBay);
  }
  
  public Message deleteMasterBay(int id) {
	  MasterBay masterBay = masterBayDao.getMasterbayById(id);
	  List<Bay> bayList = masterBay.getBayList();
	  for(Bay b: bayList) {
		  if(b.getPalette()>0) {
			  return new Message("Master bay is associated with palette P" + b.getPalette());
		  }
	  }
	  
	  masterBayDao.deleteMasterBay(id);
	  return new Message("Delete successful");
  }
  
  public Message editMasterBay(MasterBay masterBay) {
	  MasterBay masterBayWithBayList = masterBayDao.getMasterbayById(masterBay.getId());
	  List<Bay> bayList = masterBayWithBayList.getBayList();
	  int bayWidthSum = 0;
	  for(Bay b: bayList) {
		  bayWidthSum += b.getWidth();
		  //if any of the bays are associated with a palette you cannot change the length and height of the masterbay smaller than the palette height and length
		  //check if any of the bays have palettes in them.
		  //if have a palette then check length and height
		  if(b.getPalette()>0) {
			  Palette palette = paletteDao.getPaletteById(b.getPalette());
			  System.out.println("palette id is: " + palette.getId() + " palette length is: " + palette.getLength());
			  if(palette.getLength()>masterBay.getLength()) {
				  return new Message("Length too small for palette P" + palette.getId());
			  }else if(palette.getHeight()>masterBay.getHeight()) {
				  return new Message("Height too small for palette P" + palette.getId());
			  }
		  }
	  }
	  //masterbay width should not be smaller than sum of the width of the bays in it
	  if(bayWidthSum>masterBay.getWidth()) {
		  return new Message("Width too small");
	  }
	  masterBayDao.editMasterBay(masterBay);
	  //everytime the masterbay is updated the length and height of the bays should update too
	  for(Bay b: bayList) {
		  b.setHeight(masterBay.getHeight());
		  b.setLength(masterBay.getLength());
		  bayService.editBay(b);
	  }
	  return new Message("edit successful");
  }
	
}
