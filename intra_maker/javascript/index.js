//megaphone 슬라이드 코드
$(document).ready(function () {
  $('.slide_text').marquee({
    direction: 'up',
    speed: 220,
    pauseOnHover: true,
    startVisible: true,  // 첫 번째 아이템을 기본으로 보이게 설정
    duplicated: true  // 롤링이 끝난 후 처음으로 돌아갑니다.
  });
});

const productData = {
  "근조화환": {
      product_2: '100000',
      product_3: '지역에 따라 자동적용',
      product_4: "삼가 故人의 冥福을 빕니다",
      product_5: "★현장사진 꼭 부탁드립니다"
  },
  "축하화환": {
      product_2: '100000',
      product_3: '35000',
      product_4: "",
      product_5: "★현장사진 꼭 부탁드립니다"
  }
};

function sel_text_1(button_text) {
  let product_1_input = document.querySelector(".product_1");
  let product_2_input = document.querySelector(".product_2");
  let product_3_input = document.querySelector(".product_3");
  let product_4_input = document.querySelector(".product_4");
  let product_5_input = document.querySelector(".product_5");

  if (productData.hasOwnProperty(button_text)) {
      product_1_input.value = button_text;
      product_2_input.value = productData[button_text].product_2;
      product_3_input.value = productData[button_text].product_3;
      product_4_input.value = productData[button_text].product_4;
      product_5_input.value = productData[button_text].product_5;
  } else {
      product_1_input.value = button_text;
      product_2_input.value = "";
      product_3_input.value = "";
      product_4_input.value = "";
      product_5_input.value = "";
  }
}

function sel_text_2(button_text) {
  document.querySelector(".product_2").value = button_text;
  document.querySelector(".product_3").value = button_text * 0.8;
}

function sel_text_3(button_text) {
  document.querySelector(".product_3").value = button_text;
}

function sel_text_4(button_text) {
  document.querySelector(".product_4").value = button_text;
}

function sel_text_5() {
  document.querySelector(".product_5").value = "★현장사진 꼭 부탁드립니다";
}


function getselectvalue() {
  document.querySelector(".delivery_type").style.display = (document.querySelector(".delivery_time").value === "A") ? 'none' : 'block';
} 




// 08:30~19:00 에는 "현재 운영 중"을 표시하고, 그 외에는 "운영 하지 않음"을 표시
function setMegaphoneStatus(selector) {
  const krTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간과 UTC의 차이 (9시간)
  const openingTime = 8 * 60 * 60 * 1000 + 30 * 60 * 1000; // 08:30 AM UTC
  const closingTime = 19 * 60 * 60 * 1000; // 07:00 PM UTC

  const curr = new Date();
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const krDate = new Date(utc + krTimeDiff);

  const isOpen = krDate.getHours() * 60 + krDate.getMinutes() >= 8 * 60 + 30 && krDate.getHours() * 60 + krDate.getMinutes() < 19 * 60; // 현재 시간이 8:30부터 19:00 사이에 있는지 확인
  const statusText = isOpen ? "현재 운영 중" : "현재 미운영";

  const statusElement = document.querySelector(selector);
  statusElement.textContent = statusText;


  if (!isOpen) {
      statusElement.style.color = "red";  // "운영 하지 않음"일 때 텍스트에 빨간색 적용
  } else {
      statusElement.style.color = ""; // 다시 초기화 (운영 중에는 색상을 기본값으로)
  }
}

// 지정된 시간대에 따라 megaphone의 운영 상태를 설정
if (!!document.querySelector(".intro_center_megaphone_in2")) {
  setMegaphoneStatus(".intro_center_megaphone_in2");
}





// 공지사항에 들어가는 날짜를 실시간으로 변경
function setMegaphoneDate(selector) {
  const curr = new Date();
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  window.onload = function megaphone_autodate() {
      const krDate = new Date(utc + KR_TIME_DIFF);
      const krDateString = krDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
      });

      document.querySelector(selector).textContent = krDateString + " ";
  };
}

if (!!document.querySelector(".sendorder_megaphone_date")) {
  setMegaphoneDate(".sendorder_megaphone_date");
} else if (!!document.querySelector(".intro_center_megaphone2_date")) {
  setMegaphoneDate(".intro_center_megaphone2_date");
}


// currentDate 라는 아이디가 있다면 실행
if(!!document.getElementById('currentDate') == true){
document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10)
}




function area_price() {
  const prices = ["35000", "40000", "50000", "60000"];
  const p1Value = document.querySelector(".product_1").value;
  const p3Input = document.querySelector(".product_3");
  const setArea = document.querySelector("#sendorder_address_placeholder").value;

  if (p1Value === "근조화환" || p1Value === "축하화환") {

    if (setArea.includes('순천')) {
      applyPrice(prices[1], "순천");

    } else if (setArea.includes('광양')) {
      applyPrice(prices[2], "광양");

    } else if (setArea.includes('광역시')) {
      applyPrice(prices[0], "광역시");

    } else if (setArea.includes('의성')) {
      applyPrice(prices[2], "의성");
    }
  }

  function applyPrice(price, area) {
    p3Input.value = price;
    console.log(`${area}은 ${price}원 지역입니다`);
  }
}


//전남 순천시 신월길 93 마블랑제리93 2층 7080
//전남 광양시 시청로 33 광양부시장 김기홍


function openPopup() {
  // 팝업 창 열기
  window.open('./popup/index.html', 'popup', 'width=700,height=700');
}