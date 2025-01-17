/*
$('#target_img').click(function (e) {
    document.signform.target_url.value = document.getElementById( 'target_img' ).src;
    e.preventDefault();
    $('#file').click();
}); 

function changeValue(obj){
    document.signform.submit();


}
*/

// 이미지 미리보기 출력
$(document).ready(function (e){
	$("input[type='file']").change(function(e){
		//div 내용 비워주기
		$('#pfmainimg').empty();

		var files = e.target.files;
		var arr =Array.prototype.slice.call(files);
      
		//업로드 가능 파일인지 체크
		for(var i=0;i<files.length;i++){
			if(!checkExtension(files[i].name,files[i].size)){
				return false;
			}
		}
      
		pfmainimg(arr);
	});//file change
    
	function checkExtension(fileName,fileSize){
		var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
		var maxSize = 20971520;  //20MB
      
		if(fileSize >= maxSize){
			alert('파일 사이즈 초과');
			
			$("input[type='file']").val("");  //파일 초기화
			return false;
		}
      
		if(regex.test(fileName)){
			alert('업로드 불가능한 파일이 있습니다.');
			$("input[type='file']").val("");  //파일 초기화
			return false;
		}
		
		return true;
	}
    
    function pfmainimg(arr){
		arr.forEach(function(f){
			// 파일명이 길면 파일명...으로 처리
	        var fileName = f.name;
	        if(fileName.length > 10){
				fileName = fileName.substring(0,7) + "...";
	        }
		        
	        // div에 이미지 추가
	        var str = '<div style="display: inline-flex; margin-bottom: 25px; list-style:none;';
	        str += 'border: 2px solid #d3dce6; border-radius: 7px; margin-right: 10px;"><li>';
		        
	        // 이미지 파일 미리보기
			if(f.type.match('image.*')){
				var reader = new FileReader(); // 파일을 읽기 위한 FileReader객체 생성
		          
				reader.onload = function (e) { // 파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
					str += '<img src="' + e.target.result + '" title="' + f.name + '"width=150 height=150/>';
					str += '</li></div>';
		           
	        		$(str).appendTo('#pfmainimg');
				}
			
				reader.readAsDataURL(f);
	    	} else{
				str += '<img src="/resources/img/fileImg.png" title="'+f.name+'"Awidth=150 height=150/>';
				$(str).appendTo('#pfmainimg');
			}
		});
    }
    
});


/*
function check_pw(){
            var pw = document.getElementById('pass').value;
            var SC = ["!","@","#","$","%"];
            var check_SC = 0;
 
            if(pw.length < 8 || pw.length>16){
                window.alert('비밀번호는 8글자 이상, 16글자 이하만 이용 가능합니다.(영문·특수문자 조합)');
                document.getElementById('pass').value='';
            }
            for(var i=0;i<SC.length;i++){
                if(pw.indexOf(SC[i]) != -1){
                    check_SC = 1;
                }
            }
            if(check_SC == 0){
                window.alert('!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.')
                document.getElementById('pass').value='';
            }
            if(document.getElementById('pass').value !='' && document.getElementById('pass_check').value!=''){
                if(document.getElementById('pass').value==document.getElementById('pass_check').value){
                    document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
                    document.getElementById('check').style.color='blue';
                }
                else{
                    document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
                    document.getElementById('check').style.color='red';
                }
            }
        }
*/

// 카카오 주소 API
// 본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function sample4_execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 참고 항목 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById("sample4_roadAddress").value = roadAddr;
			document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

			document.getElementById("sample4_engAddress").value = data.addressEnglish;
			
			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
			if (roadAddr !== '') {
				document.getElementById("sample4_extraAddress").value = extraRoadAddr;
			} else {
				document.getElementById("sample4_extraAddress").value = '';
			}

			var guideTextBox = document.getElementById("guide");
			// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
			if (data.autoRoadAddress) {
				var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
				guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
				guideTextBox.style.display = 'block';

			} else if (data.autoJibunAddress) {
				var expJibunAddr = data.autoJibunAddress;
				guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
				guideTextBox.style.display = 'block';
			} else {
				guideTextBox.innerHTML = '';
				guideTextBox.style.display = 'none';
			}
		}
	}).open();
};


//비밀번호 일치 확인
function checkPw(){

    var pw = document.getElementById('pw').value;
    var SC = ["!","@","#","$","%"];
    var check_SC = 0;
 
    if(pw.length < 6 || pw.length>16){
    	$('.glyphicon-ok-sign').css("display", "none");
        $('.pw_equal').css("display", "none");
        $('.glyphicon-remove-sign').css("display", "inline-block");
        $('.pw_not_equal').css("display", "none");
        $('.pw_not_length').css("display", "inline-block");
        $('.pw_not_sc').css("display", "none");
    } else{
    	$('.glyphicon-ok-sign').css("display", "none");
        $('.pw_equal').css("display", "none");
        $('.glyphicon-remove-sign').css("display", "none");
        $('.pw_not_equal').css("display", "none");
        $('.pw_not_length').css("display", "none");
        $('.pw_not_sc').css("display", "none");
    }
    
    
    for(var i=0;i<SC.length;i++){
        if(pw.indexOf(SC[i]) != -1){
            check_SC = 1;
        }
    }
    if(check_SC == 0){
    	$('.glyphicon-ok-sign').css("display", "none");
        $('.pw_equal').css("display", "none");
        $('.glyphicon-remove-sign').css("display", "inline-block");
        $('.pw_not_equal').css("display", "none");
        $('.pw_not_length').css("display", "none");
        $('.pw_not_sc').css("display", "inline-block");
    }

    
    if(document.getElementById('pw').value !='' && document.getElementById('pw2').value!=''){
        if(document.getElementById('pw').value==document.getElementById('pw2').value){
        	$('.glyphicon-ok-sign').css("display", "inline-block");
            $('.pw_equal').css("display", "inline-block");
            $('.glyphicon-remove-sign').css("display", "none");
        	$('.pw_not_equal').css("display", "none");
        	$('.pw_not_length').css("display", "none");
        	$('.pw_not_sc').css("display", "none");
        }
        else{
        	$('.glyphicon-ok-sign').css("display", "none");
            $('.pw_equal').css("display", "none");
            $('.glyphicon-remove-sign').css("display", "inline-block");
        	$('.pw_not_equal').css("display", "inline-block");
        	$('.pw_not_length').css("display", "none");
        	$('.pw_not_sc').css("display", "none");
        }
    } else if(document.getElementById('pw').value ==''){
    	$('.glyphicon-ok-sign').css("display", "none");
        $('.pw_equal').css("display", "none");
        $('.glyphicon-remove-sign').css("display", "none");
        $('.pw_not_equal').css("display", "none");
        $('.pw_not_length').css("display", "none");
        $('.pw_not_sc').css("display", "none");
    }
    
};


$("#photo").html("<img src='새로운애'>");
