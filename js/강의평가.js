// 페이지 로드 시 JSON 데이터 로드
window.onload = loadJsonData;

let jsonData = {}; //json 데이터 저장
// json 데이터 비동기 로드
async function loadJsonData() {
    try {
        let response = await fetch('../json/전국대학공개강의서비스정보_KOCW_표준데이터.json');
        if (!response.ok) {
            throw new Error('비정상적 응답');
        }
        jsonData = await response.json();
    } catch (error) {
        console.error('json로딩 에러:', error);
    }
}

// 검색 기능
function performSearch(query) {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 
    if (query) {
        let filteredRecords = jsonData.records.filter(record => {
            return Object.values(record).some(value =>
                value.toLowerCase().includes(query)
            );
        });

        if (filteredRecords.length > 0) {
            const resultsHtml = filteredRecords.map(record => {
                return `<a href="강의평가개요.html"><div class="result">${Object.entries(record).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join(', ')}</div></a>`;
            }).join('');
            resultsContainer.innerHTML = resultsHtml;
        } else {
            resultsContainer.innerHTML = '<div class="result">검색 결과가 없습니다.</div>';
        }
    }
}

// 검색 아이콘 클릭 시 검색 수행
document.getElementById('searchIcon').addEventListener('click', () => {
    let query = document.getElementById('searchInput').value;
    performSearch(query);
    
});

//Enter 키를 눌렀을 때도 검색 수행
document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        let query = document.getElementById('searchInput').value;
        performSearch(query);
    }
});
