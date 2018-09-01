package com.baymanager.baycontroller;

import com.baymanager.bays.Bays;
import com.baymanager.baydao.BayDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BayController {
    @Autowired
    private BayDAO bayDao;

    @RequestMapping("/")
    public @ResponseBody Iterable<Bays> getBay() {
        return bayDao.getBays();
    }
}
