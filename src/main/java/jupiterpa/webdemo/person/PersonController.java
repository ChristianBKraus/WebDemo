package jupiterpa.webdemo.person;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

@RequestMapping(path = PersonController.PATH)
@RestController
public class PersonController {
    public static final String PATH ="/api";
    
    @GetMapping("/person")
    public List<Person> getPersonen() { 
        System.out.println("GET Personen"); 
        List<Person> personen = new ArrayList<Person>();
        personen.add(new Person("Jonathan", "Kraus"));
        personen.add(new Person("Christian", "Kraus"));
    	return personen;
    }
    
    @PostMapping("/person")
    public void post(@RequestBody Person person) {
        System.out.println("POST " + person); 
    }

}
