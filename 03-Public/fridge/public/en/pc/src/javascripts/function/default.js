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

let Capacity_value1 = 'Capacity_value1';
let Capacity_value2 = 'Capacity_value2';
let Capacity_value3 = 'Capacity_value3';

let Depth_value1 = 'Depth_value1';

let Width_value1 = 'Width_value1';
let Width_value2 = 'Width_value2';
let Width_value3 = 'Width_value3';

let Height_value1 = 'Height_value1';
let Height_value2 = 'Height_value2';
let Height_value3 = 'Height_value3';

let EnergyGrade_value1 = 'EnergyGrade_value1';
let EnergyGrade_value2 = 'EnergyGrade_value2';
let EnergyGrade_value3 = 'EnergyGrade_value3';
let EnergyGrade_value4 = 'EnergyGrade_value4';
let EnergyGrade_value5 = 'EnergyGrade_value5';

let ThinQ_value1 = 'ThinQ_value1';

let Feature_value1 = 'Feature_value1';
let Feature_value2 = 'Feature_value2';
let Feature_value3 = 'Feature_value3';
let Feature_value4 = 'Feature_value4';
let Feature_value5 = 'Feature_value5';
let Feature_value6 = 'Feature_value6';
let Feature_value7 = 'Feature_value7';
let Feature_value8 = 'Feature_value8';
let Feature_value9 = 'Feature_value9';
let Feature_value10 = 'Feature_value10';
let Feature_value11 = 'Feature_value11';
let Feature_value12 = 'Feature_value12';
let Feature_value13 = 'Feature_value13';

let Color_value1 = 'Color_value1';
let Color_value2 = 'Color_value2';
let Color_value3 = 'Color_value3';

let Dummy = 'dummy';

/* 변수 정의 end -------------------------------*/

// 제품 키 / 벨류
const product = {
	//  Multi Door Fridge Freezer
	'LSR100': { // 1
		Type: Type_value1,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_value2,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value11, Feature_value6, Feature_value1, Feature_value2, Feature_value8, Feature_value9],
		Color: Color_value3
	},
	'GMX945MC9F': {// 2
		Type: Type_value1,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_value1,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value11, Feature_value6, Feature_value1, Feature_value2, Feature_value7, Feature_value8, Feature_value9, Feature_value5],
		Color: Color_value2
	},
	'GML945PZ8F': {// 3
		Type: Type_value1,
		Capacity: Capacity_value1,
		Depth: Depth_value1,
		Width: Width_value1,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_value1,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value11, Feature_value6, Feature_value1, Feature_value2, Feature_value7, Feature_value5],
		Color: Color_value1,
	},
	'GMX844MC6F': {// 4
		Type: Type_value1,
		Capacity: Capacity_value2,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_value1,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value11, Feature_value6, Feature_value1, Feature_value2, Feature_value7, Feature_value8, Feature_value9, Feature_value5],
		Color: Color_value2,
	},
	'GML844PZ6F': {// 5
		Type: Type_value1,
		Capacity: Capacity_value2,
		Depth: Depth_value1,
		Width: Width_value2,
		Height: Height_value1,
		EnergyGrade: EnergyGrade_value1,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value11, Feature_value6, Feature_value1, Feature_value2, Feature_value7, Feature_value5],
		Color: Color_value1,
	},

	// // American Style Fridge Freezer
	// 'GSXV91MCAE': { //1
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value6,Feature_value1,Feature_value2,Feature_value8,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value2' // Color
	// },
	// 'GSXV90MCAE': { //2
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2,Feature_value8,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value2' // Color
	// },
	// 'GSXV91BSAE': { //3
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value6,Feature_value1,Feature_value2,Feature_value8,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSXV90BSAE': { //4
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2,Feature_value8,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSJV91BSAE': { //5
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value6,Feature_value1,Feature_value2,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSJV91PZAE': { //6
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value6,Feature_value1,Feature_value2,Feature_value9,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLV91PZAE': { //7
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value6,Feature_value1,Feature_value2,Feature_value10,Feature_value3', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLD81PZRF': { //8
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2,Feature_value7,Feature_value9,Feature_value10', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLD80PZRF': { //9
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSJV70PZTF': { //10
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2,Feature_value9', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLA81PZLF': { //11
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value2,Feature_value1,Feature_value6,Feature_value3,ThinQ_value1', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLA80PZLF': { //12
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6,Feature_value3,ThinQ_value1', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLV71MCTF': { //13
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value2,Feature_value1,Feature_value6,ThinQ_value1', // Feature
	// 	Color: 'Color_value2' // Color
	// },
	// 'GSLV70MCTF': { //14
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6,ThinQ_value1', // Feature
	// 	Color: 'Color_value2' // Color
	// },
	// 'GSLV71PZTF': { //15
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value1', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value12,Feature_value2,Feature_value1,Feature_value6,ThinQ_value1', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLV70PZTF': { //16
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6,Feature_value7,Feature_value9,ThinQ_value1', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLV50DSXM': { //17
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSLD50DSXM': { //18
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value6,Feature_value1,Feature_value2', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSBV70DSTF': { //19
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSI960PZVV': { //20
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: 'ThinQ_value1', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6,Feature_value7,Feature_value8,Feature_value9,Feature_value10,Feature_value3,ThinQ_value1', // Feature
	// 	Color: 'Color_value1' // Color
	// },
	// 'GSXV90MCDE': { //21
	// 	Type: 'Type_value2', // Type
	// 	Capacity: 'Capacity_value1', // Capacity
	// 	Depth: 'Depth_value1', // Depth
	// 	Width: 'Width_value1', // Width
	// 	Height: 'Height_value1', // Height
	// 	EnergyGrade: 'EnergyGrade_value2', // Energy Grade
	// 	SmartTechnology: '', // Smart Technology (ThinQ(Wi-Fi))
	// 	Feature: 'dummy,Feature_value11,Feature_value2,Feature_value1,Feature_value6,Feature_value8,Feature_value9,Feature_value10,Feature_value3,ThinQ_value1', // Feature
	// 	Color: 'Color_value2' // Color
	// },

	//Tall Fridge Freezer
	'GBB92MCBAP': { //1
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value5,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4, Feature_value5],
		Color: Color_value2
	},
	'GBB92STAXP': { //2
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value3,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4, Feature_value5],
		Color: Color_value3
	},
	'GBB72MCUFN': { //3
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value3,
		SmartTechnology: ThinQ_value1,
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4, Feature_value5],
		Color: Color_value2
	},
	'GBB62PZGCC': { //4
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value4,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4],
		Color: Color_value1
	},
	'GBB72PZEFN': { //5
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value3,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4, Feature_value5],
		Color: Color_value1
	},
	'GBD62PZYFN': { //6
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value3,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4],
		Color: Color_value1
	},
	'GBB62PZGFN': { //7
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_value3,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value3, Feature_value4],
		Color: Color_value1
	},
	'GBF62PZJMN': { //8
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value2,
		EnergyGrade: EnergyGrade_value2,
		SmartTechnology: '',
		Feature: [Feature_value6, Feature_value1, Feature_value2, Feature_value4, Feature_value13],
		Color: Color_value1
	},
	'GBB61DSJEN': { //9
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_value2,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2],
		Color: Color_value1
	},
	'GBB61BLJEC': { //10
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_value2,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value4],
		Color: Color_value2
	},
	'GBB61SWJEC': { //11
		Type: Type_value3,
		Capacity: Capacity_value3,
		Depth: Depth_value1,
		Width: Width_value3,
		Height: Height_value3,
		EnergyGrade: EnergyGrade_value2,
		SmartTechnology: '',
		Feature: [Dummy, Feature_value6, Feature_value1, Feature_value2, Feature_value4],
		Color: Color_value3
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
				changeScreenImg: 'step02/que_img03.png',
				lastScreenImg: 'step07/tall_que_img04.png',
				resultImg: 'result/center_img03.png',
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
				value: 'Type_value1',
				content: 'Multi Door Fridge Freezer',
				changeData: {
					description: 'Multi doors with a full-width fridge above and the freezer below.',
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
				value: 'Type_value2',
				content: 'American Style Fridge Freezer',
				changeData: {
					description: 'A two-door model, with fridge and freezer standing side by side.',
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
				value: 'Type_value3',
				content: 'Tall Fridge Freezer',
				changeData: {
					description: 'Slimline with fridge on top and freezer below.',
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
				value: 'Capacity_value3',
				content: 'Under 450L',
				changeData: {
					description: 'A practical choice for infrequent fridge users or people who buy smaller quantities of food at a time.',
					icon: 'step02/disc_icon01.png',
				}
			},
			{
				key: 'Capacity',
				value: 'Capacity_value2',
				content: '500-600L',
				changeData: {
					description: 'A frequently chosen option for many households.',
					icon: 'step02/disc_icon02.png',
				}
			},
			{
				key: 'Capacity',
				value: 'Capacity_value1',
				content: '600L or more',
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
				value: 'Depth_value1',
				content: 'UNDER <em>760</em>mm <br>(COUNTER DEPTH)',
				changeData: {
					description: {
						head: 'A guide to measuring your fridge space.',
						detail: 'Calculate how much space you have for your fridge. Doors require (25-50mm) space to open and ventilate. All LG fridges are counter-depth and offer a slender, complementary structure. Cold or hot spots are not advised.'
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
				content: '<em>760</em>mm OR MORE <br>(STANDARD DEPTH)'
			}
		],
		[
			{
				key: 'Width',
				value: 'Width_value3',
				content: 'UNDER <br><em>600</em>mm',
			},
			{
				key: 'Width',
				value: 'Width_value2',
				content: '<em>600</em> ~ <br><em>900</em>mm',
			},
			{
				key: 'Width',
				value: 'Width_value1',
				content: '<em>900</em>mm <br>OR MORE',
			},
		],
		[
			{
				key: 'Height',
				value: 'Height_value1',
				content: 'UNDER <br><em>1800</em>mm',
			},
			{
				key: 'Height',
				value: 'Height_value3',
				content: '<em>1800</em> ~ <br><em>2000</em>mm',
			},
			{
				key: 'Height',
				value: 'Height_value2',
				content: '<em>2000</em>mm <br>OR MORE',
			},
		],
		//4번 스탭
		[
			{
				key: 'Feature',
				value: 'Feature_value11',
				content: 'Plumbed',
				changeData: {
					description: 'Get handy access to water and ice without refilling the water tank.',
					screenImg: 'step04/que_img02.png',
				}
			},
			{
				key: 'Feature',
				value: 'Feature_value12',
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
				value: 'Feature_value13',
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
		],
		//5번스탭
		[
			{
				key: 'Feature',
				value: 'Feature_value6,Feature_value1,Feature_value2',
				content: 'Long-lasting freshness',
				changeData: {
					description: 'Enjoy fresh food with LG’s temperature control and cooling technology. ',
					screenImg: 'step05/que_img02.png',
					learnMore: {
						videoPopup: 'long',
					},
				},
				resultContent: 'step05',

			},
			{
				key: 'Feature',
				value: 'Feature_value7',
				content: 'Ventilation',
				changeData: {
					description: 'Pure N Fresh minimises food odours and keeps the air fresh inside your fridge.',
					screenImg: 'step05/que_img03.png',
					learnMore: {
						videoPopup: 'ventilation',
					},
				},
				resultContent: 'step05',
			},
			{
				key: 'EnergyGrade',
				value: 'EnergyGrade_value5,EnergyGrade_value4',
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
		],
		//6번 스탭
		[
			{
				key: 'Feature',
				value: 'Feature_value8',
				content: 'InstaView™</br> Door-in-Door®',
				changeData: {
					description: 'Knock twice to see inside while keeping your fridge cool and saving energy.',
					screenImg: 'step06/que_img02.png',
					learnMore: {
						videoPopup: 'instaview',
					},
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: 'Feature_value9',
				content: 'Door-in-Door®',
				changeData: {
					description: 'Easy-access opening system allows you to quickly reach your favourite foods.',
					screenImg: 'step06/que_img03.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: 'Feature_value10',
				content: 'Extra storage',
				changeData: {
					description: {
						head: 'Extra space for easy access to frequently used items.',
						detail: 'Extra compartments like the Smart Storage system, Retractable Shelf and others offer efficient ways to store small items like deli meat, snacks and butter.'
					},
					screenImg: 'step06/que_img04.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: 'Feature_value4',
				content: 'Reversible door',
				changeData: {
					description: 'The reversible door lets you customize your appliance to fit in the given space. Prevents your refrigerator door from getting dinged and scratched.',
					screenImg: 'step06/que_img05.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: 'Feature_value5',
				content: 'Folding shelf',
				changeData: {
					description: 'Simply adjust the shelf by sliding it back when you are storing tall and bulky bottles or pots',
					screenImg: 'step06/que_img06.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: 'Feature_value3',
				content: 'Wine rack',
				changeData: {
					description: 'Built-in wine rack provides the perfect place to keep chilled bottles of your favourite wine or beverage - always on hand and easy to get to from your fridge shelf.',
					screenImg: 'step06/que_img07.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'SmartTechnology',
				value: 'ThinQ_value1',
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
				value: 'Color_value2',
				content: 'Black',
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
				value: 'Color_value3',
				content: 'Stainless steel',
				changeData: {
					description: 'A graceful look that’s also easy to maintain.',
					screenImg: 'que_img02.png',
					learnMore: {
						interactionPage: 'stainless_steel',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: 'Color_value1',
				content: 'Silver',
				changeData: {
					description: 'Complementing diverse styles, silver is a simple way to add style to your kitchen.',
					screenImg: 'que_img03.png',
					learnMore: {
						interactionPage: 'silver',
					},
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: 'FV65319316',
				content: 'White',
				changeData: {
					description: 'A nice touch or a backdrop for any environment.',
					screenImg: 'que_img04.png',
					learnMore: {
						interactionPage: 'white',
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