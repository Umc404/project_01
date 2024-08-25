        function setLocalStorage(key, value){ localStorage.setItem(key,JSON.stringify(value)); } 
        function getLocalStorage(key){ return JSON.parse(localStorage.getItem(key)); }

        let myObj = getLocalStorage('loginInfomation');
        let myId = myObj.id;
        let loginOp = 'guest'

        if(myId == ''){
            loginOp = 'guest'
        }else if(myId.includes('admin')){
            loginOp = 'master'
        }else if(myId != ''){
            loginOp = 'user'
        }

        document.getElementById('loginText').addEventListener('click',(e)=>{
            e.preventDefault();
            if(document.getElementById('loginText').innerText == '로그인'){
                location.href = "login.html";
            }else if(document.getElementById('loginText').innerText == '로그아웃'){
                setLocalStorage('loginInfomation',{id : '',password : '', name : '', email : ''})
                location.href = "메인.html";
            }
        })        

        const profile = document.getElementById('profile');
        const loginText = document.getElementById('loginText');
        if(loginOp == 'user') {
            // 로그인 후 나타날 화면
            loginText.innerText = '로그아웃';
            document.getElementById('profile_id').innerText = myObj.id;
            document.getElementById('profile_name').innerText = myObj.name;

            document.getElementById('myprofile_logout').addEventListener('click',()=>{
            setLocalStorage('loginInfomation',{id : '',password : '', name : '', email : ''})
            location.reload();
        })
        }else if(loginOp == 'guest'){
            // 로그아웃 상태에서 나타날 화면
            loginText.innerText = '로그인';
            profile.innerHTML = `<h3 class="false_h3">커뮤니티 이용을 위해<br>로그인이 필요합니다!</h3><a href="login.html" class="false_a">로그인 하러 가기</a>`;
            document.getElementById('mapBox').innerHTML = '';

        }else if(loginOp == 'master'){
            // 관리자 권한 로그인 후 나타날 화면
            loginText.innerText = '로그아웃';     
            profile.innerHTML = `<h3 class="false_h3">관리자 권한으로<br>로그인했습니다.</h3>`;
            document.getElementById('mapBox').innerHTML = '';
        }
        
        function addCont() {                                                    // 요놈이 input
            const today = new Date();
            let a = document.getElementById('free_title').value;
            let b = document.getElementById('free_content').value;
            let c = today.toLocaleDateString();

            if (a === "" || (a === "" && b !== "")){
                alert('제목을 입력하세요');
                history.go(0);
                a = '';
                b = document.getElementById('free_content').value;
            }
            else if(b === "" || (a !== "" && b === "")) {
                alert('내용을 입력하세요');
                history.go(0);
                a = document.getElementById('free_title').value;
                b = '';
            }else {
                alert('등록이 완료되었습니다.');
                localStorage.setItem('ftitle',a);
                localStorage.setItem('fcontent',b);
                localStorage.setItem('fdate',c);
                localStorage.setItem('wName',myObj.name);
                
                location.href = "free_board.html";
            }
        }