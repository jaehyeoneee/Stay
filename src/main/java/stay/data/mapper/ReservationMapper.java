package stay.data.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import stay.data.dto.ReservationDto;
import stay.data.dto.ResultMapDto;

@Mapper
public interface ReservationMapper {
	public void insertReservation(ReservationDto reDto);
	public List<ResultMapDto> selectNowGuestReservation(String guestId);
	public List<ResultMapDto> selectPreGuestReservation(String guestId);
	public List<ReservationDto> selectHostThreeReservation(String hostId);
	public List<ReservationDto> selectHostReservation(String hostId);
	public ReservationDto selectGuestOneReservation(HashMap<String, String> map);
	public ReservationDto selectHostOneReservation(HashMap<String, String> map);
	public String getRoomNo(String reserNo);
}