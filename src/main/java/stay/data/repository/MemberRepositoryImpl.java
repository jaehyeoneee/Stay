package stay.data.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

public class MemberRepositoryImpl implements MemberRepository {

	 @Autowired
	    private SqlSession sqlSession;

	    private static final String NAMESPACE = "data.mapper.MemberMapper"; 

	    // 아이디 중복 체크
	    @Override
	    public int idCheck(String id) {
	        int cnt = sqlSession.selectOne(NAMESPACE+".idCheck", id);
	        return cnt;
	    }
}
