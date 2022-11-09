"use strict";
let idx = 0; // step idx
let stepCount = []; // 스텝별 카운트
let selectedParameters = []; // 사용자 선택한 key,value 
let matchingProducts = []; // 스텝별 매칭된 제품
let currentStep; // 현재 스텝 데이터 
let selectedProduct; // 셀렉된 제품 데이터 
let interactiveClass; // 인터렉티브 매칭 class

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

/* 변수 정의 start -------------------------------*/
let Type_value1 = 'Type_value1';
let Type_value2 = 'Type_value2';
let Type_value3 = 'Type_value3';
let Type_value4 = 'Type_value4';
let Type_value5 = 'Type_value5';

let Capacity_value1 = 'Capacity_value1';
let Capacity_value2 = 'Capacity_value2';
let Capacity_value3 = 'Capacity_value3';
let Capacity_value4 = 'Capacity_value4';

let Depth_value1 = 'Depth_value1';

let Width_value1 = 'Width_value1';
let Width_value2 = 'Width_value2';
let Width_value3 = 'Width_value3';

let Height_value1 = 'Height_value1';
let Height_value2 = 'Height_value2';
let Height_value3 = 'Height_value3';

let Plumbed = 'Plumbed';
let Non_Plumbed = 'Non_Plumbed';
let Water_Only = 'Water_Only';

let Door_cooling = 'Door_cooling';
let Linearcooling = 'Linearcooling';
let Pure_N_Fresh = 'Pure_N_Fresh';
let EnergyGrade_A = 'EnergyGrade_A';
let EnergyGrade_B = 'EnergyGrade_B';
let EnergyGrade_C = 'EnergyGrade_C';
let EnergyGrade_D = 'EnergyGrade_D';
let EnergyGrade_E = 'EnergyGrade_E';

let Instaview = 'Instaview';
let Door_in_Door = 'Door_in_Door';
let Wine_Rack = 'Wine_Rack';
let Folding_Shelf = 'Folding_Shelf';
let Reversible_Door = 'Reversible_Door';

let ThinQ = 'ThinQ';

let Color_value1 = 'Color_value1';
let Color_value2 = 'Color_value2';
let Color_value3 = 'Color_value3';
let Color_value4 = 'Color_value4';

let Dummy = 'dummy';
let AllSelectOption = 'AllSelectOption';

/* 변수 정의 end -------------------------------*/

// 제품 키 / 벨류
const product = {
	// Multidoor
	'product1': { //1
		Type: Type_value1,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_A,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Instaview, Folding_Shelf, Reversible_Door, Linearcooling, Wine_Rack],
		Color: Color_value2
	},
	'product2': { //1
		Type: Type_value1,
		Capacity: Capacity_value2,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_C,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Instaview, Folding_Shelf, Linearcooling, Reversible_Door],
		Color: Color_value3
	},
	'product3': { //1
		Type: Type_value1,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_C,
		SmartTechnology: '',
		Feature: [Water_Only, Instaview, Reversible_Door, Linearcooling, Wine_Rack],
		Color: Color_value4
	},

	// Side-by-Side
	'product4': { //1
		Type: Type_value2,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_C,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Wine_Rack, Reversible_Door],
		Color: Color_value1
	},
	'product5': { //1
		Type: Type_value2,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_C,
		SmartTechnology: ThinQ,
		Feature: [Non_Plumbed, Door_cooling, Pure_N_Fresh, Wine_Rack, Reversible_Door],
		Color: Color_value3
	},
	'product6': { //1
		Type: Type_value2,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_B,
		SmartTechnology: '',
		Feature: [Plumbed, Door_cooling, Instaview, Linearcooling, Folding_Shelf, Wine_Rack, Reversible_Door],
		Color: Color_value2
	},

	// Combinati
	'product7': { //1
		Type: Type_value3,
		Capacity: Capacity_value4,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_D,
		SmartTechnology: '',
		Feature: [Water_Only, Pure_N_Fresh, Door_in_Door, Folding_Shelf, Reversible_Door, Wine_Rack],
		Color: Color_value2
	},
	'product8': { //1
		Type: Type_value3,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_A,
		SmartTechnology: '',
		Feature: [Non_Plumbed, Pure_N_Fresh, Door_in_Door, Folding_Shelf, Reversible_Door, Wine_Rack],
		Color: Color_value1
	},
	'product9': { //1
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_C,
		SmartTechnology: '',
		Feature: [Non_Plumbed, Pure_N_Fresh, Door_in_Door, Reversible_Door, Wine_Rack],
		Color: Color_value4
	},

	// Doppia Porta
	'product10': { //1
		Type: Type_value4,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_B,
		SmartTechnology: '',
		Feature: [Plumbed, Door_in_Door, Reversible_Door, Instaview, Reversible_Door, Door_cooling, Linearcooling, Pure_N_Fresh],
		Color: Color_value1
	},
	'product11': { //1
		Type: Type_value4,
		Capacity: Capacity_value4,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_E,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Door_in_Door, Reversible_Door, Instaview, Reversible_Door, Door_cooling, Linearcooling],
		Color: Color_value1
	},
	'product12': { //1
		Type: Type_value4,
		Capacity: Capacity_value2,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_E,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Reversible_Door, Instaview, Reversible_Door, Door_cooling, Linearcooling, Wine_Rack],
		Color: Color_value1
	},

	// Maxi Side by Side
	'product13': { //1
		Type: Type_value5,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_A,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Instaview, Folding_Shelf, Reversible_Door, Wine_Rack, Pure_N_Fresh],
		Color: Color_value4
	},
	'product14': { //1
		Type: Type_value5,
		Capacity: Capacity_value2,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_B,
		SmartTechnology: ThinQ,
		Feature: [Non_Plumbed, Instaview, Folding_Shelf, Reversible_Door, Wine_Rack, Door_in_Door],
		Color: Color_value4
	},
	'product15': { //1
		Type: Type_value5,
		Capacity: Capacity_value4,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_A,
		SmartTechnology: ThinQ,
		Feature: [Plumbed, Instaview, Folding_Shelf, Reversible_Door, Linearcooling],
		Color: Color_value4
	},
}

const configData = {
	// 제품 정보 정의
	object: [
		{
			key: 'Type_value1',
			class: 'multi',
			screenImg: {
				changeScreenImg: 'step02/que_img01.png',
				lastScreenImg: 'step07/multi_que_img04.png',
				resultImg: 'result/center_img01.png',
			}
		},
		{
			key: 'Type_value2',
			class: 'american',
			screenImg: {
				changeScreenImg: 'step02/que_img02.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img02.png',
			}
		},
		{
			key: 'Type_value3',
			class: 'tall',
			screenImg: {
				changeScreenImg: 'step02/que_img02.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img02.png',
			}
		},
		{
			key: 'Type_value4',
			class: 'tall2',
			screenImg: {
				changeScreenImg: 'step02/que_img02.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img02.png',
			}
		},
		{
			key: 'Type_value5',
			class: 'tall3',
			screenImg: {
				changeScreenImg: 'step02/que_img02.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img02.png',
			}
		}
	],
	// 질문페이지 사전 정의 
	finderSetting: [
		// 제품 선택
		{
			finderStep: 'step01',
			questionText: 'What type of fridge are </br>you looking for?',
			defaultScreenImg: 'step01/que_img00.png',
		},
		{
			finderStep: 'step02',
			questionText: 'What capacity do you need?',
		},
		{
			finderStep: 'step03',
			questionText: 'Which size best fits </br>your space?',
			key: ['Depth', 'Width', 'Height'],
		},
		{
			finderStep: 'step04',
			questionText: 'Do you need a fridge </br>with an Ice & Water Dispenser?',
			defaultScreenImg: 'step04/que_img01.png',
		},
		{
			finderStep: 'step05',
			questionText: 'Which aspect of fridge </br>performance is most important for you?',
			defaultScreenImg: 'step05/que_img01.png',
		},
		{
			finderStep: 'step06',
			questionText: 'Which features </br>do you want from your fridge?',
			defaultScreenImg: 'step06/que_img01.png',
		},
		{
			finderStep: 'step07',
			questionText: 'Which colour theme </br>matches your interior?',
			productColorImg: ['_black_popup_img', '_steel_popup_img', '_silver_popup_img', '_white_popup_img'], // step07 인터렉션 페이지 컬러매칭 이미지 뿌리기
		},
	],
	// 페이지 데이터 정의
	htmlData: [
		//1번 스탭
		[
			{
				key: 'Type',
				value: Type_value1,
				content: 'Type_content1',
				changeData: {
					description: 'Multi doors with a full-width Refrigerator above and the freezer below.',
					screenImg: 'step01/que_img01.png',
					learnMore: {
						interactionPage: 'multi',
						// additionalDesc: true,
						// videoPopup: true,
					},
				},
				resultContent: 'step01',
			},
			{
				key: 'Type',
				value: Type_value2,
				content: 'Type_content2',
				changeData: {
					description: 'A two-door model, with Refrigerator and freezer standing side by side.',
					screenImg: 'step01/que_img02.png',
					learnMore: {
						interactionPage: 'american',
						// additionalDesc: true,
						// videoPopup: true,
					},
				},
				resultContent: 'step01',
			},
			{
				key: 'Type',
				value: Type_value3,
				content: 'Type_content3',
				changeData: {
					description: 'A slimline model with Refrigerator on top and freezer below.',
					screenImg: 'step01/que_img03.png',
					learnMore: {
						interactionPage: 'tall',
						// additionalDesc: true,
						// videoPopup: true,
					},
				},
				resultContent: 'step01',
			},
			{
				key: 'Type',
				value: Type_value4,
				content: 'Type_content4',
				changeData: {
					description: 'A two-door model with a freezer on top and a refrigerator on the bottom.',
					screenImg: 'step01/que_img03.png',
					learnMore: {
						interactionPage: 'tall',
						// additionalDesc: true,
						// videoPopup: true,
					},
				},
				resultContent: 'step01',
			},
			{
				key: 'Type',
				value: Type_value5,
				content: 'Type_content5',
				changeData: {
					description: 'A smart solution for those who require a seperate fridge or freezer for the sake of space or convenience. ',
					screenImg: 'step01/que_img03.png',
					learnMore: {
						interactionPage: 'tall',
						// additionalDesc: true,
						// videoPopup: true,
					},
				},
				resultContent: 'step01',
			},
		],
		//2번 스탭
		[
			{
				key: 'Capacity',
				value: Capacity_value1,
				content: 'Capacity_content1',
				changeData: {
					description: 'A practical choice for infrequent fridge users or people who buy smaller quantities of food at a time.',
					icon: 'step02/disc_icon01.png',
				}
			},
			{
				key: 'Capacity',
				value: Capacity_value2,
				content: 'Capacity_content2',
				changeData: {
					description: 'A frequently chosen option for many households.',
					icon: 'step02/disc_icon02.png',
				}
			},
			{
				key: 'Capacity',
				value: 'Capacity_value3',
				content: 'Capacity_content3',
				changeData: {
					description: 'For those who do a big grocery shop, or share the fridge with many others.',
					icon: 'step02/disc_icon03.png',
				}
			},
			{
				key: 'Capacity',
				value: Capacity_value4,
				content: 'Capacity_content4',
				changeData: {
					description: 'For those who do a big grocery shop, or share the fridge with many others.',
					icon: 'step02/disc_icon03.png',
				}
			},
			{
				key: 'Capacity',
				value: AllSelectOption,
				content: 'Select ALL Options',
				changeData: {
					description: 'For those who do a big grocery shop, or share the fridge with many others.',
					icon: 'step02/disc_icon03.png',
				}
			},
		],
		//3번 스탭
		[
			{
				key: 'Depth',
				value: Depth_value1,
				content: 'Depth_value1',
				changeData: {
					description: {
						head: 'head',
						detail: 'detail'
					},
					learnMore: {
						additionalDesc: true,
					},
					icon: 'step03/disc_icon01.png',
				}
			},
			{
				key: '',
				value: Dummy,
				content: 'Depth_value2'
			}
		],
		[
			{
				key: 'Width',
				value: Width_value1,
				content: 'Width_content1',
			},
			{
				key: 'Width',
				value: Width_value2,
				content: 'Width_content2',
			},
			{
				key: 'Width',
				value: Width_value3,
				content: 'Width_content3',
			},
			{
				key: 'Width',
				value: AllSelectOption,
				content: 'AllSelectOption',
			},
		],
		[
			{
				key: 'Height',
				value: Height_value1,
				content: 'Height_content1',
			},
			{
				key: 'Height',
				value: Height_value2,
				content: 'Height_content2',
			},
			{
				key: 'Height',
				value: Height_value3,
				content: 'Height_content3',
			},
			{
				key: 'Height',
				value: AllSelectOption,
				content: 'AllSelectOption',
			},
		],
		//4번 스탭
		[
			{
				key: 'Feature',
				value: Plumbed,
				content: 'Plumbed',
				changeData: {
					description: 'Get handy access to water and ice without refilling the water tank.',
					screenImg: 'step04/que_img02.png',
				}
			},
			{
				key: 'Feature',
				value: Non_Plumbed,
				content: 'Non Plumbed',
				changeData: {
					description: {
						head: 'Refillable water tanks connected to the dispenser.',
						detail: 'When connecting to a direct water supply isn’t feasible, non-plumbed fridges offer the convenient alternative of refillable water tanks connected to a door-mounted dispenser.'
					},
					screenImg: 'step04/que_img03.png',
				}
			},
			{
				key: 'Feature',
				value: Water_Only,
				content: 'Non Plumbed (Water only)',
				changeData: {
					description: {
						head: 'Enjoy chilled water straight from your fridge.',
						detail: 'A handy way to enjoy chilled water from your freezer through a built-in refillable water tank.'
					},
					screenImg: 'step04/que_img04.png',
				}
			},
			{
				key: 'Feature',
				value: 'dummy',
				content: 'Doesn’t matter to me, </br>I’d like to see all models.',
				DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
				changeData: {
					description: 'Doesn’t matter to me, I’d like to see all models.',
					screenImg: 'step04/que_img01.png',
				}
			},
			{
				key: 'Feature',
				value: AllSelectOption,
				content: 'AllSelectOption',
				DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
				changeData: {
					description: 'AllSelectOption',
					screenImg: 'step04/que_img01.png',
				}
			},
		],
		//5번스탭
		[
			{
				key: 'Feature',
				value: 'Door_cooling,Linearcooling',
				content: 'Long-lasting freshness',
				changeData: {
					description: 'asas',
					screenImg: 'step05/que_img02.png',
					learnMore: {
						videoPopup: 'long',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'Feature',
				value: Pure_N_Fresh,
				content: 'Ventilation',
				changeData: {
					description: 'asas',
					screenImg: 'step05/que_img03.png',
					learnMore: {
						videoPopup: 'ventilation',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'EnergyGrade',
				value: 'EnergyGrade_A,EnergyGrade_B,EnergyGrade_C',
				content: 'A or better Energy Ratings',
				changeData: {
					description: {
						head: 'Save energy, save money',
						detail: 'The LG Inverter Linear Compressor™ saves you energy by efficiently maintaining ideal temperatures inside your fridge freezer.'
					},
					screenImg: 'step05/que_img04.png',
				},
				resultContent: 'step05',
			},
			{
				key: 'EnergyGrade',
				value: AllSelectOption,
				content: 'AllSelectOption',
				changeData: {
					description: {
						head: 'asas',
						detail: 'asas'
					},
					screenImg: 'step05/que_img04.png',
				},
			},
		],
		//6번 스탭
		[
			{
				key: 'Feature',
				value: Instaview,
				content: 'InstaView™</br> Door-in-Door®',
				changeData: {
					description: 'Knock twice to see inside while keeping your fridge cool and saving energy.',
					screenImg: 'step06/que_img02.png',
					// learnMore: {
					// 	videoPopup: 'instaview',
					// },
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Door_in_Door,
				content: 'Door-in-Door®',
				changeData: {
					description: 'Easy-access opening system allows you to quickly reach your favourite foods.',
					screenImg: 'step06/que_img03.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Reversible_Door,
				content: 'Reversible door',
				changeData: {
					description: 'The reversible door lets you customize your appliance to fit in the given space. Prevents your refrigerator door from getting dinged and scratched.',
					screenImg: 'step06/que_img05.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Folding_Shelf,
				content: 'Folding shelf',
				changeData: {
					description: 'Simply adjust the shelf by sliding it back when you are storing tall and bulky bottles or pots',
					screenImg: 'step06/que_img06.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Wine_Rack,
				content: 'Wine rack',
				changeData: {
					description: 'Built-in wine rack provides the perfect place to keep chilled bottles of your favourite wine or beverage - always on hand and easy to get to from your fridge shelf.',
					screenImg: 'step06/que_img07.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'SmartTechnology',
				value: ThinQ,
				content: 'Smart/AI features',
				changeData: {
					description: 'Control your wi-fi enabled LG smart fridge remotely via your smartphone using the LG ThinQ™ app.',
					screenImg: 'step06/que_img08.png',
					learnMore: {
						videoPopup: 'smart_ai_features',
					},
				},
				resultContent: 'step06',
			},
		],
		//7번 스탭
		[
			{
				key: 'Color',
				value: Color_value1,
				content: '1',
				changeData: {
					description: 'A chic, stylish colour that is both eye-catching and luxurious.',
					screenImg: 'que_img01.png',
					learnMore: {
						interactionPage: 'black',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: Color_value2,
				content: '2',
				changeData: {
					description: 'A graceful look that’s also easy to maintain.',
					screenImg: 'que_img02.png',
					// learnMore: {
					// 	interactionPage: 'stainless_steel',
					// },
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: Color_value3,
				content: '3',
				changeData: {
					description: 'Complementing diverse styles, silver is a simple way to add style to your kitchen.',
					screenImg: 'que_img03.png',
					// learnMore: {
					// 	interactionPage: 'silver',
					// },
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: Color_value4,
				content: '4',
				changeData: {
					description: 'A nice touch or a backdrop for any environment.',
					screenImg: 'que_img04.png',
					// learnMore: {
					// 	interactionPage: 'white',
					// },
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

		// result
		'./images/pc/result/bg_unit.jpg',
		'./images/pc/result/center_img01.png',
		'./images/pc/result/center_img02.png',
		'./images/pc/result/center_img03.png',

		// step01
		'./images/pc/step01/btn_icon01.png',
		'./images/pc/step01/btn_icon01_on.png',
		'./images/pc/step01/btn_icon02.png',
		'./images/pc/step01/btn_icon02_on.png',
		'./images/pc/step01/btn_icon03.png',
		'./images/pc/step01/btn_icon03_on.png',
		'./images/pc/step01/popup_contents_img01.png',
		'./images/pc/step01/popup_contents_img02.png',
		'./images/pc/step01/popup_contents_img03.png',
		'./images/pc/step01/popup_icon01.png',
		'./images/pc/step01/popup_icon02.png',
		'./images/pc/step01/popup_icon03.png',
		'./images/pc/step01/que_img00.png',
		'./images/pc/step01/que_img01.png',
		'./images/pc/step01/que_img02.png',
		'./images/pc/step01/que_img03.png',
		'./images/pc/step01/txt_bubble_icon.png',

		// step02
		'./images/pc/step02/btn_icon01.png',
		'./images/pc/step02/btn_icon01_on.png',
		'./images/pc/step02/btn_icon02.png',
		'./images/pc/step02/btn_icon02_on.png',
		'./images/pc/step02/btn_icon03.png',
		'./images/pc/step02/btn_icon03_on.png',
		'./images/pc/step02/disc_icon01.png',
		'./images/pc/step02/disc_icon02.png',
		'./images/pc/step02/disc_icon03.png',
		'./images/pc/step02/que_img01.png',
		'./images/pc/step02/que_img02.png',
		'./images/pc/step02/que_img03.png',
		'./images/pc/step02/txt_bubble_icon.png',

		// step03
		'./images/pc/step03/caution_icon.png',
		'./images/pc/step03/disc_icon01.png',
		'./images/pc/step03/popup_img01_1.jpg',
		'./images/pc/step03/popup_img01_2.jpg',
		'./images/pc/step03/popup_img02_1.jpg',
		'./images/pc/step03/popup_img02_2.jpg',
		'./images/pc/step03/popup_img03_1.jpg',

		// step04
		'./images/pc/step04/btn_icon01.png',
		'./images/pc/step04/btn_icon02.png',
		'./images/pc/step04/btn_icon03.png',
		'./images/pc/step04/que_img01.png',
		'./images/pc/step04/que_img02.png',
		'./images/pc/step04/que_img03.png',
		'./images/pc/step04/que_img04.png',

		// step05
		'./images/pc/step05/btn_icon01.png',
		'./images/pc/step05/btn_icon02.png',
		'./images/pc/step05/btn_icon03.png',
		'./images/pc/step05/que_img01.png',
		'./images/pc/step05/que_img02.png',
		'./images/pc/step05/que_img03.png',
		'./images/pc/step05/que_img04.png',

		// step06
		'./images/pc/step06/btn_icon01.png',
		'./images/pc/step06/btn_icon02.png',
		'./images/pc/step06/btn_icon03.png',
		'./images/pc/step06/btn_icon04.png',
		'./images/pc/step06/btn_icon05.png',
		'./images/pc/step06/btn_icon06.png',
		'./images/pc/step06/btn_icon07.png',
		'./images/pc/step06/que_img01.png',
		'./images/pc/step06/que_img02.png',
		'./images/pc/step06/que_img03.png',
		'./images/pc/step06/que_img04.png',
		'./images/pc/step06/que_img05.png',
		'./images/pc/step06/que_img06.png',
		'./images/pc/step06/que_img07.png',
		'./images/pc/step06/que_img08.png',

		// step07
		'./images/pc/step07/american_black_popup_img.png',
		'./images/pc/step07/american_que_img01.png',
		'./images/pc/step07/american_que_img02.png',
		'./images/pc/step07/american_que_img03.png',
		'./images/pc/step07/american_que_img04.png',
		'./images/pc/step07/american_silver_popup_img.png',
		'./images/pc/step07/american_steel_popup_img.png',
		'./images/pc/step07/american_white_popup_img.png',
		'./images/pc/step07/multi_black_popup_img.png',
		'./images/pc/step07/multi_que_img01.png',
		'./images/pc/step07/multi_que_img02.png',
		'./images/pc/step07/multi_que_img03.png',
		'./images/pc/step07/multi_que_img04.png',
		'./images/pc/step07/multi_silver_popup_img.png',
		'./images/pc/step07/multi_steel_popup_img.png',
		'./images/pc/step07/multi_tall_popup_img.png',
		'./images/pc/step07/multi_white_popup_img.png',
		'./images/pc/step07/tall_black_popup_img.png',
		'./images/pc/step07/tall_que_img01.png',
		'./images/pc/step07/tall_que_img02.png',
		'./images/pc/step07/tall_que_img03.png',
		'./images/pc/step07/tall_que_img04.png',
		'./images/pc/step07/tall_silver_popup_img.png',
		'./images/pc/step07/tall_steel_popup_img.png',
	]);
}
intro();
main();