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