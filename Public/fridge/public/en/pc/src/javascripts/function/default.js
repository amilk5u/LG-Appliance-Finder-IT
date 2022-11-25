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
// product
let multi = 'multi';
let american = 'american';
let tall = 'tall';
let double = 'double';
let lader = 'lader';

// capacity
let under_400L = 'under_400L';
let _400L_500L = '_400L_500L';
let _500L_600L = '_500L_600L';
let _600L_or_more = '_600L_or_more';

// depth
let under_760mm = 'under_760mm';

// width
let under_600mm = 'under_600mm';
let _610mm_800mm = '_610mm_800mm';
let _810_900mm = '_810_900mm';
let _910mm_or_more = '_910mm_or_more';

// height
let under_1800mm = 'under_1800mm';
let _1800_2000mm = '_1800_2000mm';
let _2000mm_or_more = '_2000mm_or_more';

let Plumbed = 'Plumbed';
let Non_Plumbed = 'Non_Plumbed';
let Water_Only = 'Water_Only';

let Door_cooling = 'Door_cooling';  // Door_cooling,Linearcooling
let Linearcooling = 'Linearcooling';
let Pure_N_Fresh = 'Pure_N_Fresh';

// energy grade
let EnergyGrade_A = 'EnergyGrade_A';
let EnergyGrade_B = 'EnergyGrade_B';
let EnergyGrade_C = 'EnergyGrade_C';
let EnergyGrade_D = 'EnergyGrade_D';
let EnergyGrade_E = 'EnergyGrade_E';
let EnergyGrade_F = 'EnergyGrade_F';

let Instaview = 'Instaview';
let Door_in_Door = 'Door_in_Door';
let Wine_Rack = 'Wine_Rack';
let Folding_Shelf = 'Folding_Shelf';
let Reversible_Door = 'Reversible_Door';

let ThinQ = 'ThinQ';

// color
let black = 'black';
let stainless_steel = 'stainless_steel';
let silver = 'silver';
let beige = 'beige';

let Dummy = 'dummy'; // dummy (더미데이터)
let AllSelectOption = 'AllSelectOption'; // All Select Option
/* 변수 정의 end -------------------------------*/

// 제품 키 / 벨류
const product = {
   // Multidoor (multi)
   'GMX945MC9F': { // 1
      Type: multi,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      Color: black
   },
   'GML945NS9E': { // 2 
      Type: multi,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling, Door_in_Door, Folding_Shelf],
      Color: silver
   },
   'GMX844MC6F': { // 3
      Type: multi,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      Color: black
   },
   'GMQ844MC5E': { // 4
      Type: multi,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      Color: black
   },
   'GML844PZ6F': { // 5
      Type: multi,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Folding_Shelf],
      Color: silver
   },
   'GMB844PZFG': { // 6
      Type: multi,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Folding_Shelf],
      Color: silver
   },
   'LSR100': { // 7
      Type: multi,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Linearcooling, Pure_N_Fresh, EnergyGrade_F, Instaview, Door_in_Door],
      Color: stainless_steel
   },

   // Side-by-Side (american)
   'GSXV91BSAF': { // 1
      Type: american,
      Capacity: _600L_or_more,
      Depth: _600L_or_more,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSXV91MCAE': { // 2
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      Color: black
   },
   'GSXV90MBAE': { // 3
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSXV90BSAE': { // 4
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSXV80PZLE': { // 5
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSJV90BSAE': { // 6
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSJV91PZAE': { // 7
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSLV71PZTM': { // 8
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling],
      Color: silver
   },
   'GSLV90PZAE': { // 9
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Wine_Rack],
      Color: silver
   },
   'GSLV90PZAD': { // 10
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: ThinQ,
      Feature: [Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      Color: silver
   },
   'GSBV70DSTM': { // 11
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GSBV70PZTE': { // 12
      Type: american,
      Capacity: _600L_or_more,
      Depth: under_760mm,
      Width: _910mm_or_more,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },


   // Combinati
   'GBB72MCUGN': { // 1
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: black
   },
   'GBB72PZUGN': { // 2
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB71PZUGN': { // 3
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB72PZVGN': { // 4
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB72NSUGN': { // 5
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB72NSVGN': { // 6
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB62PZFGN': { // 7
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack],
      Color: silver
   },
   'GBB62PZGGN': { // 8
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack],
      Color: silver
   },
   'GBP61DSPGN': { // 9
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GBP62DSNGN': { // 10
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GBB72MCVGN': { // 11
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: black
   },
   'GBP62DSSGR': { // 12
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GBP62DSNCN1': { // 13
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      Color: silver
   },
   'GBP62DSNCC1': { // 14
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      Color: silver
   },
   'GBP62PZNCN1': { // 15
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      Color: silver
   },
   'GBP62DSXCC1': { // 16
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      Color: silver
   },
   'GBB72SAVCN1': { // 17
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      Color: silver
   },
   'GBB72PZVCN1': { // 18
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      Color: silver
   },
   'GBB72SAUCN1': { // 19
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      Color: silver
   },
   'GBB92STBAP': { // 20
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_A,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Wine_Rack, Folding_Shelf],
      Color: stainless_steel
   },
   'GBB92MCABP': { // 21
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_B,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: black
   },
   'GBP62PZNBC': { // 22
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_B,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GBB567SECMN': { // 23
      Type: tall,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      Color: beige
   },
   'GBB567PZCMB': { // 24
      Type: tall,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      Color: silver
   },
   'GBB569MCAMN': { // 25
      Type: tall,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Folding_Shelf],
      Color: black
   },
   'GBB569NSAFB': { // 26
      Type: tall,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_D,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      Color: silver
   },
   'LSR200B': { // 27
      Type: tall,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_F,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Instaview, Door_in_Door],
      Color: stainless_steel
   },
   'GBB72NSUCN1': { // 28
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      Color: silver
   },
   'GBB72NSVCN1': { // 29
      Type: tall,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _2000mm_or_more,
      EnergyGrade: EnergyGrade_C,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      Color: silver
   },


   // // Doppia Porta
   'GTF916SEPYD': { // 1
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: beige
   },
   'GTF916PZPYD': { // 2
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _810_900mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: beige
   },
   'GTB744PZHZD': { // 3
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GTF744PZPZD': { // 4
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling],
      Color: silver
   },
   'GTF744SEPZD': { // 5
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Non_Plumbed, Door_cooling, Linearcooling],
      Color: beige
   },
   'GTB744BMBZD': { // 6
      Type: double,
      Capacity: _500L_600L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: black
   },
   'GTB574PZHZD': { // 7
      Type: double,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: silver
   },
   'GTB574SEHZD': { // 8
      Type: double,
      Capacity: _400L_500L,
      Depth: under_760mm,
      Width: _610mm_800mm,
      Height: under_1800mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: ThinQ,
      Feature: [Dummy, Door_cooling, Linearcooling],
      Color: beige
   },


   // // Maxi Side by Side
   'GFT41PZGSZ': { // 1
      Type: lader,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: '',
      Feature: [Dummy],
      Color: silver
   },
   'GLT51PZGSZ': { // 2
      Type: lader,
      Capacity: under_400L,
      Depth: under_760mm,
      Width: under_600mm,
      Height: _1800_2000mm,
      EnergyGrade: EnergyGrade_E,
      SmartTechnology: '',
      Feature: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Reversible_Door],
      Color: silver
   },
}

const configData = {
   // 제품 정보 정의
   object: [
      {
         key: multi,
         class: 'multi',
         screenImg: {
            changeScreenImg: 'step02/que_img01.png',
            lastScreenImg: 'step07/multi_que_img04.png',
            resultImg: 'result/center_img01.png',
         }
      },
      {
         key: american,
         class: 'american',
         screenImg: {
            changeScreenImg: 'step02/que_img02.png',
            lastScreenImg: 'step07/american_que_img04.png',
            resultImg: 'result/center_img02.png',
         }
      },
      {
         key: tall,
         class: 'tall',
         screenImg: {
            changeScreenImg: 'step02/que_img03.png',
            lastScreenImg: 'step07/tall_que_img04.png',
            resultImg: 'result/center_img03.png',
         }
      },
      {
         key: double,
         class: 'double',
         screenImg: {
            changeScreenImg: 'step02/que_img04.png',
            lastScreenImg: 'step07/double_que_img04.png',
            resultImg: 'result/center_img04.png',
         }
      },
      {
         key: lader,
         class: 'lader',
         screenImg: {
            changeScreenImg: 'step02/que_img05.png',
            lastScreenImg: 'step07/lader_que_img04.png',
            resultImg: 'result/center_img05.png',
         }
      }
   ],
   // 질문페이지 사전 정의 
   finderSetting: [
      // 제품 선택
      {
         finderStep: 'step01',
         questionText: 'Che tipo di frigorifero </br>stai cercando?',
         defaultScreenImg: 'step01/que_img00.png',
      },
      {
         finderStep: 'step02',
         questionText: 'Qual è la capacità del frigo che stai cercando?',
      },
      {
         finderStep: 'step03',
         questionText: 'Quanto spazio hai a disposizione in casa?',
         key: ['Profondità', 'Larghezza', 'Altezza'],
      },
      {
         finderStep: 'step04',
         questionText: 'Hai bisogno di un frigorifero che </br>eroghi acqua fresca e ghiaccio?',
         defaultScreenImg: 'step04/que_img01.png',
      },
      {
         finderStep: 'step05',
         questionText: 'Quali sono gli aspetti che </br>reputi più importanti di un frigorifero?',
         defaultScreenImg: 'step05/que_img01.png',
      },
      {
         finderStep: 'step06',
         questionText: 'Quali sono le caratteristiche che </br>ti interessano di più in un frigorifero?',
         defaultScreenImg: 'step06/que_img01.png',
      },
      {
         finderStep: 'step07',
         questionText: 'Qual è il colore che si </br>adatta meglio al tuo arredamento?',
         productColorImg: ['_black_popup_img', '_steel_popup_img', '_silver_popup_img', '_white_popup_img', '_beige_popup_img'], // step07 인터렉션 페이지 컬러매칭 이미지 뿌리기
      },
   ],
   // 페이지 데이터 정의
   htmlData: [
      //1번 스탭
      [
         {
            key: 'Type',
            value: multi,
            content: 'Multidoor',
            changeData: {
               description: 'Caratterizzato dalla grande capacità e dagli scompartimenti frigo e congelatore uno sopra l’altro.',
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
            value: american,
            content: 'Side-by-Side',
            changeData: {
               description: 'Ideale se cerchi un modello dalla grande capacità, ha il frigorifero a destra e il congelatore a sinistra.',
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
            value: tall,
            content: 'Combinato',
            changeData: {
               description: 'Il modello di frigorifero a due porte più diffuso in Italia, con frigo nella parte superiore e congelatore in quella inferiore.',
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
            value: double,
            content: 'Doppia porta',
            changeData: {
               description: 'Modello a due porte, dove il congelatore sta nella parte superiore e il frigo in quella inferiore.',
               screenImg: 'step01/que_img04.png',
               learnMore: {
                  interactionPage: 'double',
                  // additionalDesc: true,
                  // videoPopup: true,
               },
            },
            resultContent: 'step01',
         },
         {
            key: 'Type',
            value: lader,
            content: 'Maxi Side-by-Side componibile',
            changeData: {
               description: 'La soluzione ideale se desideri frigorifero e congelatore separati.',
               screenImg: 'step01/que_img05.png',
               learnMore: {
                  interactionPage: 'lader',
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
            value: under_400L,
            content: 'Meno di 400L',
            changeData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            key: 'Capacity',
            value: _400L_500L,
            content: 'Da 400L a 500L',
            changeData: {
               description: 'La capacità ideale se fai la spesa una volta alla settimana e devi conservare tanto cibo.',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            key: 'Capacity',
            value: '_500L_600L',
            content: 'Da 500L a 600L',
            changeData: {
               description: 'Consigliato se hai una famiglia numerosa e vuoi avere più spazio per i tuoi alimenti rispetto a un frigo tradizionale.',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            key: 'Capacity',
            value: _600L_or_more,
            content: 'Oltre 600L',
            changeData: {
               description: 'Perfetto per soddisfare le esigenze di una famiglia numerosa grazie alla maxi capacità.',
               icon: 'step02/disc_icon04.png',
            }
         },
         {
            key: 'step02',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               icon: '',
            }
         },
      ],
      //3번 스탭
      [
         {
            key: 'Depth',
            value: under_760mm,
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
            value: Dummy,
            content: '76cm o più'
         }
      ],
      [
         {
            key: 'Width',
            value: under_600mm,
            content: 'Meno di 60cm',
         },
         {
            key: 'Width',
            value: _610mm_800mm,
            content: 'Da 61 a 80cm',
         },
         {
            key: 'Width',
            value: _810_900mm,
            content: 'Da 81 a 90cm',
         },
         {
            key: 'Width',
            value: _910mm_or_more,
            content: '91cm o più',
         },
         {
            key: 'step03-1',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
         },
      ],
      [
         {
            key: 'Height',
            value: under_1800mm,
            content: 'Meno di 180cm',
         },
         {
            key: 'Height',
            value: _1800_2000mm,
            content: 'Da 180 a 200cm',
         },
         {
            key: 'Height',
            value: _2000mm_or_more,
            content: '200cm o più',
         },
         {
            key: 'step03-2',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
         },
      ],
      //4번 스탭
      [
         {
            key: 'Feature',
            value: Plumbed,
            content: 'Con allacciamento idrico',
            changeData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               screenImg: 'step04/que_img02.png',
            }
         },
         {
            key: 'Feature',
            value: Non_Plumbed,
            content: 'Senza allacciamento idrico',
            changeData: {
               description: {
                  head: 'Il dispenser preleva l’acqua da una tanica interna al frigorifero che dovrai riempire di volta in volta.',
                  detail: 'Quando non hai a disposizione un rubinetto dell’acqua nelle vicinanze, i frigoriferi con tanica interna sono la soluzione ideale per avere acqua fresca e ghiaccio ogni volta che vuoi.'
               },
               screenImg: 'step04/que_img03.png',
            }
         },
         {
            key: 'Feature',
            value: Water_Only,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            changeData: {
               description: {
                  head: 'Goditi dell’acqua sempre fresca tutte le volte che vuoi.',
                  detail: 'Una soluzione pratica per avere sempre pronta dell’acqua fresca grazie alla tanica interna al frigorifero.'
               },
               screenImg: 'step04/que_img04.png',
            }
         },
         {
            key: 'Feature',
            value: 'dummy',
            content: 'Non ho particolari esigenze, </br>fammi vedere tutti i modelli.',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: 'Doesn’t matter to me, I’d like to see all models.',
               screenImg: 'step04/que_img01.png',
            }
         },
         {
            key: 'step04',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
      ],
      //5번스탭
      [
         {
            key: 'Feature',
            value: 'Door_cooling,Linearcooling',
            content: 'Mantenimento della freschezza',
            changeData: {
               description: 'Le tecnologie di raffreddamento e di controllo della temperatura dei nostri frigoriferi mantengono i cibi freschi.',
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
            content: 'Ventilazione',
            changeData: {
               description: 'I filtri Pure N Fresh minimizzano gli odori e mantengono più fresca l’aria dentro al frigorifero.',
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
            content: 'Classe di efficienza </br>energetica A o superiore',
            changeData: {
               description: {
                  head: 'Risparmia energia, risparmia sulla bolletta',
                  detail: 'La nostra tecnologia Linear Inverter ti aiuta a risparmiare energia mantenendo la temperatura ideale nel frigorifero.'
               },
               screenImg: 'step05/que_img04.png',
            },
            resultContent: 'step05',
         },
         {
            key: 'step05',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
      ],
      //6번 스탭
      [
         {
            key: 'Feature',
            value: Instaview,
            content: 'InstaView™ </br>Door-in-Door®',
            // content: '인스타뷰',
            changeData: {
               description: 'Bussa sul vetro per vedere cos’hai nel frigorifero senza aprire la porta principale ed evitando dispersioni di aria fredda.',
               screenImg: 'step06/que_img02.png',
               learnMore: {
                  videoPopup: 'instaview',
               },
            },
            resultContent: 'step06',
         },
         {
            key: 'Feature',
            value: Door_in_Door,
            content: 'Door-in-Door®',
            // content: '도어인도어',
            changeData: {
               description: 'Ti permette di accedere rapidamente ai cibi che usi di più senza aprire la porta principale del frigorifero.',
               screenImg: 'step06/que_img03.png',
            },
            resultContent: 'step06',
         },
         {
            key: 'Feature',
            value: Reversible_Door,
            content: 'Porte reversibili',
            changeData: {
               description: 'Ti permette di personalizzare il verso di apertura delle porte in base al tuo arredamento.',
               screenImg: 'step06/que_img04.png',
            },
            resultContent: 'step06',
         },
         {
            key: 'Feature',
            value: Folding_Shelf,
            content: 'Ripiano pieghevole',
            // content: '볼딩셀프',
            changeData: {
               description: 'Aumenta lo spazio sui ripiani quando devi conservare bottiglie o pentole semplicemente ripiegando il ripiano su se stesso.',
               screenImg: 'step06/que_img05.png',
            },
            resultContent: 'step06',
         },
         {
            key: 'Feature',
            value: Wine_Rack,
            content: 'Wine rack',
            // content: '와인렉',
            changeData: {
               description: 'Un pratico supporto in metallo sagomato per organizzare e tenere in fresco fino a 5 bottiglie di vino, disposte parallelamente agli altri ripiani.',
               screenImg: 'step06/que_img06.png',
            },
            resultContent: 'step06',
         },
         {
            key: 'SmartTechnology',
            value: ThinQ,
            content: 'Funzioni Smart con </br>Intelligenza Artificiale',
            // content: '띵큐',
            changeData: {
               description: 'Un assistente smart che ti dà una mano',
               screenImg: 'step06/que_img07.png',
               learnMore: {
                  videoPopup: 'smart_ai_features',
               },
            },
            resultContent: 'step06',
         },
         {
            key: 'step06',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
      ],
      //7번 스탭
      [
         {
            key: 'Color',
            value: black,
            content: 'Nero',
            changeData: {
               description: 'Un colore che fa diventare il frigorifero il protagonista della tua cucina',
               screenImg: 'que_img01.png',
               learnMore: {
                  interactionPage: 'black',
               },
            },
            resultContent: 'step07',
         },
         {
            key: 'Color',
            value: stainless_steel,
            content: 'Acciaio inox',
            changeData: {
               description: 'Un look aggraziato per un frigorifero facile da pulire.',
               screenImg: 'que_img02.png',
               learnMore: {
                  interactionPage: 'stainless_steel',
               },
            },
            resultContent: 'step07',
         },
         {
            key: 'Color',
            value: silver,
            content: 'Argento',
            changeData: {
               description: 'Si abbina a gran parte degli elettrodomestici, donando uniformità di stile alla tua cucina.',
               screenImg: 'que_img03.png',
               learnMore: {
                  interactionPage: 'silver',
               },
            },
            resultContent: 'step07',
         },
         {
            key: 'Color',
            value: beige,
            content: 'Beige',
            changeData: {
               description: 'Un tocco delicato al colore della tua cucina.',
               screenImg: 'que_img05.png',
               learnMore: {
                  interactionPage: 'beige',
               },
            },
            resultContent: 'step07',
         },
         {
            key: 'step07',
            value: AllSelectOption,
            content: 'Tutte le opzioni',
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'que_img04.png',
            }
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

      // result
      './images/pc/result/bg_unit.jpg',

      // step01
      './images/pc/step01/btn_icon01.png',


      // step02
      './images/pc/step02/btn_icon01.png',


      // step03
      './images/pc/step03/caution_icon.png',


      // step04
      './images/pc/step04/btn_icon01.png',


      // step05
      './images/pc/step05/btn_icon01.png',


      // step06
      './images/pc/step06/btn_icon01.png',


      // step07
      './images/pc/step07/american_black_popup_img.png',

   ]);
}
intro();
main();