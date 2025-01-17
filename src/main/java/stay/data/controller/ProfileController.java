package stay.data.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import stay.data.dto.MemberDto;
import stay.data.mapper.MemberMapper;
import stay.data.service.MemberService;

@Controller
@RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	MemberMapper mapper;
	
	@Autowired
	MemberService memberService;
	
	@GetMapping("/profileform")
	public ModelAndView profile1(HttpSession session) {
		ModelAndView mview = new ModelAndView();
		
		String myid = (String)session.getAttribute("myid");
		
		MemberDto memberDto = memberService.getMember(myid);
		
		memberDto.setId(myid);
		
		mview.addObject("memberDto", memberDto);
		
		mview.setViewName("/member/profileForm");
		
		return mview;
	}
	
	@GetMapping("/updatelikes")
	@ResponseBody
	public HashMap<String, Integer> updatelikes(
			@RequestParam String id
			){
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		mapper.updatelikes(id);
		int likes = mapper.getMember(id).getLikes();//여기가 널이라는거자
		map.put("likes", likes);
		
		return map;
		
	}
	
}