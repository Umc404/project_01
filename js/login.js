function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
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
    college : 'eznecollege',
    major : 'AWS'
}

// Local Storage를 가져옴
const getInfo = getLocalStorage('joinInfomation');
console.log(getInfo.id);
document.getElementById("loginBtn").addEventListener('click',(event)=>{
    let loginId = document.getElementById("loginId").value;
    let loginPw = document.getElementById("loginPw").value;
    if (loginId == '' || loginPw == ''){
        alert("빈 칸 없이 입력해주세요.");
        event.preventDefault();
    }else if(loginId == 'admin'){
        Infomation.id = 'admin';
        Infomation.name = '관리자';
        setLocalStorage('loginInfomation', Infomation);
        alert('관리자 권한으로 로그인');
        location.href = "메인.html";
    }else if(loginId == getInfo.id && loginPw == getInfo.password){
        Infomation.id = loginId;
        Infomation.pw = loginPw;
        Infomation.name = getInfo.name;
        Infomation.email = getInfo.email;
        setLocalStorage('loginInfomation', Infomation);
        alert(`환영합니다! ${getInfo.name}님!`);
        location.href = "메인.html";
    }else{
        alert("회원정보가 없습니다.");
    }
});