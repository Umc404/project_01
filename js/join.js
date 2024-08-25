// 카카오 주소 api
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}

// 체크박스 모두 체크
function selectAll(selectAll)  {
    const checkboxes 
       = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked
    })
};

// 유효성 검사(아이디/비밀번호/비밀번호 확인)

// 아이디 입력창 정보
let elInputUsername = document.querySelector('#username');
// 아이디 성공 메세지 정보 가져오기
let elSuccessMessage = document.querySelector('.success-message');
// 실패한 메시지 정보 가져오기 (글자수 제한)
let elFailureMessage = document.querySelector('.failure-message');
// 실패한 메시지 정보 가져오기1 (영문 & 숫자)
let elFailureMessageOne = document.querySelector('.failure-message1');
// 비밀번호 입력창 정보
let elInputPassword = document.querySelector('#password');
// 비밀번호 확인 입력창 정보
let elInputPasswordRetype = document.querySelector('#password-retype');
// 비밀번호 성공 메시지 정보 가져오기
let elSuccessMessageOne = document.querySelector('.success-message1');
// 실패 메시지 정보 가져오기 (비밀번호 불일치)
let elMismatchMessage = document.querySelector('.mismatch-message');
// 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
let elFailureMessageTwo = document.querySelector('.failure-message2');

// 아이디 중복 확인의 조건(생성 가능한 아이디 유무)
let idChecking = false;
// 비밀번호 조건(생성 가능한 비밀번호)
let pwChecking = false;
// 비밀번호 확인 조건(비밀번호 확인 유무)
let pwrtChecking = false;
// 전화번호 인증번호 조건
let phoneChecking = false;
// 이메일 조건(입력 유무)
let emailChecking = false;
// 회원가입 조건(빈 칸 없는지 유무(성별, 입학연도 제외))
let joinChecking = false;
// 최종 회원가입(아이디 , 비밀번호, 비밀번호 확인, 회원가입 조건)
let joinTF = false; 

// 이름 입력창 정보
let elInputUserNinkname = document.querySelector('#usernickname');
// 이메일 입력창 정보
let elInputUseremail = document.querySelector('#useremail');
// 전화번호 입력창 정보
let elInputUserphoneNumber = document.querySelector('#userphoneNumber');
// 주소 입력창 정보
// 주소 1
let elInputUserpostcode = document.querySelector('#sample6_postcode');
// 주소 2
let elInputUseraddress = document.querySelector('#sample6_address');
// 주소 3
let elInputUserdetailAddress = document.querySelector('#sample6_detailAddress');
// 주소 4
let elInputUserextraAddress = document.querySelector('#sample6_extraAddress');
// 생년월일 입력창 정보
// 연도
let elInputUserbirthY = document.querySelector('#userbirthY');
// 월
let elInputUserbirthM = document.querySelector('#userbirthM');
// 일
let elInputUserbirthD = document.querySelector('#userbirthD');
// 대학교 이름 정보
let elInputUsercollege = document.querySelector("#usercollege");
// 학과 / 학부 정보
let elInputUsermajor = document.querySelector("#usermajor");

// 아이디 글자 수 제한
function idLength(value) {
    return value.length >= 4 && value.length <= 12
}

// 아이디 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

// 비밀번호 8글자이상, 영문, 숫자, 특수문자 사용
function strongPassword (str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// 비밀번호 확인
function isMatch (password1, password2) {
    return password1 === password2;
}

// 회원가입 조건 확인(빈 칸 유무 (성별, 입학연도 제외))
function joinCheck() {
    if(elInputUsername.value == ''){ // 아이디
        joinChecking = false;
        console.log(1);
    }else if(elInputPassword.value == ''){ // 비밀번호
        joinChecking = false;
        console.log(2);
    }else if(elInputPasswordRetype.value == ''){ // 비밀번호 확인
        joinChecking = false;
        console.log(3);
    }else if(elInputUserNinkname.value == ''){ // 이름
        joinChecking = false;
        console.log(4);
    }else if(elInputUseremail.value == ''){ // 이메일
        joinChecking = false;
        console.log(5);
    }else if(elInputUserphoneNumber.value == ''){ // 전화번호
        joinChecking = false;
        console.log(6);
    }else if(elInputUserpostcode.value == ''){ // 주소 우편번호
        joinChecking = false;
        console.log(7);
    }else if(elInputUseraddress.value == ''){ // 주소
        joinChecking = false;
        console.log(8);
    }else if(elInputUserdetailAddress.value == ''){ // 주소 상세주소
        joinChecking = false;
        console.log(9);
    }else if(elInputUserextraAddress.value == ''){ // 주소 참고항목
        joinChecking = false;
        console.log(10);
    }else if(elInputUsercollege.value == ''){ // 대학교
        joinChecking = false;
        console.log(11);
    }else if(elInputUsermajor.value == ''){ // 학과 / 학부
        joinChecking = false;
        console.log(12);
    }else{
        joinChecking = true;
    }
    // 최종 회원가입 조건
    if(joinChecking == true && pwChecking == true && pwrtChecking == true && idChecking == true && phoneChecking == true && emailChecking == true){
        joinTF = true;
    }else{
        joinTF = false;
    }
}

function setLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}

const Infomation = {
    id : 'ezen1234',
    password : 'qwe123!@',
    name : '홍길동',
    email : 'wws@1235',
    phoneNumber : '010-1234-5678',
    postcode : '01234',
    address : 'ezen',
    detailaddress : '12층',
    extraaddress : 'Academy',
    birthY : '2005',
    birthM : '01',
    birthD : '01',
    college : 'eznecollege',
    major : 'AWS'
}
function loginStorage() {
    Infomation.id = elInputUsername.value;
    Infomation.password = elInputPassword.value;
    Infomation.name = elInputUserNinkname.value;
    Infomation.email = elInputUseremail.value;
    Infomation.phoneNumber = elInputUserphoneNumber.value;
    Infomation.postcode = elInputUserpostcode.value;
    Infomation.detailaddress = elInputUserdetailAddress.value;
    Infomation.extraaddress = elInputUserextraAddress.value;
    Infomation.birthY = elInputUserbirthY.value;
    Infomation.birthM = elInputUserbirthM.value;
    Infomation.birthD = elInputUserbirthD.value;
    Infomation.college = elInputUsercollege.value;
    Infomation.major = elInputUsermajor.value;
    setLocalStorage('joinInfomation', Infomation);
}

elInputUsername.onkeyup = function () {
    // 값을 입력한 경우
    if (elInputUsername.value.length !== 0) {
      // 영어 또는 숫자 외의 값을 입력했을 경우
      if(onlyNumberAndEnglish(elInputUsername.value) === false) {
        elSuccessMessage.classList.add('hide');
        elFailureMessage.classList.add('hide');
        elFailureMessageOne.classList.remove('hide'); // 영어 또는 숫자만 가능합니다
        idChecking = false;   // 중복 확인 조건
      }
      // 글자 수가 4~12글자가 아닐 경우
      else if(idLength(elInputUsername.value) === false) {
        elSuccessMessage.classList.add('hide'); // 성공 메시지가 가려져야 함
        elFailureMessage.classList.remove('hide'); // 아이디는 4~12글자이어야 합니다
        elFailureMessageOne.classList.add('hide'); // 실패 메시지2가 가려져야 함
        idChecking = false;
    }
    // 조건을 모두 만족할 경우
    else if(idLength(elInputUsername.value) || onlyNumberAndEnglish(elInputUsername.value)) {
        elSuccessMessage.classList.remove('hide'); // 사용할 수 있는 아이디입니다
        elFailureMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
        elFailureMessageOne.classList.add('hide'); // 실패 메시지2가 가려져야 함
        idChecking = true;
    }
}
// 값을 입력하지 않은 경우 (지웠을 때)
// 모든 메시지를 가린다.
else {
    elSuccessMessage.classList.add('hide');
    elFailureMessage.classList.add('hide');
    elFailureMessageOne.classList.add('hide');
    idChecking = false;
    }
}
elInputPassword.onkeyup = function () {

    // console.log(elInputPassword.value);
    // 값을 입력한 경우
    if (elInputPassword.value.length !== 0) {
    if(strongPassword(elInputPassword.value)) {
        elSuccessMessageOne.classList.remove('hide'); // 성공 메시지가 보여야 함
        elFailureMessageTwo.classList.add('hide'); // 실패 메시지가 가려져야 함
        pwChecking = true;
    }
    else {
        elSuccessMessageOne.classList.add('hide'); // 성공 메시지가 가려져야 함
        elFailureMessageTwo.classList.remove('hide'); // 실패 메시지가 보여야 함
        pwChecking = false;
    }
    }else {
        // 값을 입력하지 않은 경우 (지웠을 때)
        // 모든 메시지를 가린다.
        elFailureMessageTwo.classList.add('hide');
        pwChecking = false;
    }
};
elInputPasswordRetype.onkeyup = function () {

    // console.log(elInputPasswordRetype.value);
    if (elInputPasswordRetype.value.length !== 0) {
        if(isMatch(elInputPassword.value, elInputPasswordRetype.value)) {
            elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
            pwrtChecking = true;
        }else {
            elMismatchMessage.classList.remove('hide'); // 실패 메시지가 보여야 함      
            pwrtChecking = false;
        }
    }else {
        elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
        pwrtChecking = false;
    }
};

// Btn
document.querySelector(".idCheckBtn").addEventListener('click', ()=>{
    console.log(typeof elInputUsername);
    if(elInputUsername.value == ''){
        alert("아이디를 입력해주세요.");
    }else if(idChecking == true){
        alert("사용 가능한 아이디입니다.");
    }else{
        alert("사용 가능한 아이디가 아닙니다.");
    }
});
document.querySelector(".signup").addEventListener("click", ()=>{
    joinCheck();
    if(joinTF){
        alert("회원가입이 되었습니다.");
        loginStorage();
        location.href = "login.html";
    }else{
        alert("필수 항목들을 제대로 확인해주세요.");
    }
});

document.querySelector(".emailCheckBtn").addEventListener('click', ()=>{
    if(elInputUseremail.value == ''){
        alert('이메일을 입력해주세요.');
    }else{
        emailChecking = true;
        alert('사용 가능한 이메일입니다.');
    }
});

document.querySelector(".phoneCheckBtn").addEventListener('click', ()=>{
    let phoneStr = '';
    if(elInputUserphoneNumber.value == ''){
        alert('전화번호를 입력해주세요.');
    }else{
        for(let i = 0; i <= 5; i++){
            phoneStr += `${Math.floor(Math.random()*9+1)}`;
        }
        phoneChecking = true;
        alert(`인증번호는 ${phoneStr}입니다.`);
    }
});