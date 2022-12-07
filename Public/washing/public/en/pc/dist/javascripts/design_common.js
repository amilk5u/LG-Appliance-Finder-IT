"use strict";
let idx = 0; // step idx
let stepCount = []; // 스텝별 카운트
let selectedParameters = []; // 사용자 선택한 key,value 
let matchingProducts = []; // 스텝별 매칭된 제품
let currentStep; // 현재 스텝 데이터 
let selectedProduct; // 셀렉된 제품 데이터 
let interactiveClass; // 인터렉티브 매칭 class
let screenConfigData; // step1 에서 제품 선택된 html data
let product; // 제품 종류 (washer only or washer and dryer)

// 태깅 관련 변수
let stageIdx; // step
let stageDesc; // link-name 
let stageCont; // 누적 선택한 옵션 컨텐츠 
let imgPath = ''; // desktop / mobile 이미지 경로 구분

if (window.innerWidth >= 1024) {
	imgPath = './images/pc/';
	imgPreload();
} else {
	imgPath = './images/';
}

/* Washer Only 변수 정의 start -------------------------------*/
let wm_capa_8 = 'wm_capa_8';
let wm_capa_9 = 'wm_capa_9';
let wm_capa_10_5 = 'wm_capa_10_5';
let wm_capa_12 = 'wm_capa_12';

let wm_under_60cm = 'wm_under_60cm';
let wm_more_60cm = 'wm_more_60cm';

let wm_energy_a = 'wm_energy_a';
let wm_energy_b = 'wm_energy_b';
let wm_energy_c = 'wm_energy_c';
let wm_energy_d = 'wm_energy_d';

let wm_thinq_wifi = 'wm_thinq_wifi';

let wm_ai_dd_intelligent_system = 'wm_ai_dd_intelligent_system';
let wm_turbowash = 'wm_turbowash';
let wm_steam = 'wm_steam';
let wm_turbowash_360 = 'FVwm_turbowash_36065324097';
let wm_ezDispense = 'wm_ezDispense';

let wm_clr_white = 'wm_clr_white';
let wm_clr_graphite = 'wm_clr_graphite';
let wm_clr_black = 'wm_clr_black';
/* Washer Only 변수 정의 end -------------------------------*/

/* Washer and Dryer 변수 정의 start -------------------------------*/
let wd_capa_8 = 'wd_capa_8';
let wd_capa_9 = 'wd_capa_9';
let wd_capa_10_5 = 'wd_capa_10_5';
let wd_capa_12 = 'wd_capa_12';

let wd_under_60cm = 'wd_under_60cm';
let wd_more_60cm = 'wd_more_60cm';

let wd_energy_a = 'wd_energy_a';
let wd_energy_e = 'wd_energy_e';

let wd_thinq_wifi = 'wd_thinq_wifi';

let wd_ai_dd_intelligent_system = 'wd_ai_dd_intelligent_system';
let wd_turbowash = 'wd_turbowash';
let wd_steam = 'wd_steam';
let wd_turbowash_360 = 'wd_turbowash_360';
let wd_ezDispense = 'wd_ezDispense';

let wd_clr_white = 'wd_clr_white';
let wd_clr_graphite = 'wd_clr_graphite';
let wd_clr_black = 'wd_clr_black';
/* Washer and Dryer 변수 정의 end -------------------------------*/


/* product key, value start ---------------------------------------------------------- */
// Washer Only
const productWasherOnly = {
	'F4V1112BTSA': { // 1
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_black
	},
	'F4V1112WTSA': { // 2
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F6V1110BTSA': { // 3
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_black
	},
	'F6V1110WTSA': { // 4
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'FH4G1BCS2': { // 5
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V1012BTSE': { // 6
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_black
	},
	'F4V1012WTSE': { // 7
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_white
	},
	'F6V1010BTSE': { // 8
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_black
	},
	'F6V1010WTSE': { // 9
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_white
	},
	'F6V1009BTSE': { // 10
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_black
	},
	'F6V1009WTSE': { // 11
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_white
	},
	'F6V910BTSA': { // 12
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_black
	},
	'F6V910WTSA': { // 13
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F6V909BTSA': { // 14
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_black
	},
	'F6V909WTSA': { // 15
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F4V909WTSA': { // 16
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360, wm_ezDispense],
		FT06509998: wm_clr_black
	},
	'F4V910BTSE': { // 17
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_black
	},
	'F4V910WTSE': { // 18
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_white
	},
	'F4V909BTSE': { // 19
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_black
	},
	'F4V909WTSE': { // 20
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_turbowash_360],
		FT06509998: wm_clr_white
	},
	'F4V710STSA': { // 21
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F4V710WTSA': { // 22
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F4V709STSA': { // 23
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_ezDispense],
		FT06509998: wm_clr_graphite
	},
	'F4V709WTSA': { // 24
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam, wm_ezDispense],
		FT06509998: wm_clr_white
	},
	'F4V712STSE': { // 25
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V712WTSE': { // 26
		FT05036741: wm_capa_12,
		FT06510004: wm_more_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V710STSE': { // 27
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V710WTSE': { // 28
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V709STSE': { // 29
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V709WTSE': { // 30
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V510SSE': { // 31
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V510WSE': { // 32
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V509SSE': { // 33
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V509WSE': { // 34
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_d,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V310SSE': { // 35
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V310WSE': { // 36
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V309SSE': { // 37
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V309WSE': { // 38
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system, wm_steam],
		FT06509998: wm_clr_white
	},
	'F4V310SNE': { // 39
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_graphite
	},
	'FAV310SNE': { // 40
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_graphite
	},
	'F4V310WNE': { // 41
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'FAV310WNE': { // 42
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'F4V309SNE': { // 43
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_graphite
	},
	'FAV309SNE': { // 44
		Capacity: wm_capa_9,
		Depth: wm_under_60cm,
		EnergyGrade: wm_energy_b,
		Smart: '',
		Feature: [wm_ai_dd_intelligent_system],
		Color: wm_clr_graphite
	},
	'F4V309WNE': { // 45
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'FAV309WNE': { // 46
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'F4V309WNW': { // 47
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'F4V308WNW': { // 48
		FT05036741: wm_capa_8,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_c,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'F4MT08WE': { // 49
		FT05036741: wm_capa_8,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_d,
		FT06511874: '',
		FT05036362: '',
		FT06509998: wm_clr_white
	},



	//신제품 220830
	'F2T208WSE': { // 50
		FT05036741: wm_capa_8,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: '',
		FT06509998: wm_clr_white
	},
	'F4V310SNEH': { // 51
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_graphite
	},
	'F4V710STSH': { // 52
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_graphite
	},
	'F4V310WNEH': { // 53
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'F4V710WTSH': { // 54
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_a,
		FT06511874: wm_thinq_wifi,
		FT05036362: [wm_ai_dd_intelligent_system, wm_turbowash, wm_steam],
		FT06509998: wm_clr_white
	},
	'FCV309WNE': { // 55
		FT05036741: wm_capa_9,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	},
	'FCV310WNE': { // 56
		FT05036741: wm_capa_10_5,
		FT06510004: wm_under_60cm,
		FT06513792: wm_energy_b,
		FT06511874: '',
		FT05036362: [wm_ai_dd_intelligent_system],
		FT06509998: wm_clr_white
	}
}

// Washer and Dryer
const productWasherAndDryer = {
	'FWV1128BTSA': { // 1
		Capacity: wd_capa_12,
		FT06510023: wd_more_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360, wd_ezDispense],
		FT06510177: wd_clr_black
	},
	'FWV1128WTSA': { // 2
		Capacity: wd_capa_12,
		FT06510023: wd_more_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360, wd_ezDispense],
		FT06510177: wd_clr_white
	},
	'FWV1117BTSA': { // 3
		Capacity: wd_capa_10_5,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360, wd_ezDispense],
		FT06510177: wd_clr_black
	},
	'FWV1117WTSA': { // 4
		Capacity: wd_capa_10_5,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360, wd_ezDispense],
		FT06510177: wd_clr_white
	},
	'FWV917BTSE': { // 5
		Capacity: wd_capa_10_5,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360],
		FT06510177: wd_clr_black
	},
	'FWV917WTSE': { // 6
		Capacity: wd_capa_10_5,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_turbowash_360],
		FT06510177: wd_clr_white
	},
	'FWV796STSE': { // 7
		Capacity: wd_capa_9,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam],
		FT06510177: wd_clr_graphite
	},
	'FWV796WTSE': { // 8
		Capacity: wd_capa_9,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam],
		FT06510177: wd_clr_white
	},
	'FWV696SSE': { // 9
		Capacity: wd_capa_9,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_steam],
		FT06510177: wd_clr_graphite
	},
	'FWV696WSE': { // 10
		Capacity: wd_capa_9,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_steam],
		FT06510177: wd_clr_white
	},
	'FWV686STE': { // 11
		Capacity: wd_capa_8,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash],
		FT06510177: wd_clr_graphite
	},
	'FWV686WTE': { // 12
		Capacity: wd_capa_8,
		FT06510023: wd_under_60cm,
		FT06513802: wd_energy_e,
		FT06511876: wd_thinq_wifi,
		FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash],
		FT06510177: wd_clr_white
	},
	// 'LSWD100E': { // 14
	// 	Capacity: wd_capa_12,
	// 	FT06510023: wd_more_60cm,
	// 	FT06513802: wd_energy_a,
	// 	FT06511876: wd_thinq_wifi,
	// 	FT05036490: [wd_ai_dd_intelligent_system, wd_turbowash, wd_steam, wd_ezDispense],
	// 	FT06510177: wd_clr_white
	// },
}
/* product key, value end ---------------------------------------------------------- */

const configData = {
	// 제품 정보 정의
	object: [
		{
			key: 'Type_value1',
			class: 'washer_only',
			screenImg: {
				changeScreenImg: 'step02/que_img01.png',
				lastScreenImg: 'step07/washer_only_que_img01.png',
				resultImg: 'result/center_img01.png',
			}
		},
		{
			key: 'Type_value2',
			class: 'washer_dryer',
			screenImg: {
				changeScreenImg: 'step02/que_img02.png',
				lastScreenImg: 'step07/washer_dryer_que_img01.png',
				resultImg: 'result/center_img02.png',
			}
		},
	],
	// 질문페이지 사전 정의 
	finderSetting: [
		// 제품 선택
		{
			finderStep: 'step01',
			questionText: 'What type of </br>washing machine are you </br> looking for?',
			defaultScreenImg: 'step01/que_img00.png',
		},
		{
			finderStep: 'step02',
			questionText: 'What capacity do you need?',
			questionOrderText: 'What capacity do you need? </br> <span>(Washing + Drying)</span>',
			description: '* Clothing capacity may vary according to usage.',
		},
		/* 221128 start */
		{
			finderStep: 'step03',
			questionText: 'Quanto spazio hai a disposizione in casa?',
			key: ['Profondità', 'Larghezza', 'Altezza'],
		},
		/* 221128 end */
		{
			finderStep: 'step04',
			questionText: 'How energy-efficient do you want your </br> washing machine to be?',
			defaultScreenImg: 'step04/que_img01.png',
		},
		{
			finderStep: 'step05',
			questionText: 'Which aspect of washing machine </br> performance is most important for you?',
			defaultScreenImg: 'step05/que_img01.png',
		},
		{
			finderStep: 'step06',
			questionText: 'Which features do you </br> want from your washing machine?',
			defaultScreenImg: 'step06/que_img01.png',
		},
		{
			finderStep: 'step07',
			questionText: 'Which colour theme </br> matches your interior? ',
			productColorImg: ['_white_popup_img', '_steel_popup_img', '_black_popup_img'], // step07 인터렉션 페이지 컬러매칭 이미지 뿌리기
		},
	],
	// 페이지 데이터 정의
	htmlData: [
		//1번 스탭
		[
			{
				key: 'Type',
				value: 'Type_value1',
				content: 'Washer Only',
				changeData: {
					description: 'Excels in the basics, providing a thorough, efficient wash.',
					screenImg: 'step01/que_img01.png',
					learnMore: {
						interactionPage: 'washer_only',
					},
				},
				resultContent: 'step01',
			},
			{
				key: 'Type',
				value: 'Type_value2',
				content: 'Washer and Dryer',
				changeData: {
					description: 'More than just a washer, it offers a flawless combination of wash and dry functions.',
					screenImg: 'step01/que_img02.png',
					learnMore: {
						interactionPage: 'washer_and_dryer',
					},
				},
				resultContent: 'step01',
			},
		],
	],
	// 페이지 데이터 정의
	WMhtmlData: [
		//1번 스탭
		[
			{
				key: 'WM_Type',
				value: 'Type_value1',
				content: 'Washer Only',
				resultContent: 'step01',
			},
			{
				key: 'WM_Type',
				value: 'Type_value2',
				content: 'Washer and Dryer',
				resultContent: 'step01',
			},
		],
		//2번 스탭
		[
			{
				key: 'FT05036741',
				value: wm_capa_8,
				content: '8kg',
				changeData: {
					description: 'Takes more than 30 shirts, or a queen size duvet, in a single wash.',
					icon: 'step02/disc_icon01.png',
				}
			},
			{
				key: 'FT05036741',
				value: wm_capa_9,
				content: '9kg',
				changeData: {
					description: 'Takes more than 45 shirts, or a large double duvet, in a single wash.',
					icon: 'step02/disc_icon02.png',
				}
			},
			{
				key: 'FT05036741',
				value: wm_capa_10_5,
				content: '10.5kg',
				changeData: {
					description: 'Takes 50-55 shirts, or a king size duvet, in a single wash.',
					icon: 'step02/disc_icon03.png',
				}
			},
			{
				key: 'FT05036741',
				value: wm_capa_12,
				content: '12kg or more',
				changeData: {
					description: 'Takes more than 60 shirts, or a super king size duvet, in a single wash.',
					icon: 'step02/disc_icon04.png',
				}
			},
		],
		//3번 스탭
		[
			{
				key: 'Depth',
				value: 'Depth_value1',
				content: 'Meno di 76cm',
				changeData: {
					description: {
						head: 'Come misurare lo spazio che hai a disposizione per un nuovo frigorifero.',
						detail: 'Individua il punto in cui vuoi installare il frigo e prendi le misure dello spazio disponibile. Le porte necessitano dai 25 ai 50mm di spazio per l’apertura e la ventilazione. Sconsigliamo l’installazione vicino a zone molto calde o molto fredde.'
					},
					learnMore: {
						additionalDesc: true,
					},
					icon: 'step03/disc_icon01.png',
				}
			},
			{
				key: '',
				value: 'dummy',
				content: '76cm o più'
			}
		],
		[
			{
				key: 'step03-1',
				value: 'AllOption',
				content: 'Tutte le opzioni',
			},
			{
				key: 'Width',
				value: 'Width_value1',
				content: 'Meno di 60cm',
			},
			{
				key: 'Width',
				value: 'Width_value2',
				content: 'Da 61 a 80cm',
			},
			{
				key: 'Width',
				value: 'Width_value3',
				content: 'Da 81 a 90cm',
			},
			{
				key: 'Width',
				value: 'Width_value4',
				content: '91cm o più',
			},
		],
		[
			{
				key: 'step03-2',
				value: 'AllOption',
				content: 'Tutte le opzioni',
			},
			{
				key: 'Height',
				value: 'Height_value1',
				content: 'Meno di 180cm',
			},
			{
				key: 'Height',
				value: 'Height_value2',
				content: 'Da 180 a 200cm',
			},
			{
				key: 'Height',
				value: 'Height_value3',
				content: '200cm o più',
			},
		],
		//4번 스탭
		[
			{
				key: 'FT06513792',
				value: 'energy_value1',
				content: 'Energy Grade : A',
				changeData: {
					description: 'A grade, the most energy-efficient class on the EU energy grading scale (A to G) afforded by TurboWash™ technology.',
					screenImg: 'step04/que_img02.png',
				}
			},
			{
				key: 'FT06513792',
				sortation: 'Q4',
				value: 'dummy',
				content: 'Doesn’t matter to me, </br>I’d like to see all models.',
				DataNon: true,
				changeData: {
					description: 'Doesn’t matter to me, I’d like to see all models.',
					screenImg: 'step04/que_img01.png',
				}
			},
		],
		//5번스탭
		[
			{
				key: 'FT05036362',
				value: wm_ai_dd_intelligent_system,
				content: 'Gentle Fabric </br>Care for Minimal Damage',
				changeData: {
					description: 'AIDD™ senses the weight and texture of clothes to optimize washing.',
					screenImg: 'step05/que_img02.png',
					learnMore: {
						videoPopup: 'gentle_fabric',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'FT05036362',
				value: wm_turbowash,
				content: 'Powerful Washing </br>Performance',
				changeData: {
					description: 'A machine that can power through dirt and stains.',
					screenImg: 'step05/que_img03.png',
					learnMore: {
						videoPopup: 'powerful_washing',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'FT05036362',
				value: wm_steam,
				content: 'Hygiene',
				changeData: {
					description: 'Don’t worry about irritants. Steam™ technology removes harmful dust mites.',
					screenImg: 'step05/que_img04.png',
					learnMore: {
						videoPopup: 'hygiene',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'FT05036362',
				value: wm_turbowash_360,
				content: 'Time - Efficient',
				changeData: {
					description: 'Thoroughly Clean in 39 minutes.',
					screenImg: 'step05/que_img05.png',
				},
				resultContent: 'step05',
			},
		],
		//6번 스탭
		[
			{
				key: 'FT06511874',
				value: wm_thinq_wifi,
				content: 'Smart Assistance',
				changeData: {
					description: 'Control your wi-fi enabled LG smart washing machine remotely via your smartphone using the LG ThinQ™ app. ',
					screenImg: 'step06/que_img02.png',
					learnMore: {
						videoPopup: 'smart_assistance',
					},
				},
				resultContent: 'step06',
			},
			{
				key: 'FT05036362',
				value: wm_ezDispense,
				content: 'Detergent Portioned </br>And Dispensed Automatically',
				changeData: {
					description: 'ezDispense™ precisely proportions detergent dosages fit for each wash cycle.',
					screenImg: 'step06/que_img02.png',
					learnMore: {
						videoPopup: 'detergent',
					},
				},
				resultContent: 'step06',
			},
			{
				key: 'FT05036362',
				value: 'dummy',
				sortation: 'Q6',
				content: 'Doesn’t matter to me, </br>I’d like to see all models.',
				DataNon: true,
				changeData: {
					description: 'Doesn’t matter to me, I’d like to see all models.',
					screenImg: 'step04/que_img01.png',
				}
			},
		],
		//7번 스탭
		[
			{
				key: 'FT06509998',
				value: wm_clr_white,
				content: 'White',
				changeData: {
					description: 'A smart white appliance for any style of interior and mood.',
					screenImg: 'que_img01.png',
					learnMore: {
						interactionPage: 'white',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'FT06509998',
				value: wm_clr_graphite,
				content: 'Graphite',
				changeData: {
					description: 'A laid-back tone that complements your cosy home.',
					screenImg: 'que_img02.png',
					learnMore: {
						interactionPage: 'graphite',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'FT06509998',
				value: wm_clr_black,
				content: 'Black',
				changeData: {
					description: 'A luxurious way to make your appliance stand out.',
					screenImg: 'que_img03.png',
					learnMore: {
						interactionPage: 'black',
					},
				},
				resultContent: 'step07',
			},
		],
	],
	// 페이지 데이터 정의
	WDhtmlData: [
		//1번 스탭
		[
			{
				key: 'WD_Type',
				value: 'Type_value1',
				content: 'Washer Only',
				resultContent: 'step01',
			},
			{
				key: 'WD_Type',
				value: 'Type_value2',
				content: 'Washer and Dryer',
				resultContent: 'step01',
			},
		],
		//2번 스탭
		[
			{
				key: 'Capacity',
				value: wd_capa_8,
				content: '8kg + 6kg',
				changeData: {
					description: 'Takes more than 30 shirts, or a queen size duvet, in a single wash.',
					icon: 'step02/disc_icon01.png',
				}
			},
			{
				key: 'Capacity',
				value: wd_capa_9,
				content: '9kg + 6kg',
				changeData: {
					description: 'Takes more than 45 shirts, or a large double duvet, in a single wash.',
					icon: 'step02/disc_icon02.png',
				}
			},
			{
				key: 'Capacity',
				value: wd_capa_10_5,
				content: '10.5kg + 7kg',
				changeData: {
					description: 'Takes 50-55 shirts, or a king size duvet, in a single wash.',
					icon: 'step02/disc_icon03.png',
				}
			},
			{
				key: 'Capacity',
				value: wd_capa_12,
				content: '12kg + 7kg or more',
				changeData: {
					description: 'Takes more than 60 shirts, or a super king size duvet, in a single wash.',
					icon: 'step02/disc_icon04.png',
				}
			},
		],
		//3번 스탭
		[
			{
				key: 'Depth',
				value: 'Depth_value1',
				content: 'Meno di 76cm',
				changeData: {
					description: {
						head: 'Come misurare lo spazio che hai a disposizione per un nuovo frigorifero.',
						detail: 'Individua il punto in cui vuoi installare il frigo e prendi le misure dello spazio disponibile. Le porte necessitano dai 25 ai 50mm di spazio per l’apertura e la ventilazione. Sconsigliamo l’installazione vicino a zone molto calde o molto fredde.'
					},
					learnMore: {
						additionalDesc: true,
					},
					icon: 'step03/disc_icon01.png',
				}
			},
			{
				key: '',
				value: 'dummy',
				content: '76cm o più'
			}
		],
		[
			{
				key: 'step03-1',
				value: 'AllOption',
				content: 'Tutte le opzioni',
			},
			{
				key: 'Width',
				value: 'Width_value1',
				content: 'Meno di 60cm',
			},
			{
				key: 'Width',
				value: 'Width_value2',
				content: 'Da 61 a 80cm',
			},
			{
				key: 'Width',
				value: 'Width_value3',
				content: 'Da 81 a 90cm',
			},
			{
				key: 'Width',
				value: 'Width_value4',
				content: '91cm o più',
			},
		],
		[
			{
				key: 'step03-2',
				value: 'AllOption',
				content: 'Tutte le opzioni',
			},
			{
				key: 'Height',
				value: 'Height_value1',
				content: 'Meno di 180cm',
			},
			{
				key: 'Height',
				value: 'Height_value2',
				content: 'Da 180 a 200cm',
			},
			{
				key: 'Height',
				value: 'Height_value3',
				content: '200cm o più',
			},
		],
		//4번 스탭
		[
			{
				key: 'Energy',
				value: wd_energy_a,
				content: 'Energy Grade : A',
				changeData: {
					description: 'A grade, the most energy-efficient class on the EU energy grading scale (A to G) afforded by TurboWash™ technology.',
					screenImg: 'step04/que_img02.png',
				}
			},
			{
				key: 'Energy',
				value: 'dummy',
				sortation: 'Q4',
				content: 'Doesn’t matter to me, </br>I’d like to see all models.',
				DataNon: true,
				changeData: {
					description: 'Doesn’t matter to me, I’d like to see all models.',
					screenImg: 'step04/que_img01.png',
				}
			},
		],
		//5번스탭
		[
			{
				key: 'Feature',
				value: wd_ai_dd_intelligent_system,
				content: 'Gentle Fabric </br>Care for Minimal Damage',
				changeData: {
					description: 'AIDD™ senses the weight and texture of clothes to optimize washing.',
					screenImg: 'step05/que_img02.png',
					learnMore: {
						videoPopup: 'gentle_fabric',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'Feature',
				value: wd_turbowash,
				content: 'Powerful Washing </br>Performance',
				changeData: {
					description: 'A machine that can power through dirt and stains.',
					screenImg: 'step05/que_img03.png',
					learnMore: {
						videoPopup: 'powerful_washing',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'Feature',
				value: wd_steam,
				content: 'Hygiene',
				changeData: {
					description: 'Don’t worry about irritants. Steam™ technology removes harmful dust mites.',
					screenImg: 'step05/que_img04.png',
					learnMore: {
						videoPopup: 'hygiene',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'Feature',
				value: wd_turbowash_360,
				content: 'Time - Efficient',
				changeData: {
					description: 'Thoroughly Clean in 39 minutes.',
					screenImg: 'step05/que_img05.png',
				},
				resultContent: 'step05',
			},
		],
		//6번 스탭
		[
			{
				key: 'FT06511876',
				value: wd_thinq_wifi,
				content: 'Smart Assistance',
				changeData: {
					description: 'Control your wi-fi enabled LG smart washing machine remotely via your smartphone using the LG ThinQ™ app. ',
					screenImg: 'step06/que_img02.png',
					learnMore: {
						videoPopup: 'smart_assistance',
					},
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: wd_ezDispense,
				content: 'Detergent Portioned </br>And Dispensed Automatically',
				changeData: {
					description: 'ezDispense™ precisely proportions detergent dosages fit for each wash cycle.',
					screenImg: 'step06/que_img02.png',
					learnMore: {
						videoPopup: 'detergent',
					},
				},
				resultContent: 'step06',
			},
		],
		//7번 스탭
		[
			{
				key: 'Color',
				value: wd_clr_white,
				content: 'White',
				changeData: {
					description: 'A smart white appliance for any style of interior and mood.',
					screenImg: 'que_img01.png',
					learnMore: {
						interactionPage: 'white',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: wd_clr_graphite,
				content: 'Graphite',
				changeData: {
					description: 'A laid-back tone that complements your cosy home.',
					screenImg: 'que_img02.png',
					learnMore: {
						interactionPage: 'graphite',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: wd_clr_black,
				content: 'Black',
				changeData: {
					description: 'A luxurious way to make your appliance stand out.',
					screenImg: 'que_img03.png',
					learnMore: {
						interactionPage: 'black',
					},
				},
				resultContent: 'step07',
			},
		],
	],
}

function imgPreload() {
	function preloading(imageArray) {
		let imgNum = imageArray.length;
		for (let i = 0; i < imgNum; i++) {
			let img = new Image();
			img.src = imageArray[i];
		}
	}
	preloading([
		// common
		'./images/pc/common/back_btn_icon.png',
		'./images/pc/common/bg_bottom_deco.png',
		'./images/pc/common/bg_top_deco.png',
		'./images/pc/common/interactive_popup_bg_bottom_deco.png',
		'./images/pc/common/interactive_popup_bg_top_deco.png',
		'./images/pc/common/next_btn_icon.png',
		'./images/pc/common/next_btn_icon2.png',
		'./images/pc/common/shop_now_character.png',
		'./images/pc/common/try_again_icon.png',
		'./images/common/video01_poster_img.jpg',
		'./images/common/video02_poster_img.jpg',
		'./images/common/video03_poster_img.jpg',
		'./images/common/video04_poster_img.jpg',
		'./images/common/video05_poster_img.jpg',

		// result
		'./images/pc/result/bg_unit.jpg',
		'./images/pc/result/center_img01.png',
		'./images/pc/result/center_img02.png',

		// step01
		'./images/pc/step01/btn_icon01.png',
		'./images/pc/step01/btn_icon01_on.png',
		'./images/pc/step01/btn_icon02.png',
		'./images/pc/step01/btn_icon02_on.png',
		'./images/pc/step01/popup_contents_img01.png',
		'./images/pc/step01/popup_contents_img02.png',
		'./images/pc/step01/popup_icon01.png',
		'./images/pc/step01/popup_icon02.png',
		'./images/pc/step01/que_img00.png',
		'./images/pc/step01/que_img01.png',
		'./images/pc/step01/que_img02.png',
		'./images/pc/step01/txt_bubble_icon.png',

		// step02
		'./images/pc/step02/btn_icon01.png',
		'./images/pc/step02/btn_icon01_on.png',
		'./images/pc/step02/btn_icon02.png',
		'./images/pc/step02/btn_icon02_on.png',
		'./images/pc/step02/btn_icon03.png',
		'./images/pc/step02/btn_icon03_on.png',
		'./images/pc/step02/btn_icon04.png',
		'./images/pc/step02/btn_icon04_on.png',
		'./images/pc/step02/disc_icon01.png',
		'./images/pc/step02/disc_icon02.png',
		'./images/pc/step02/disc_icon03.png',
		'./images/pc/step02/disc_icon04.png',
		'./images/pc/step02/que_img01.png',
		'./images/pc/step02/que_img02.png',
		'./images/pc/step02/txt_bubble_icon.png',

		// step03
		'./images/pc/step03/caution_icon.png',
		'./images/pc/step03/disc_icon01.png',
		'./images/pc/step03/popup_img01.jpg',

		// step04
		'./images/pc/step04/btn_icon01.png',
		'./images/pc/step04/que_img01.png',
		'./images/pc/step04/que_img02.png',

		// step05
		'./images/pc/step05/btn_icon01.png',
		'./images/pc/step05/btn_icon02.png',
		'./images/pc/step05/btn_icon03.png',
		'./images/pc/step05/btn_icon04.png',
		'./images/pc/step05/que_img01.png',
		'./images/pc/step05/que_img02.png',
		'./images/pc/step05/que_img03.png',
		'./images/pc/step05/que_img04.png',
		'./images/pc/step05/que_img05.png',

		// step06
		'./images/pc/step06/btn_icon01.png',
		'./images/pc/step06/btn_icon02.png',
		'./images/pc/step06/que_img01.png',
		'./images/pc/step06/que_img02.png',
		'./images/pc/step06/que_img03.png',

		// step07
		'./images/pc/step07/washer_dryer_black_popup_img.png',
		'./images/pc/step07/washer_dryer_que_img01.png',
		'./images/pc/step07/washer_dryer_que_img02.png',
		'./images/pc/step07/washer_dryer_que_img03.png',
		'./images/pc/step07/washer_dryer_steel_popup_img.png',
		'./images/pc/step07/washer_dryer_white_popup_img.png',
		'./images/pc/step07/washer_only_black_popup_img.png',
		'./images/pc/step07/washer_only_que_img01.png',
		'./images/pc/step07/washer_only_que_img02.png',
		'./images/pc/step07/washer_only_que_img03.png',
		'./images/pc/step07/washer_only_steel_popup_img.png',
		'./images/pc/step07/washer_only_white_popup_img.png',
	]);
}
intro();
main();
function intro() {
	var popupStep05swiper = new Swiper(".popup_step05_slide", {
		pagination: {
			el: ".popup_step05 .indicator",
		},
		observe: true,
		effect: "fade"
	});

	var popupStep03swiperMulti = new Swiper(".popup_step03 .multi", {
		pagination: {
			el: ".popup_step03 .multi .indicator",
		},
		observe: true,
		effect: "fade"
	});

	var popupStep03swiperAmerican = new Swiper(".popup_step03 .american", {
		pagination: {
			el: ".popup_step03 .american .indicator",
		},
		observe: true,
		effect: "fade"
	});

	var popupStep03swiperTall = new Swiper(".popup_step03 .tall", {
		pagination: {
			el: ".popup_step03 .tall .indicator",
		},
		observe: true,
		effect: "fade"
	});
}
function main() {
	// element
	const $quickFinder = $('#quickFinder'),
		$selectWrap = $('#selectWrap'),
		$qnaImgWrap = $('#qnaImgWrap'),
		$description = $('.qna_description'),
		$descHeadWrap = $('.qna_description01'),
		$descDetailWrap = $('.qna_description02'),
		$descIcon = $('.qna_description01 .txt_box i'),
		$descHead = $('.qna_description01 .txt_box p'),
		$descDetail = $('.qna_description02 .txt_box p'),
		$centerImgWrap = $('.center_img_wrap');

	// button
	const $nextBtn = $('#nextStepBtn'),
		$backBtn = $('#backStepBtn'),
		$showNow = $('#shopNowBtn'),
		$finalShowNow = $('#shopNowBtn02'),
		$tryAgain = $('#tryAgain'),
		$detailCloseBtn = $('#detailCloseBtn'),
		$popupClose = $('.popup_close_btn'),
		$interactionClose = $('.close_btn'),
		$loadMoreBtn = $('.load_more_btn'),
		$learnMoreBtn = $('.learn_more_btn');

	//popup
	const $popupStp3 = $('.popup_step03');

	// intro animation
	const $introAnimation = $("#introAnimation");

	/* 221128 start */
	// text
	const multipleSelections = 'Scegli tutte le opzioni che vuoi.';
	/* 221128 end */

	let currentUrl = document.location.href; // 현재 url
	let resultPageUrl; // pdp 페이지 (result)
	let stageLiveDecide; // 현재 url 판단
	let animationJson; // json file
	let headerH = $('header').outerHeight();

	// LG stg live <--> 로컬 판단
	currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;

	// 라이브,스테이징 <-> 로컬 링크 구분
	if (stageLiveDecide) {
		resultPageUrl = './../promotions/';
	} else {
		resultPageUrl = 'https://wwwstg.lg.com/uk/promotions/';
	}

	// json animation Desktop / Mobile 구분
	if (window.innerWidth >= 1024) {
		animationJson = './images/pc/intro/intro_animation.json';
	} else {
		animationJson = './images/intro/intro_animation.json';
	}

	// json animation
	var introLottie = lottie.loadAnimation({
		container: document.getElementById('animationPlayer'), // required
		path: animationJson, // required
		renderer: 'svg', // required
		loop: false
	});

	// 인트로 삭제
	if (currentUrl.includes('intro=no')) {
		$introAnimation.css('display', 'none');
		$quickFinder.css('display', 'block');
	} else {
		introLottie.addEventListener('complete', function () {
			TweenMax.to($introAnimation, .3, { opacity: 0, display: "none" });
			$(window).scrollTop(headerH);
		});
	}
	// Quick Finder Start
	stepUpdateEvent(idx);

	// 다음버튼
	$nextBtn.on('click', function () {
		let _judgmentStep = 'nextStep';

		idx === 6 && resultChoice() // 마지막 스텝에서 result 화면실행
		// active 가 있을때 실행 & finderSetting 갯수보다 작으면 실행
		if (idx < configData.finderSetting.length - 1 && $(this).hasClass('active')) {
			idx++;
			stepUpdateEvent(idx, _judgmentStep);
		}
	});
	// 이전버튼
	$backBtn.on('click', function () {
		let _judgmentStep = 'backStep';

		if (idx > 0) {
			idx--;
			stepUpdateEvent(idx, _judgmentStep);
		}
	});

	// next / prev 누를 때 실행
	function stepUpdateEvent(idx, _judgmentStep) {
		/* 221128 start */
		let _htmlIdx = idx; // 항목 별 index
		if (idx > 2) { _htmlIdx += 2; }// 페이지 데이터 index
		let _lastAnswerValue; // 저장된 데이터에서 마지막 value
		let _stepProductArray = []; // 스텝별 제품 추출
		currentStep = configData.finderSetting[idx];

		// step1 에서 제품 선택의 따른 htmlData 마크업 데이터 변경
		if (idx !== 0) {
			if (selectedProduct[0].key === 'Type_value1') {
				screenConfigData = configData.WMhtmlData;
			} else {
				screenConfigData = configData.WDhtmlData;
			}
		} else {
			screenConfigData = configData.htmlData;
		}
		let _currentHtml = screenConfigData[_htmlIdx]; // 현재 스텝의 항목 데이터
		/* 221128 end */

		!stageLiveDecide && console.log('selectedParameters : ', selectedParameters); // 선택된 key,value
		idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제

		// 앞전 데이터 삭제
		_judgmentStep === 'backStep' && matchingProducts.pop();

		$descDetailWrap.removeClass('open');
		TweenMax.to($nextBtn, .2, { display: 'none', opacity: 0 });
		$showNow.removeClass('active');
		$quickFinder.removeClass();
		$quickFinder.addClass(currentStep.finderStep); // step class 변경
		$(window).scrollTop(headerH);

		// next 버튼에 내용 step 별 내용 심기
		$nextBtn.attr('data-link-name', 'Next : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());

		// step 해당 질문 뿌리기 
		$('.que_title').remove();
		$descHeadWrap.find('strong').remove();
		// type 2 선택 했을 때 type2 에 대한 text 노출
		if (idx === 1 && selectedProduct[0].key === 'Type_value2') {
			$('.qna_wrap').prepend('<strong class="que_title">' + currentStep.questionOrderText + '</strong>');
			$descHeadWrap.prepend('<strong>' + currentStep.questionOrderText + '</strong>');
		} else {
			// 기본값
			$('.qna_wrap').prepend('<strong class="que_title">' + currentStep.questionText + '</strong>');
			$descHeadWrap.prepend('<strong>' + currentStep.questionText + '</strong>');
		}

		$('.que_title').css('display', 'block');
		// step 해당 이미지 뿌리기
		$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + currentStep.defaultScreenImg + ')');

		// 첫번째 선택지에서 선택한 이미지 추출
		if (idx === 1 || idx === 2) {
			$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.changeScreenImg + ')');
		}
		// 첫번째 선택지에서 선택한 이미지 추출
		if (idx === 6) {
			$nextBtn.text('Almost Done!');
			$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.lastScreenImg + ')');
		} else {
			$nextBtn.text('NEXT');
		}

		// 항목 버튼 초기화 
		$selectWrap.html('<button type="button" class="caution_open_btn">Click here for a guide to dimensions and measurement.</button><p class="select_tit"><em>You Can Select Multiple Choices.</em></p>');
		$selectWrap.append('<ol></ol>');
		/* 221128 start */
		if (idx === 2) {
			// step 3 데이터 뿌리기
			let liHtml = '';
			while (_htmlIdx < 5) { // 2, 3, 4 연속 출력
				let _currentHtml = screenConfigData[_htmlIdx]; // 현재 스텝의 항목 데이터
				let _buttonHtml = '';
				for (let i = 0; i < _currentHtml.length; i++) {
					// All Select Option 마크업 예외
					if (_htmlIdx !== 2 && i === 0) {
						_buttonHtml += `<button class="answer_btn" type="button" data-key="${_currentHtml[i].key}" data-value="${_currentHtml[i].value}"><span></span><p>${_currentHtml[i].content}</p></button>`;
					} else {
						_buttonHtml += `<button class="answer_btn" type="button" data-key="${_currentHtml[i].key}" data-value="${_currentHtml[i].value}"><p>${_currentHtml[i].content}</p></button>`;
					}
				}
				liHtml += `<li><span>${configData.finderSetting[idx].key[_htmlIdx - 2]}<div><em>${multipleSelections}</em></div></span><div>${_buttonHtml}</div></li>`;
				_htmlIdx++;
			}
			$selectWrap.find('ol').append(liHtml);
			/* 221128 end */
		} else if (idx === 6) {
			for (let i = 0; i < _currentHtml.length; i++) {
				$selectWrap.find('ol').append('<li><button class="answer_btn" type="button" data-key="' + _currentHtml[i].key + '"  data-value="' + _currentHtml[i].value + '"><span></span><p>' + _currentHtml[i].content + '</p></button></li>');
			}
		} else {
			for (let i = 0; i < _currentHtml.length; i++) {
				$selectWrap.find('ol').append('<li><button class="answer_btn" type="button" data-key="' + _currentHtml[i].key + '" data-value="' + _currentHtml[i].value + '"><i></i><p>' + _currentHtml[i].content + '</p></button></li>');
				// dummy 스텝 별 텍스트 구분 (Q4,Q6)
				if (_currentHtml[i].value === 'dummy') {
					$selectWrap.find('ol li').eq(i).find('.answer_btn').attr('data-link-name', _currentHtml[i].sortation);
					$selectWrap.find('ol li').eq(i).find('.answer_btn').attr('data-model-description', 'Doesn’t matter to me, I’d like to see all models.');
				}
			}
		}

		// 선택된 제품 추출 
		// step 1만 동작
		if (idx === 1 && matchingProducts.length < 1) {
			// 마지막에 선택한 value 값 추출
			let _selectValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; // value

			if (_selectValue === 'Type_value1') {
				product = productWasherOnly;
			} else {
				product = productWasherAndDryer;
			}
			for (let key in product) {
				_stepProductArray.push(product[key]);
			}
			matchingProducts.push(_stepProductArray);
		}

		// step 2 부터 동작
		if (idx > 1 && matchingProducts[idx - 1] === undefined) { // back 했을때를 고려해서 undefined 구분
			/* 221128 start */
			if (idx === 3) {
				let _wholeKey = []; // 선택한 key 값 
				let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기

				for (let j = 0; j < stepCount[stepCount.length - 1]; j++) {
					let _selectKey = selectedParameters[selectedParameters.length - (1 + j)].split('=')[0]; // key
					_wholeKey.push(_selectKey);
				}
				let _restKey = Array.from(new Set(_wholeKey)); // select 한 value의 중복 제거 된 key 값 추출
				let _restKeyLength = _restKey.filter((item) => { // All Selet Key 에 해당되는 배열 삭제
					if (item !== 'step03-1' && item !== 'step03-2') {
						return item;
					}
				});

				// 제품 갯수만큼 for 문 실행
				for (let i = 0; i < _lastPro.length; i++) {
					let _judgmentNum = 0; // true 된 갯수 판단

					// console.log('_lastPro 선택된 제품 : ', _lastPro[i])

					// 선택한 value 값 추출
					for (let j = 0; j < stepCount[stepCount.length - 1]; j++) {
						let _selectValue = selectedParameters[selectedParameters.length - (1 + j)].split('=')[1]; // value

						for (let p = 0; p < _restKeyLength.length; p++) {
							// console.log(_lastPro[i][_restKeyLength[p]], _selectValue, _lastPro[i][_restKeyLength[p]] === _selectValue)
							if (_lastPro[i][_restKeyLength[p]] === _selectValue) {
								_judgmentNum++
							}
						}
					}
					// console.debug(_judgmentNum, _restKeyLength.length, _judgmentNum === _restKeyLength.length)
					if (_judgmentNum === _restKeyLength.length) {
						_stepProductArray.push(_lastPro[i]);
					}
				}
				matchingProducts.push(_stepProductArray);
				/* 221128 end */
			} else {
				let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
				let _bol = false;

				// 추출된 마지막 제품 갯수 만큼 for 문 실행 
				for (let i = 0; i < _lastPro.length; i++) {
					let _valueCounting = stepCount[stepCount.length - 1];
					let _judgmentNum = 0;

					// 마지막에 선택한 value 값 추출
					for (let j = 0; j < _valueCounting; j++) {
						let _selectKey = selectedParameters[selectedParameters.length - (1 + j)].split('=')[0]; // key
						let _selectValue = selectedParameters[selectedParameters.length - (1 + j)].split('=')[1]; // value

						if (_selectValue === 'dummy') {
							_bol = true;
							_stepProductArray.push(_lastPro[i]);
						}
						// 사용자가 선택한 key 중에 Feature 가 포함되어 있을 때
						if (!_bol) {
							if (Array.isArray(_lastPro[i][_selectKey])) {
								let selectValueArray = _lastPro[i][_selectKey];
								// , 기준으로 배열 생성
								for (let p = 0; p < selectValueArray.length; p++) {
									if (selectValueArray[p] === _selectValue) {
										idx !== 5 && idx !== 6 ? _stepProductArray.push(_lastPro[i]) : _judgmentNum++;
									}
								}
							} else {
								if (_lastPro[i][_selectKey] === _selectValue) {
									idx !== 5 && idx !== 6 ? _stepProductArray.push(_lastPro[i]) : _judgmentNum++;
								}
							}
						}
					}

					// 선택한 벨류값의 갯수와 true 된 갯수와 같으면 제품 추출
					if ((idx === 5 || idx === 6) && (_judgmentNum === _valueCounting)) {
						_stepProductArray.push(_lastPro[i]);
					}
				}
				matchingProducts.push(_stepProductArray);
			}
		}

		// disabled 
		if (idx !== 0) {
			var _dataValue = []; // 추출된 제품에서 현재스텝의 마크업과 비교될 value 값 추출 배열
			let _lastPro = matchingProducts[matchingProducts.length - 1];
			let _currentKey = []; // 현재 스텝의 key 값
			let _currentKeyRemoval = []; // 중복된데이터 제거된 key 값

			// 현재 스텝의 key 값 추출
			$('.answer_btn').each(function () {
				let _tis = $(this);
				_currentKey.push(_tis.data('key'));
				// value 가 dummy 인 것 빼고 모두 disabled
				if (_tis.data('value') !== 'dummy') {
					// _tis.prop('disabled', true); // default disabled true
				}
			});
			_currentKeyRemoval = Array.from(new Set(_currentKey)); // 중복 key 값 제거

			// 추출된 제품 갯수만큼 for 문 실행 
			for (let i = 0; i < _lastPro.length; i++) {
				// 현재 스텝의 있는 key 갯수만큼 for 문 실행
				for (let j = 0; j < _currentKeyRemoval.length; j++) {
					// 추출된 제품에 ,가 있을 때 value값 모두 push
					if (Array.isArray(_lastPro[i][_currentKeyRemoval[j]])) {
						let binArray = _lastPro[i][_currentKeyRemoval[j]];
						for (let p = 0; p < binArray.length; p++) {
							_dataValue.push(binArray[p]);
						}
					} else {
						_dataValue.push(_lastPro[i][_currentKeyRemoval[j]]);
					}
				}
			}

			// disabled 하기 
			let _arrayDataValue = Array.from(new Set(_dataValue)); // 추출된 제품 중복되는 value 제거한 나머지 최종 value

			// 스텝과 선택된 value 비교하여 disabled 풀기
			for (let i = 0; i < _arrayDataValue.length; i++) {
				$('.answer_btn[data-value="' + _arrayDataValue[i]).removeAttr('disabled');
			}
		}

		// backStep
		if (_judgmentStep === 'backStep') {
			$('.que_title').css('display', 'none');
			$description.css('display', 'none');
			$descHeadWrap.css('display', 'block');
			$nextBtn.addClass('active');
			$showNow.addClass('active');
			TweenMax.to($nextBtn, .2, { display: 'block', opacity: 1 })

			// 앞전 스텝에서 항목을 클릭 했을 때 (값이 있을 경우) 선택한 항목/카운트 배열 삭제
			if (stepCount[idx + 1] !== undefined || stepCount[idx + 1] === 0) {
				// selectedParameters 앞전 데이터 삭제
				for (let i = 0; i < stepCount[stepCount.length - 1]; i++) {
					selectedParameters.pop();
				}
				// 앞전 카운트 삭제
				stepCount.pop();
			}

			// 현재 선택된 카운트 만큼 for문 실행 
			for (let i = 0; i < stepCount[stepCount.length - 1]; i++) {
				let _currentValue = selectedParameters[selectedParameters.length - (i + 1)].split('=')[1]; // key=value에서 value 값만 추출
				// 버튼 value와 저장된 value와 같으면 active 
				$('.answer_btn').each(function () {
					let _thisValue = $(this).data('value');
					if (_currentValue === _thisValue) {
						$(this).addClass('active')
					}
				});
			}
			_lastAnswerValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; //선택된 마지막 value 값 추출
			sprayData(idx, _currentHtml, _lastAnswerValue); // 선택한 항목의 대한 데이터 뿌리기
			taggingEvent(); // 태깅 함수
		} else {
			$('.que_title').css('display', 'block');
			$description.css('display', 'none');
		}
		!stageLiveDecide && console.log('matchingProducts : ', matchingProducts) // 매칭된 제품
		answerSelectEvent(idx, _htmlIdx, _currentHtml); // 항목 클릭 함수
	}

	// 항목 클릭시 실행 함수
	function answerSelectEvent(idx, _htmlIdx, _currentHtml) {
		let _lastAnswerValue; // 저장된 데이터에서 마지막 value

		// 항목 클릭 
		$('.answer_btn').on('click', function () {
			let _this = $(this);
			let _currentKeyValue = _this.data('key') + '=' + _this.data('value'); // 현재 선택한 키/벨류 ex) Q2=Q2_value2

			// 항목 매칭된 데이터 뿌리기 & 선택된 데이터 push
			if (idx === 0) {
				// button active 
				$('.answer_btn').removeClass('active');
				_this.addClass('active');
				selectedParameters = []; // selectedParameters 초기화
				selectedParameters.push(_currentKeyValue); // push
				selectedProduct = configData.object.filter(item => {
					return item.key === selectedParameters[0].split('=')[1]
				});
			} else {
				!_this.hasClass('active') ? _this.addClass('active') : _this.removeClass('active'); // button active
			}

			// selectedParameters에서 현재 선택된 key,value 중복되는 데이터 제거
			selectedParameters.forEach(function (item, i) {
				item === _currentKeyValue && selectedParameters.splice(i, 1)
			});

			_this.hasClass('active') && selectedParameters.push(_currentKeyValue); // 선택된 value push
			taggingEvent(); // 태깅 함수

			// 카운팅 갯수 push 
			if (stepCount[idx] !== undefined) {
				stepCount[idx] = $('.answer_btn.active').length;
			} else {
				stepCount.push($('.answer_btn.active').length);
			}

			!stageLiveDecide && console.log('selectedParameters : ', selectedParameters); // 선택된 key,value

			_lastAnswerValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; //선택된 마지막 value 값 추출
			sprayData(idx, _currentHtml, _lastAnswerValue); // 선택한 항목의 대한 데이터 뿌리기
		});
	}

	// 현재 클릭한 항목에 대한 데이터 뿌리기
	function sprayData(idx, _currentHtml, _lastAnswerValue) {
		let _moreCont;
		// value 저장 배열의 마지막 value 값과 매칭되는 항목 데이터 가져오기
		let _selectData = _currentHtml.filter(item => {
			return item.value === _lastAnswerValue
		});

		// 초기화
		$loadMoreBtn.removeClass('active');
		$learnMoreBtn.removeClass('active');
		$learnMoreBtn.removeAttr('data-popup');
		$learnMoreBtn.removeAttr('id');
		$('.popup_movie_step05 .popup_wrap > div').css('display', 'none');
		$loadMoreBtn.removeAttr('data-link-name');
		$learnMoreBtn.removeAttr('data-link-name');

		// 질문 텍스트 / 디스크립션 생성, 삭제
		if (idx === 2) {
			if ($descDetailWrap.hasClass('open')) {
				$descHeadWrap.css('display', 'none');
			} else {
				$descHeadWrap.css('display', 'block');
			}
		} else {
			$description.css('display', 'none');
			$descHeadWrap.css('display', 'block');
		}

		// 선택 이미지 매칭, 선택 항목 디스크립션 매칭 / load more 버튼 생성 
		if ($('.answer_btn.active').length > 0) {
			$('.que_title').css('display', 'none');
			$nextBtn.addClass('active');
			TweenMax.to($nextBtn, .2, { display: 'block', opacity: 1 })
			$showNow.addClass('active');

			if (idx === 1) {
				$descIcon.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.icon + ')');
				$descHead.text(_selectData[0].changeData.description);
				$descHead.append('<span>' + configData.finderSetting[idx].description + '</span>');
			} else if (idx === 2) {
				$descIcon.attr('style', 'background-image:url(' + imgPath + _currentHtml[0].changeData.icon + ')');
				$descHead.text(_currentHtml[0].changeData.description.head);
				$descDetail.text(_currentHtml[0].changeData.description.detail);
			} else if (idx === 6) {
				$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step07/' + selectedProduct[0].class + '_' + _selectData[0].changeData.screenImg + ')');
				$descHead.text(_selectData[0].changeData.description);
			} else {
				// 해당 idx 0, 3, 4, 5 
				// 데이터 없는 부분
				if (_selectData[0].DataNon === true) {
					$('.que_title').css('display', 'block');
					$descHeadWrap.css('display', 'none');
				}
				$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.screenImg + ')');
				if (_selectData[0].changeData.description.head !== undefined) {
					// 디스크립션 디테일
					$descHead.text(_selectData[0].changeData.description.head);
					$descDetail.text(_selectData[0].changeData.description.detail);
					$loadMoreBtn.addClass('active');
					$loadMoreBtn.attr('id', 'descMoreBtn');
					_moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, '');
					$loadMoreBtn.attr('data-link-name', 'Load More : ' + _moreCont);
				} else {
					$descHead.text(_selectData[0].changeData.description);
					$loadMoreBtn.removeClass('active');
					$loadMoreBtn.removeAttr('id');
				}
			}

			// learn more 버튼 생성 (추가 내용 & 비디오 팝업 & 인터렉티브 팝업 가르기)
			if (idx !== 2) {
				// learn more 버튼
				if (_selectData[0].changeData.learnMore !== undefined) {
					$learnMoreBtn.addClass('active');
					if (_selectData[0].changeData.learnMore.additionalDesc !== undefined) { // 추가 내용
						$learnMoreBtn.attr('id', 'descMoreBtn');
					} else if (_selectData[0].changeData.learnMore.interactionPage !== undefined) { // 인터렉션 팝업
						interactiveClass = _selectData[0].changeData.learnMore.interactionPage; // 선택된 항목 팝업 class 저장
						$learnMoreBtn.attr('id', 'interactionBtn');
						_moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, ''); // 태깅 text 저장
						$learnMoreBtn.attr('data-link-name', 'Interaction Page : ' + _moreCont);
						$learnMoreBtn.attr('data-popup', _selectData[0].changeData.learnMore.interactionPage);
					} else if (_selectData[0].changeData.learnMore.videoPopup !== undefined) { // 비디오 팝업
						$learnMoreBtn.attr('id', 'videoMoreBtn');
						$('.popup_movie_step05 .' + _selectData[0].changeData.learnMore.videoPopup).css('display', 'block');
						_moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, ''); // 태깅 text 저장
						$learnMoreBtn.attr('data-link-name', 'Learn More : ' + _moreCont);
					}
				}
			} else {
				if (_currentHtml[0].changeData.learnMore !== undefined) {
					$learnMoreBtn.addClass('active');
					if (_currentHtml[0].changeData.learnMore.additionalDesc !== undefined) { // 추가 내용
						$learnMoreBtn.attr('id', 'descMoreBtn');
						_moreCont = _currentHtml[0].changeData.description.head;
						$learnMoreBtn.attr('data-link-name', 'Learn More : ' + _moreCont);
					}
				}
			}
		} else {
			$('.que_title').css('display', 'block');
			$description.css('display', 'none');
			$descDetailWrap.removeClass('open');
			$nextBtn.removeClass('active');
			TweenMax.to($nextBtn, .2, { display: 'none', opacity: 0 });
			$showNow.removeClass('active');
			if (idx === 3 || idx === 4 || idx === 5) {
				// 아무것도 선택하지 않았을 때 기본 이미지
				$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + configData.finderSetting[idx].defaultScreenImg + ')');
			}
			if (idx === 6) {
				// 아무것도 선택하지 않았을 때 기본 이미지
				$qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.lastScreenImg + ')');
			}
		}
	}

	// result 현재 뽑은 데이터 추출
	function resultFunction() {
		let _result = '';
		let _productPath;
		// selectedParameters = ['FT06513471=FV65320785', 'FT06510172=FTV0330201V', 'FT06509987=FTV0323454V', 'FT06509990=FTV0323815V', 'FT06509991=FTV0329683V', 'FT06509991=FTV0329682V', 'FT05036514=FV65319132', 'FT05036514=dummy', 'FT05036514=FTV0330428V,FV65319131,FV65319130', 'FT06513242=FV65318510,FV65319300', 'FT05036514=FV65319138', 'FT05036514=FTV0329998V', 'FT05036514=FV65319136'];

		if (selectedProduct[0].key === 'Type_value1') {
			_productPath = 'washing-machines-finder-result';
		} else {
			_productPath = 'washer-dryers-finder-result';
		}


		for (let i = 0; i < selectedParameters.length; i++) {
			let _key = selectedParameters[i].split('=')[0];
			let _val = selectedParameters[i].split('=')[1];

			if (selectedParameters[i].includes(',')) {
				let _key = selectedParameters[i].split('=')[0];
				let _val = selectedParameters[i].split('=')[1];
				for (let j = 0; j < _val.split(',').length; j++) {
					_result += _key + '=' + _val.split(',')[j] + '&'
				}
			} else {
				if (_key !== 'Type' && _val !== 'dummy') {
					_result += selectedParameters[i] + '&'
				}
			}
		}

		// 매칭된 제품 코드 노출
		// if (idx !== 0) {
		// 	let _matchingProductCode = [];
		// 	let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
		// 	for (let i = 0; i < Object.keys(product).length; i++) {
		// 		console.debug(Object.keys(product)[i], '---------------------------------------------------' , i)
		// 		let _data = Object.values(product)[i];
		// 		for (let p = 0; p < Object.values(_data).length; p++) {
		// 			let num = 0;
		// 			let _key = Object.keys(_data)[p];

		// 			// console.log(Object.values(product)[i]);
		// 			// console.log(Object.values(product)[i][_key]);

		// 			for (let j = 0; j < _lastPro.length; j++) {
		// 				console.log('오리지널 제품 : ', Object.values(product)[i][_key] , _lastPro[j][_key] , ': 매칭된 제품    ', Object.values(product)[i][_key] === _lastPro[j][_key])
		// 				if (Object.values(product)[i][_key] === _lastPro[j][_key]) {
		// 					console.log('같음')
		// 					num++;
		// 				}
		// 				// if (Array.isArray(Object.values(product)[i][_key])) {
		// 				// 	// console.log(Array.isArray(Object.values(product)[i][_key]))
		// 				// 	// for (let a = 0; a < Object.values(product)[i][_key].length; a++) {
		// 				// 	// 	// console.debug(Object.values(product)[i][_key][a])
		// 				// 	// }

		// 				// } else {
		// 				// 	// console.log('오리지널 제품 : ', Object.values(product)[i][_key], _lastPro[j][_key], ': 매칭된 제품    ', Object.values(product)[i][_key] === _lastPro[j][_key])
		// 				// 	if (Object.values(product)[i][_key] === _lastPro[j][_key]) {
		// 				// 		// console.log(Object.values(product)[i])
		// 				// 	} else {
		// 				// 		// console.log('틀림')
		// 				// 		// console.log(Object.keys(product)[i])
		// 				// 	}
		// 				// }
		// 			}
		// 			console.log(num)
		// 		}
		// 		// let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
		// 		// 추출된 마지막 제품 갯수 만큼 for 문 실행 
		// 		// for (let j = 0; j < _lastPro.length; j++) {
		// 		// 	// console.log(_lastPro[j])
		// 		// }
		// 	}
		// 	console.log(_matchingProductCode);
		// }

		let filterParameter = '?' + _result.slice(0, -1);
		let openLink = resultPageUrl + _productPath + filterParameter;

		if (stageLiveDecide) { // LG stg live <--> 로컬 판단
			location.href = openLink; // 현재 탭에서 이동
		} else {
			window.open(openLink, '_blank'); // 새탭에서 이동
			console.log('_result : ', filterParameter);
			console.log('pdp Url', openLink);
		}
	}

	/* @22-07-28 태깅 관련 스크립트 삽입 (s) */
	function taggingEvent(elm) {
		let _test = ''; // 콘솔 확인 체크 test 
		stageCont = []; // 누적 선택한 항목 컨텐츠 

		// 선택한 항목 for 문 실행
		for (let i = 0; i < selectedParameters.length; i++) {
			let _selectKey = selectedParameters[i].split('=')[0]; // key
			let _selectVal = selectedParameters[i].split('=')[1]; // value

			// html 데이터 for 문 실행
			for (let j = 0; j < screenConfigData.length; j++) {
				for (let p = 0; p < screenConfigData[j].length; p++) {
					let _configKey = screenConfigData[j][p].key;
					let _configVal = screenConfigData[j][p].value;
					// console.log(_configKey , _selectKey , _configVal , _selectVal, _configKey === _selectKey && _configVal === _selectVal)
					// 선택한 key, value 값의 해당하는 content 추출
					if (_selectKey === 'Type') {
						if (_configVal === _selectVal) {
							stageCont.push(screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, ''));
							_test += _configKey + ' : ' + screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, '') + '\n'
						}
					} else {
						if (_configKey === _selectKey && _configVal === _selectVal) {
							if (_configVal === 'dummy') {
								stageCont.push(screenConfigData[j][p].sortation + ' ' + screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, ''));
								_test += _configKey + ' : ' + screenConfigData[j][p].sortation + ' ' + screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, '') + '\n'
							} else {
								stageCont.push(screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, ''));
								_test += _configKey + ' : ' + screenConfigData[j][p].content.replace(/(<([^>]+)>)/ig, '') + '\n'
							}
						}
					}
				}
			}
		}
		// !stageLiveDecide && console.debug('확인용 \n' + _test);

		stageIdx = idx + 1;
		stageDesc = 'stage' + stageIdx;
		if (elm === 'last') {
			$finalShowNow.attr('data-link-name', 'Get result');
			$finalShowNow.attr('data-model-description', stageCont);
		} else {
			$showNow.attr('data-link-name', 'r_Btn_' + stageDesc);
			$showNow.attr('data-model-description', stageCont);
		}
	}
	/* @22-07-28 태깅 관련 스크립트 삽입 (e) */

	/* open -------------------------------------------------------------------------------- */
	// 디테일 디스크립션 열기 (Loan More 클릭 버튼)
	$('html').on('click', '#descMoreBtn', function () {
		$descDetailWrap.css('display', 'block');
		$descHeadWrap.css('display', 'none');
		$descDetailWrap.addClass('open');
	});

	// 인터렉티브 팝업 열기
	$('html').on('click', '#interactionBtn', function () {
		let _finStep = currentStep.finderStep;
		$quickFinder.css('display', 'none');
		$('.popup_' + _finStep).css('display', 'block');
		$('.popup_' + _finStep).removeClass().addClass('popup_' + _finStep).addClass('popup_step'); // class 초기화
		$('.popup_' + _finStep).addClass(interactiveClass);
		$(window).scrollTop(headerH);
		if (idx === 6) {
			$('.popup_' + _finStep).find('.txt_wrap img').each(function (i) {
				$(this).attr('src', imgPath + 'step07/' + selectedProduct[0].class + currentStep.productColorImg[i] + '.png');
			});
		}
	});

	// 사이즈 팝업 열기
	$('html').on('click', '.caution_open_btn', function () {
		$popupStp3.css('display', 'flex');
		$('.popup_step03 .popup_wrap > div').css('display', 'none');
		$('.popup_step03 .popup_box').css('display', 'block');
	});

	// 영상 팝업 열기
	$('html').on('click', '#videoMoreBtn', function () {
		$('.popup_movie_step05').css('display', 'block');
	});

	/* close -------------------------------------------------------------------------------- */
	// 디테일 디스크립션 닫기
	$detailCloseBtn.on('click', function () {
		$descDetailWrap.css('display', 'none');
		$descHeadWrap.css('display', 'block');
		$descDetailWrap.removeClass('open');
	})

	// 사이즈 / 영상 팝업 닫기
	$popupClose.on('click', function () {
		$(this).parents('.popup_step').css('display', 'none');
		$('.video_wrap').removeClass('play_video');
		$('.popup_movie_step05 .popup_wrap > div').find('video').each(function (i) {
			$('.popup_movie_step05 .popup_wrap > div').find('video')[i].currentTime = 0;
			$('.popup_movie_step05 .popup_wrap > div').find('video')[i].pause();
		});
	});

	// 인터렉션 페이지 닫기
	$interactionClose.on('click', function () {
		$quickFinder.css('display', 'block');
		$('.popup_step').css('display', 'none');
		$('.popup_' + currentStep.finderStep).removeClass().addClass('popup_' + currentStep.finderStep).addClass('popup_step'); // class 초기화
		$(window).scrollTop(headerH);
	});

	// 인트로 애니메이션 없이 처음으로 돌아가기
	$tryAgain.on('click', function () {
		location.href = currentUrl.split('?')[0] + '?intro=no';
	});

	// 영상 재생 버튼
	$('.video_btn').on('click', function () {
		let _this = $(this);
		if (!_this.parents('.video_wrap').hasClass('play_video')) {
			_this.parents('.video_wrap').addClass('play_video');
			_this.parents('.video_wrap').find('video').get(0).play();
		}
	});

	// 영상 일시 정지
	$('.video_wrap i').on('click', function () {
		let _this = $(this);
		if (_this.parents('.video_wrap').hasClass('play_video')) {
			_this.parents('.video_wrap').removeClass('play_video');
			_this.parents('.video_wrap').find('video').get(0).pause();
		}
	});

	// result 페이지 열기
	function resultChoice() {
		let _last = 'last';
		let _cont; // br 태그 삭제한 content 내용
		let _valueArray = [[], [], [], []]; // content 저장 

		$quickFinder.css('display', 'none');
		$('#finderResult').css('display', 'block');
		$('.center_img_wrap').attr('style', 'background-image: url(' + imgPath + selectedProduct[0].screenImg.resultImg + ');') // 배경 이미지 변경
		$(window).scrollTop(headerH);

		// selectedParameters for 문 실행 
		for (let i = 0; i < selectedParameters.length; i++) {
			let _selectValue = selectedParameters[i].split('=')[1];
			for (let j = 0; j < screenConfigData.length; j++) {
				for (let p = 0; p < screenConfigData[j].length; p++) {
					let Html = screenConfigData[j][p];
					// 선택된 value 와 매칭, resultContent 가 있으면 해당 컨텐츠 추출
					if (Html.value === _selectValue && Html.resultContent !== undefined) {
						_cont = Html.content.replace(/(<([^>]+)>)/ig, ''); // br 태그 삭제
						if (Html.resultContent === 'step01') {
							_valueArray[0].push(_cont);
						} else if (Html.resultContent === 'step05') {
							_valueArray[1].push(_cont);
						} else if (Html.resultContent === 'step06') {
							_valueArray[3].push(_cont);
						} else if (Html.resultContent === 'step07') {
							_valueArray[2].push(_cont);
						}
					}
				}
			}
		}

		// step6에서 아무것도 선택하지 않았을 때 텍스트 변경
		if (_valueArray[3].length < 1) {
			$('#finderResult dl:last-child dt').text('washing machines.');
		}

		// 선택한 content 뿌리기
		for (let i = 0; i < _valueArray.length; i++) {
			let _selectResultTxt = '';
			for (let j = 0; j < _valueArray[i].length; j++) {
				if (i === 0) {
					_selectResultTxt += _valueArray[i][j] + '<span>.</span>';
				} else if (i === 1) {
					if (j !== _valueArray[i].length - 1) {
						_selectResultTxt += _valueArray[i][j] + '<span> & </span>';
					} else {
						_selectResultTxt += _valueArray[i][j] + '<span>.</span>';
					}
				} else if (i === 2) {
					if (j !== _valueArray[i].length - 1) {
						_selectResultTxt += _valueArray[i][j] + '<span>, </span>';
					} else {
						_selectResultTxt += _valueArray[i][j] + '';
					}
				} else if (i === 3) {
					if (j !== _valueArray[i].length - 1) {
						_selectResultTxt += _valueArray[i][j] + '<span> , </span>';
					} else {
						_selectResultTxt += _valueArray[i][j] + '<span>.</span>';
					}
				}
			}
			$('#finderResult .txt_wrap dl').eq(i).append('<dd>' + _selectResultTxt + '</dd>');
		}
		taggingEvent(_last); // 태깅 함수
	}

	// 결과화면01 (shopNow)
	$showNow.on('click', function () {
		$(this).hasClass('active') && resultFunction()
	});
	// 결과화면02 (result Button)
	$finalShowNow.on('click', function () {
		resultFunction();
	});

	// 이미지 pc / mobile 이미지 전환 
	$(window).on('resize', function () {
		if (window.innerWidth >= 1024) {
			imgPath = './images/pc/';
			if (!$qnaImgWrap.css('background-image').includes('pc')) {
				$qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('images')[0] + 'images/pc' + $qnaImgWrap.css('background-image').split('images')[1]);
				$centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('images')[0] + 'images/pc' + $centerImgWrap.css('background-image').split('images')[1])
				$descIcon.css('background-image', $descIcon.css('background-image').split('images')[0] + 'images/pc' + $descIcon.css('background-image').split('images')[1])
			}
		} else {
			imgPath = './images/';
			if ($qnaImgWrap.css('background-image').includes('pc')) {
				$qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('/pc/')[0] + '/' + $qnaImgWrap.css('background-image').split('/pc/')[1]);
				$centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('/pc/')[0] + '/' + $centerImgWrap.css('background-image').split('/pc/')[1]);
				$descIcon.css('background-image', $descIcon.css('background-image').split('/pc/')[0] + '/' + $descIcon.css('background-image').split('/pc/')[1]);
			}
		}
	});

	// 화면 스크롤 정의
	$(window).on('unload', function () {
		$(window).scrollTop(headerH);
	});
}