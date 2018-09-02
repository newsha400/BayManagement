package bootcamp.controler;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bootcamp.model.MasterBay;
import bootcamp.model.Message;
import bootcamp.service.MasterBayService;

@RestController
public class MasterBayController {
	
	@Autowired
	MasterBayService masterBayService;
	
	//do we need this???
  @RequestMapping("/getMasterBayList")
  public List<MasterBay> getMasterBayList() {
  	return masterBayService.getMasterBayList();
  }
  
  //given masterbay ID return a masterbay object with it's dimentions and all the subbays listed.
  @RequestMapping(value = "/getMasterbayById", method = RequestMethod.GET   )
  public MasterBay getMasterbayById(@RequestParam("id") int id) {
	  return masterBayService.getMasterbayById(id);
  }
  
  @RequestMapping(value = "/addMasterBay", method=RequestMethod.POST)
  public void addMasterBay(@RequestBody MasterBay masterBay) {
	  masterBayService.addMasterBay(masterBay);
  }
  
  @RequestMapping(value = "/deleteMasterBay", method=RequestMethod.DELETE)
  public Message deleteMasterBay(@RequestParam("id") int id) {
	  return masterBayService.deleteMasterBay(id);
  }
  
  @RequestMapping(value = "/editMasterBay",method= RequestMethod.POST)
  public Message editMasterBay(@RequestBody MasterBay masterBay) {
	  return masterBayService.editMasterBay(masterBay);
  }
  
}
  
//  { "id": 1, "width": 12, "height": 12, "length": 34, "bayList":null}
