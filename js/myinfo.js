function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}
const getInfo = getLocalStorage('joinInfomation');

let username = document.getElementById("username");
let usernickname = document.getElementById("usernickname");
let useremail = document.getElementById("useremail");
let userphoneNumber = document.getElementById("userphoneNumber");
let userpostcode = document.getElementById("sample6_postcode");
let useraddress = document.getElementById("sample6_address");
let userdetailAddress = document.getElementById("sample6_detailAddress");
let userextraAddress = document.getElementById("sample6_extraAddress");
let userbirthY = document.getElementById("userbirthY");
let userbirthM = document.getElementById("userbirthM");
let userbirthD = document.getElementById("userbirthD");
let usercollege = document.getElementById("usercollege");
let usermajor = document.getElementById("usermajor");
console.log(getInfo.birthD)
username.value = getInfo.id;
usernickname.value = getInfo.name;
useremail.value = getInfo.email;
userphoneNumber.value = getInfo.phoneNumber;
userpostcode.value = getInfo.postcode;
useraddress.value = getInfo.address;
userdetailAddress.value = getInfo.detailaddress;
userextraAddress.value = getInfo.extraaddress;
userbirthY.value = getInfo.birthY;
userbirthM.value = getInfo.birthM;
userbirthD.value = getInfo.birthD;
usercollege.value = getInfo.college;
usermajor.value = getInfo.major;
