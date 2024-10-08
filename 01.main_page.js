let list_arr = [];

for(let i = 0; i < 30; i++){
    list_arr.push({
        num: i,
        title: `글 제목이 들어갑니다. ${i}`,
        user: `user${i}`,
        date: '2024.09.30',
        count: i * 11, 
        txt_area: `글이 들어갑니다.${i}`
    })
}
// console.log(list_arr);

    let itemsPerPage = 5;
    let totalPages = Math.ceil(list_arr.length / itemsPerPage);    // 30 / 5 = 6페이지
    let currentPage = 1;
    let groupSize = 5;

    function renderPage(page){
        if(page < 1){
            page = 1;
        }
        if(page > totalPages){
            page = totalPages;
        }
        currentPage = page;

        let start = list_arr.length - (page * itemsPerPage);
        let end = start + itemsPerPage;

        let slicedArr = list_arr.slice(Math.max(0, start), Math.max(0 ,end));

        $('.main_board_bot').empty();

        for(let i = 0; i < slicedArr.length; i++){
            $('.main_board_bot').append(`
            <ul class="list">
                <li class="list_num">${slicedArr[i].num}</li>
                <li class="list_title">
                    <a href="./03.view.html?num=${slicedArr[i].num}&title=${encodeURIComponent(slicedArr[i].title)}&user=${encodeURIComponent(slicedArr[i].user)}&date=${slicedArr[i].date}&count=${slicedArr[i].count}&txt_area=${encodeURIComponent(slicedArr[i].txt_area)}">
                        ${slicedArr[i].title}
                    </a>

                </li>
                <li class="list_user">${slicedArr[i].user}</li>
                <li class="list_date">${slicedArr[i].date}</li>
                <li class="list_count">${slicedArr[i].count}</li>
            </ul>
                `)
        }
        renderPageButtons();

    }
    function renderPageButtons(){
        $('.num_btn_box').empty();

        let currentGroup = Math.ceil(currentPage / groupSize);
        let groupStartPage = (currentGroup - 1) * groupSize + 1;
        let groupEndPage = Math.min(groupStartPage + groupSize - 1, totalPages);

        // <<버튼
        $('.num_btn_box').append(`<div class="num_btn"><a href="#container" onclick="renderPage(1)">〈〈</a></div>`);

        // 〈 이전 그룹 버튼
        if (currentPage > 1) {
            $('.num_btn_box').append(`<div class="num_btn"><a href="#container" onclick="renderPage(${currentPage - 1})">〈</a></div>`);
        }

        // 페이지 번호 표시 (해당 그룹의 페이지 번호)
        for (let i = groupStartPage; i <= groupEndPage; i++) {
            let activeClass = (i == currentPage) ? 'active' : '';
            $('.num_btn_box').append(`<div class="num_btn number_btn ${activeClass}"><a href="#container" onclick="renderPage(${i})">${i}</a></div>`);
        }
        
        // 〉 다음 그룹 버튼
        if (currentPage < totalPages) {
        $('.num_btn_box').append(`<div class="num_btn"><a href="#container" onclick="renderPage(${currentPage + 1})">〉</a></div>`);
    }

        // 〉〉 마지막 버튼
        $('.num_btn_box').append(`<div class="num_btn"><a href="#container" onclick="renderPage(${totalPages})">〉〉</a></div>`);


    }


    function addPostToList(title, user, content) {
        // 리스트에 새 글 추가
        let currentDate = new Date().toLocaleDateString()
        let currentCount = 0; // 조회수 초기화
    
        // 새 글을 배열에 추가
        list_arr.push({
            num: list_arr.length,
            title: title,
            user: user,
            date: currentDate,
            count: currentCount,
            txt_area: content
        });
    
        // 전체 페이지 수 재계산
        totalPages = Math.ceil(list_arr.length / itemsPerPage);
    
        // 현재 페이지가 새로 추가된 글 때문에 초과하지 않도록 조정
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    
        // 페이지를 다시 렌더링
        renderPage(currentPage);
    }
    


    

    $(document).ready(function(){ 
        renderPage(1)

        // sessionStorage에서 데이터 가져오기
            let title = sessionStorage.getItem('title');
            let user = sessionStorage.getItem('user');
            let content = sessionStorage.getItem('content');

            // 데이터가 있으면 리스트에 추가
            if (title && user && content) {
                addPostToList(title, user, content);
                
                // 데이터 사용 후 제거
                sessionStorage.removeItem('title');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('content');
            }



        // // 아래 버튼들 누르면 색 바꿔주기
        // $('.num_btn').click(function(){
        //     $('.num_btn').removeClass('active')
        //     $(this).addClass('active')
            
            
        // })
        // // 숫자 버튼 누르면 동작
        // $('.number_btn').click(function(){
        //     console.log($(this).index() - 1)
        //     renderPage($(this).index() - 1)
        // })

        // const loggedInUser = localStorage.getItem('loggedInUser');

        // // 로그인한 경우 '글쓰기' 버튼 보이기
        // if (loggedInUser) {
        //     $('#writeBtn').show();  // '글쓰기' 버튼이 포함된 div를 보여줍니다.
        // }
        // else {
        //     $('#writeBtn').hide();  // 로그인하지 않은 경우 버튼 숨김
        // }

        // if (loggedInUser) {
        //     $('#writeBtn').css('display', 'block !important');  // '글쓰기' 버튼을 보이게 강제 적용
        // } else {
        //     $('#writeBtn').css('display', 'none');   // 로그인하지 않은 경우 버튼을 숨기기
        // }

        // window.onbeforeunload = function() {
        //     localStorage.removeItem('loggedInUser');  // 로컬 스토리지에서 로그인 정보 삭제
        // };


        // 모든 게시글의 내용을 로컬 스토리지에서 불러오기
        for (let i = 0; i < list_arr.length; i++) {
            const title = localStorage.getItem(`post_${i}_title`);
            const content = localStorage.getItem(`post_${i}_content`);
            
            if (title) { // 제목이 존재할 경우에만 표시
                list_arr[i].title = title; // 로컬 스토리지에서 가져온 제목으로 업데이트
                list_arr[i].txt_area = content || list_arr[i].txt_area; // 내용이 없다면 기존 내용 유지
            }
        }

    });