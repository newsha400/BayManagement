package bootcamp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bootcamp.model.Bay;
import bootcamp.model.Message;
import bootcamp.service.BayService;


@RestController
public class BayController {
	
	@Autowired
	BayService bayService;

	@CrossOrigin
    @RequestMapping(value = "/addBay", method = RequestMethod.POST)
    public Message addBay(@RequestBody Bay bay) {
    	return bayService.addBay(bay);
    }
    
	@CrossOrigin
    @RequestMapping(value ="/getBayById", method = RequestMethod.GET)
    public Bay getBayById(@RequestParam("id") int id) {
    	return bayService.getBayById(id);
    }
    
	@CrossOrigin
    @RequestMapping(value ="/editBay", method = RequestMethod.POST)
    public Message editBay(@RequestBody Bay bay) {
    	return bayService.editBay(bay);
    }
    
	@CrossOrigin
    @RequestMapping(value ="/deleteBay", method = RequestMethod.DELETE) 
    public Message deleteBay(@RequestParam("id") int id) {
    	return bayService.deleteBay(id);
    }
    
	@CrossOrigin
    @RequestMapping(value="/getEmptyBays", method=RequestMethod.GET)
    public List<Bay> getEmptyBays(@RequestParam("id") int paletteId){
    	return bayService.getEmptyBays(paletteId);
    }
    
// A sample bay object in json:    
// {"id": "B1", "width": 34, "height": 34, "length": 34, "dep": "D1", "bayClass": "C1", "category": "CAT1", "masterbay": "MB1", "palette": "P1"}
    
}
