package stay.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stay.data.dto.PayCardDto;
import stay.data.dto.ReceiveAccountDto;
import stay.data.mapper.CostMapper;

@Service
public class CostService {
	@Autowired
	CostMapper mapper;
	
	// 카드
	public void insertCard(PayCardDto cardDto) {
		mapper.insertCard(cardDto);
	}
	
	public List<PayCardDto> getAllCard(String id) {
		return mapper.getAllCard(id);
	}
	
	// 계좌
	public void insertAccount(ReceiveAccountDto receiveAccountDto) {
		mapper.insertAccount(receiveAccountDto);
	}
	
	public List<ReceiveAccountDto> getAllAccount(String id){
		return mapper.getAllAccount(id);
	}
}