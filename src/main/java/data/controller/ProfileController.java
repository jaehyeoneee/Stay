package data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {
	
	@GetMapping("/profileform")
	public String profileForm() {
		return "/member/profileForm";
	}
	
}