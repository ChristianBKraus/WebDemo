package jupiterpa.webdemo;

import org.springframework.web.bind.annotation.*;

@RequestMapping(path = DemoController.PATH)
@RestController
public class DemoController {
    public static final String PATH ="/demo";
    
    @GetMapping("/test/{name}")
    public String get(@PathVariable String name) { 
        System.out.println("GET Hello " + name); 
    	return "Hello " + name;
    }
    
    @PostMapping("/test/{name}")
    public void post(@PathVariable String name) {
        System.out.println("POST Hello " + name); 
    }

}
