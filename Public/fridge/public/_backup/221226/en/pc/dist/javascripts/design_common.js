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

const allSelectContent = 'Tutte le opzioni'; // Tutte le opzioni

if (window.innerWidth >= 1024) {
   imgPath = './images/pc/';
   imgPreload();
} else {
   imgPath = './images/';
}

/* 변수 정의 start -------------------------------*/
// product
let multi = 'FV65064400';
let american = 'FV65064399';
let tall = 'FV65064397';
let double = 'FV65064398';
let lader = 'FV65064402';

// capacity
let under_400L = 'FTV0335751V';
let _400L_500L = 'FTV0335756V';
let _500L_600L = 'FTV0335753V';
let _600L_or_more = 'FTV0335752V';

// depth
let under_760mm = 'FTV0335761V';

// width
let under_600mm = 'FTV0335757V';
let _610mm_800mm = 'FTV0335758V';
let _810_900mm = 'FTV0335759V';
let _910mm_or_more = 'FTV0335760V';

// height
let under_1800mm = 'FTV0335764V';
let _1800_2000mm = 'FTV0335762V';
let _2000mm_or_more = 'FTV0335763V';

let Plumbed = 'FTV0335946V';
let Non_Plumbed = 'FV65347014';
let Water_Only = 'FTV0336033V';

let Door_cooling = 'FTV0335958V';  // Door_cooling,Linearcooling
let Linearcooling = 'FTV0335957V';
let Pure_N_Fresh = 'FTV0336055V';

// energy grade
let EnergyGrade_A = 'FV65346308';
let EnergyGrade_B = 'FV65346307';
let EnergyGrade_C = 'FV65346306';
let EnergyGrade_D = 'FV65346305';
let EnergyGrade_E = 'FV65346303';
let EnergyGrade_F = 'FV65346304';

let Instaview = 'FV65346610';
let Door_in_Door = 'FTV0335968V';
let Wine_Rack = 'FTV0335943V';
let Folding_Shelf = 'FTV0335950V';
let Reversible_Door = 'FTV0335951V';

let ThinQ = 'FV65345059';

// color
let black = 'FTV0335778V';
let stainless_steel = 'FTV0335779V';
let silver = 'FTV0335780V';
let beige = 'FTV0335777V';

let Dummy = 'dummy'; // dummy (더미데이터)
let AllSelectOption = 'AllSelectOption'; // All Select Option
/* 변수 정의 end -------------------------------*/

// 제품 키 / 벨류
const product = {
   // Multidoor (multi)
   'GMX945MC9F': { // 1
      FT05707162: multi,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      FT06515694: black
   },
   'GML945NS9E': { // 2
      FT05707162: multi,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Door_in_Door, Folding_Shelf],
      FT06515694: silver
   },
   'GMX844MC6F': { // 3
      FT05707162: multi,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      FT06515694: black
   },
   'GMQ844MC5E': { // 4
      FT05707162: multi,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door, Folding_Shelf],
      FT06515694: black
   },
   'GML844PZ6F': { // 5
      FT05707162: multi,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Folding_Shelf],
      FT06515694: silver
   },
   'GMB844PZFG': { // 6
      FT05707162: multi,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Folding_Shelf],
      FT06515694: silver
   },
   'LSR100': { // 7
      FT05707162: multi,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Pure_N_Fresh, Instaview, Door_in_Door],
      FT06515694: stainless_steel
   },


   // Side-by-Side (american)
   'GSXV91BSAF': { // 1
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Non_Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSXV91MCAE': { // 2
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Non_Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      FT06515694: black
   },
   'GSXV90MBAE': { // 3
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSXV90BSAE': { // 4
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSXV80PZLE': { // 5
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Instaview, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSJV90BSAE': { // 6
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSJV91PZAE': { // 7
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSLV90PZAE': { // 8
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Wine_Rack],
      FT06515694: silver
   },
   'GSLV90PZAD': { // 9
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_D,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Door_in_Door, Wine_Rack],
      FT06515694: silver
   },
   'GSBV70DSTM': { // 10
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GSBV70PZTE': { // 11
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GSLV51WBXM': { // 12
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: '',
      FT06515762: [Plumbed, Non_Plumbed, Door_cooling, Linearcooling],
      FT06515694: black
   },
   'GSJV31DSXF': { // 13
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: '',
      FT06515762: [Plumbed, Non_Plumbed, Door_cooling, Linearcooling, Door_in_Door],
      FT06515694: silver
   },
   'GSJV70WBTF': { // 14
      FT05707162: american,
      FT06515688: _600L_or_more,
      FT06515690: under_760mm,
      FT06515689: _910mm_or_more,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: ThinQ,
      FT06515762: [Plumbed, Door_cooling, Linearcooling, Door_in_Door],
      FT06515694: black
   },




   // Combinati
   'GBB72MCUGN': { // 1
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: black
   },
   'GBB72PZUGN': { // 2
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB71PZUGN': { // 3
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB72PZVGN': { // 4
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB72NSUGN': { // 5
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB72NSVGN': { // 6
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB62PZFGN': { // 7
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack],
      FT06515694: silver
   },
   'GBB62PZGGN': { // 8
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack],
      FT06515694: silver
   },
   'GBP61DSPGN': { // 9
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GBP62DSNGN': { // 10
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GBB72MCVGN': { // 11
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: black
   },
   'GBP62DSSGR': { // 12
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GBP62DSNCN1': { // 13
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBP62DSNCC1': { // 14
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBP62PZNCN1': { // 15
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBP62DSXCC1': { // 16
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBB72SAVCN1': { // 17
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB72PZVCN1': { // 18
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB72SAUCN1': { // 19
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB92STBAP': { // 20
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_A,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Pure_N_Fresh, Wine_Rack, Folding_Shelf],
      FT06515694: stainless_steel
   },
   'GBB92MCABP': { // 21
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_B,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: black
   },
   'GBP62PZNBC': { // 22
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_B,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GBB567SECMN': { // 23
      FT05707162: tall,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      FT06515694: beige
   },
   'GBB567PZCMB': { // 24
      FT05707162: tall,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB569MCAMN': { // 25
      FT05707162: tall,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Folding_Shelf],
      FT06515694: black
   },
   'GBB569NSAFB': { // 26
      FT05707162: tall,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_D,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'LSR200B': { // 27
      FT05707162: tall,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_F,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Instaview, Door_in_Door],
      FT06515694: stainless_steel
   },
   'GBB72NSUCN1': { // 28
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf],
      FT06515694: silver
   },
   'GBB72NSVCN1': { // 29
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: _500L_600L,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_C,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB72SAVGN': { // 30
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: _500L_600L,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_D,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Folding_Shelf, Reversible_Door],
      FT06515694: silver
   },
   'GBB62PZJMN': { // 31
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: _500L_600L,
      FT06515691: _2000mm_or_more,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBB61PZJMN': { // 32
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: _500L_600L,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: silver
   },
   'GBB61BLHEC': { // 33
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling, Door_in_Door, Reversible_Door],
      FT06515694: black
   },
   'GBF61BLHMN': { // 34
      FT05707162: tall,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Water_Only, Door_cooling, Linearcooling, Reversible_Door],
      FT06515694: black
   },



   // Doppia Porta
   'GTF916SEPYD': { // 1
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Water_Only, Door_cooling, Linearcooling],
      FT06515694: beige
   },
   'GTF916PZPYD': { // 2
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _810_900mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Water_Only, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GTB744PZHZD': { // 3
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GTF744PZPZD': { // 4
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Water_Only, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GTF744SEPZD': { // 5
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Water_Only, Door_cooling, Linearcooling],
      FT06515694: beige
   },
   'GTB744BMBZD': { // 6
      FT05707162: double,
      FT06515688: _500L_600L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: black
   },
   'GTB574PZHZD': { // 7
      FT05707162: double,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: silver
   },
   'GTB574SEHZD': { // 8
      FT05707162: double,
      FT06515688: _400L_500L,
      FT06515690: under_760mm,
      FT06515689: _610mm_800mm,
      FT06515691: under_1800mm,
      FT06515693: EnergyGrade_E,
      FT06515502: ThinQ,
      FT06515762: [Dummy, Door_cooling, Linearcooling],
      FT06515694: beige
   },



   // Maxi Side by Side
   'GFT41PZGSZ': { // 1
      FT05707162: lader,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy],
      FT06515694: silver
   },
   'GLT51PZGSZ': { // 2
      FT05707162: lader,
      FT06515688: under_400L,
      FT06515690: under_760mm,
      FT06515689: under_600mm,
      FT06515691: _1800_2000mm,
      FT06515693: EnergyGrade_E,
      FT06515502: '',
      FT06515762: [Dummy, Door_cooling, Linearcooling, Wine_Rack, Reversible_Door],
      FT06515694: silver
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
         questionText: 'Che tipo di frigorifero stai cercando?',
         defaultScreenImg: 'step01/que_img00.png',
      },
      {
         finderStep: 'step02',
         questionText: 'Qual è la capacità del frigo che stai cercando?',
      },
      {
         finderStep: 'step03',
         questionText: 'Quanto spazio hai a disposizione in casa?',
         key: ['Profondità', 'Larghezza', 'ALTEZZA'],
      },
      {
         finderStep: 'step04',
         questionText: 'Hai bisogno di un frigorifero </br>che eroghi acqua fresca e ghiaccio?',
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
            key: 'FT05707162',
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
            key: 'FT05707162',
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
            key: 'FT05707162',
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
            key: 'FT05707162',
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
            key: 'FT05707162',
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
            key: 'step02',
            value: AllSelectOption,
            content: allSelectContent,
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               icon: '',
            }
         },
         {
            key: 'FT06515688',
            value: under_400L,
            content: 'Meno di 400L',
            changeData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            key: 'FT06515688',
            value: 'FTV0335756V,FTV0335754V',
            content: 'Da 400L a 500L',
            changeData: {
               description: 'La capacità ideale se fai la spesa una volta alla settimana e devi conservare tanto cibo.',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            key: 'FT06515688',
            value: 'FTV0335753V,FV65346230',
            content: 'Da 500L a 600L',
            changeData: {
               description: 'Consigliato se hai una famiglia numerosa e vuoi avere più spazio per i tuoi alimenti rispetto a un frigo tradizionale.',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            key: 'FT06515688',
            value: _600L_or_more,
            content: 'Oltre 600L',
            changeData: {
               description: 'Perfetto per soddisfare le esigenze di una famiglia numerosa grazie alla maxi capacità.',
               icon: 'step02/disc_icon04.png',
            }
         },
      ],
      //3번 스탭
      [
         {
            key: 'FT06515690',
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
            key: 'step03-1',
            value: AllSelectOption,
            content: allSelectContent,
         },
         {
            key: 'FT06515689',
            value: under_600mm,
            content: 'Meno di 60cm',
         },
         {
            key: 'FT06515689',
            value: _610mm_800mm,
            content: 'Da 61 a 80cm',
         },
         {
            key: 'FT06515689',
            value: _810_900mm,
            content: 'Da 81 a 90cm',
         },
         {
            key: 'FT06515689',
            value: _910mm_or_more,
            content: '91cm o più',
         },
      ],
      [
         {
            key: 'step03-2',
            value: AllSelectOption,
            content: allSelectContent,
         },
         {
            key: 'FT06515691',
            value: under_1800mm,
            content: 'Meno di 180cm',
         },
         {
            key: 'FT06515691',
            value: _1800_2000mm,
            content: 'Da 180 a 200cm',
         },
         {
            key: 'FT06515691',
            value: _2000mm_or_more,
            content: '200cm o più',
         },
      ],
      //4번 스탭
      [
         {
            key: 'step04',
            value: AllSelectOption,
            content: allSelectContent,
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
         {
            key: 'FT06515762',
            value: Plumbed,
            content: 'Con allacciamento idrico',
            changeData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               screenImg: 'step04/que_img02.png',
            }
         },
         {
            key: 'FT06515762',
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
            key: 'FT06515762',
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
            key: 'FT06515762',
            value: 'dummy',
            content: 'Non ho particolari esigenze, </br>fammi vedere tutti i modelli.',
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
            key: 'step05',
            value: AllSelectOption,
            content: allSelectContent,
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
         {
            key: 'FT06515762',
            value: 'FTV0335958V,FTV0335957V',
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
            key: 'FT06515762',
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
            key: 'FT06515693',
            value: 'FV65346308,FV65346307,FV65346306',
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
      ],
      //6번 스탭
      [
         {
            key: 'step06',
            value: AllSelectOption,
            content: allSelectContent,
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'step04/que_img01.png',
            }
         },
         {
            key: 'FT06515762',
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
            key: 'FT06515762',
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
            key: 'FT06515762',
            value: Reversible_Door,
            content: 'Porte reversibili',
            changeData: {
               description: 'Ti permette di personalizzare il verso di apertura delle porte in base al tuo arredamento.',
               screenImg: 'step06/que_img04.png',
            },
            resultContent: 'step06',
         },
         {
            key: 'FT06515762',
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
            key: 'FT06515762',
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
            key: 'FT06515502',
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
      ],
      //7번 스탭
      [
         {
            key: 'step07',
            value: AllSelectOption,
            content: allSelectContent,
            DataNon: true, // 항목 클릭시 보여줘야할 데이터 없을 때
            changeData: {
               description: '',
               screenImg: 'que_img04.png',
            }
         },
         {
            key: 'FT06515694',
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
            key: 'FT06515694',
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
            key: 'FT06515694',
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
            key: 'FT06515694',
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

   var popupStep03swiperDouble = new Swiper(".popup_step03 .double", {
      pagination: {
         el: ".popup_step03 .double .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperLader = new Swiper(".popup_step03 .lader", {
      pagination: {
         el: ".popup_step03 .lader .indicator",
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

   // text
   const multipleSelections = 'Scegli tutte le opzioni che vuoi.';

   let currentUrl = document.location.href; // 현재 url
   let resultPageUrl; // pdp 페이지 (result)
   let stageLiveDecide; // 현재 url 판단
   let animationJson; // json file
   let headerH = $('header').outerHeight();

   // LG stg live <--> 로컬 판단
   currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;

   if (stageLiveDecide) {
      resultPageUrl = './risultati-della-ricerca';
   } else {
      resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
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

   // 제품 다시 선택
   $('#selectAgainBtn').on('click', function () {
      let _judgmentStep = 'backStep';
      if (idx > 0) {
         idx--;
         stepUpdateEvent(idx, _judgmentStep);
      }
   });

   // next / prev 누를 때 실행
   function stepUpdateEvent(idx, _judgmentStep) {
      let _htmlIdx = idx; // 항목 별 index
      if (idx > 2) { _htmlIdx += 2; }// 페이지 데이터 index
      let _currentHtml = configData.htmlData[_htmlIdx]; // 현재 스텝의 항목 데이터
      let _lastAnswerValue; // 저장된 데이터에서 마지막 value
      let _stepProductArray = []; // 스텝별 제품 추출
      currentStep = configData.finderSetting[idx]; // 인터렉션 페이지 유/무

      console.log('index : ', idx, ' -------------------------------------------------')
      !stageLiveDecide && console.log('selectedParameters : ', selectedParameters); // 선택된 key,value
      idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제
      // 앞전 데이터 삭제
      _judgmentStep === 'backStep' && matchingProducts.pop();
      $('body,html').scrollTop(0);
      $descDetailWrap.removeClass('open');
      TweenMax.to($nextBtn, .2, { display: 'none', opacity: 0 });
      $showNow.removeClass('active');
      $quickFinder.removeClass();
      $quickFinder.addClass(configData.finderSetting[idx].finderStep); // step class 변경
      $(window).scrollTop(headerH);

      // next 버튼에 내용 step 별 내용 심기
      $nextBtn.attr('data-link-name', 'AVANTI : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());

      // step 해당 질문 뿌리기
      $('.que_title').remove();
      $descHeadWrap.find('strong').remove();
      $('.qna_wrap').prepend('<strong class="que_title">' + configData.finderSetting[idx].questionText + '</strong>');
      $descHeadWrap.prepend('<strong>' + configData.finderSetting[idx].questionText + '</strong>');
      $('.que_title').css('display', 'block');
      // step 해당 이미지 뿌리기
      $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + configData.finderSetting[idx].defaultScreenImg + ')');

      // 첫번째 선택지에서 선택한 이미지 추출
      if (idx === 1 || idx === 2) {
         $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.changeScreenImg + ')');
      }
      // 첫번째 선택지에서 선택한 이미지 추출 & next 텍스트변경 / class 추가
      if (idx === 6) {
         $nextBtn.text('Abbiamo quasi finito!');
         $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.lastScreenImg + ')');
         $nextBtn.addClass('last_step');
      } else {
         $nextBtn.text('AVANTI');
         $nextBtn.removeClass('last_step');
      }

      // 항목 버튼 초기화 
      $selectWrap.html('<button type="button" class="caution_open_btn">Clicca qui per vedere i consigli su misure e dimensioni.</button><p class="select_tit"><em>' + multipleSelections + ' </em></p>');
      $selectWrap.append('<ol></ol>');

      if (idx === 2) {
         // step 3 데이터 뿌리기
         let liHtml = '';
         while (_htmlIdx < 5) { // 2, 3, 4 연속 출력
            let _currentHtml = configData.htmlData[_htmlIdx]; // 현재 스텝의 항목 데이터
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
      } else if (idx === 6) {
         for (let i = 0; i < _currentHtml.length; i++) {
            // tall & double door 가 아닐 때 베이지 컬러 삭제
            if ((selectedProduct[0].key !== tall && selectedProduct[0].key !== double) && _currentHtml[i].value === beige) {
               continue;
            }
            $selectWrap.find('ol').append(`<li><button class="answer_btn" type="button" data-key="${_currentHtml[i].key}"data-value="${_currentHtml[i].value}"><span></span><p>${_currentHtml[i].content}</p></button></li>`);
         }
      } else {
         for (let i = 0; i < _currentHtml.length; i++) {
            // All Select Option 마크업 예외
            if (i === 0 && idx !== 0) {
               $selectWrap.find('ol').append(`<li><button class="answer_btn" type="button" data-key="${_currentHtml[i].key}" data-value="${_currentHtml[i].value}"><span></span><p>${_currentHtml[i].content}</p></button></li>`);
            } else {
               $selectWrap.find('ol').append(`<li><button class="answer_btn" type="button" data-key="${_currentHtml[i].key}" data-value="${_currentHtml[i].value}"><i></i><p>${_currentHtml[i].content}</p></button></li>`);
            }
         }
      }
      // All Select Button 에 class 삽입
      $('.answer_btn').each(function (i) {
         if ($(this).data('value') === AllSelectOption) {
            $(this).addClass('all_select');
         }
      });

      // 선택된 제품 추출 
      // step 1 만 동작
      if (idx === 1 && matchingProducts.length < 1) {
         // 마지막에 선택한 value 값 추출
         let _selectKey = selectedParameters[selectedParameters.length - 1].split('=')[0]; // key
         let _selectValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; // value
         for (let key in product) {
            // value 값 비교
            if (product[key][_selectKey] === _selectValue) {
               _stepProductArray.push(product[key]);
            }
         }
         matchingProducts.push(_stepProductArray);
      }

      // step 2 부터 동작
      if (idx > 1 && matchingProducts[idx - 1] === undefined) { // back 했을때를 고려해서 undefined 구분
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
         } else {
            let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
            let _prevStepDummyTrue = false;

            // 추출된 마지막 제품 갯수 만큼 for 문 실행 
            for (let i = 0; i < _lastPro.length; i++) {
               let _valueCounting = stepCount[stepCount.length - 1]; // step count
               let _judgmentNum = 0; // 매칭 count
               let _AllSelectBol = false; // All Select 데이터가 있는지 없는지 판단
               // 마지막에 선택한 value 값 추출

               // console.log('선택된 제품 카운트 : ', _valueCounting, '선택된 제품 : ', _lastPro[i])
               for (let j = 0; j < stepCount[stepCount.length - 1]; j++) {
                  let _selectKey = selectedParameters[selectedParameters.length - (1 + j)].split('=')[0]; // key
                  let _selectValue = selectedParameters[selectedParameters.length - (1 + j)].split('=')[1]; // value
                  let _dataTrueBoolean = false;

                  if (_selectValue === 'dummy') { // 더미가 선택 됬을 경우
                     _prevStepDummyTrue = true;
                     _stepProductArray.push(_lastPro[i]);
                  }
                  if (!_prevStepDummyTrue) {
                     if (Array.isArray(_lastPro[i][_selectKey])) { // feature 배열이 포함 되어 있을 때
                        // console.log('featrue 배열 포함OOO')
                        for (let p = 0; p < _selectValue.split(',').length; p++) { // feature 중에 value 값이 여러개인 값 판단
                           for (let u = 0; u < _lastPro[i][_selectKey].length; u++) {
                              if (_selectValue.split(',')[p] === _lastPro[i][_selectKey][u]) {
                                 // console.log('선택된 데이터 : ', _selectValue.split(',')[p], '비교될 제품 데이터 : ', _lastPro[i][_selectKey][u], _selectValue.split(',')[p] === _lastPro[i][_selectKey][u])
                                 if (idx !== 6 && idx !== 5) {
                                    // console.log('******', _lastPro[i])
                                    _stepProductArray.push(_lastPro[i]);
                                 } else {
                                    _dataTrueBoolean = true;
                                    break;
                                 }
                              }
                           }

                           // AllSelectOption 데이터 존재할 경우에 _valueCounting -1 개를 삭제
                           if (_selectValue.split(',')[p] === AllSelectOption) {
                              _AllSelectBol = true;
                           }
                        }
                        if (_dataTrueBoolean) {
                           _judgmentNum++;
                        }
                     } else {
                        if (_selectValue.includes(',')) { // 에너지 그레이드 key 값 여러개 일 때
                           for (let h = 0; h < _selectValue.split(',').length; h++) {
                              if (_selectValue.split(',')[h] === _lastPro[i][_selectKey]) {
                                 // console.log('선택된 데이터 : ', _selectValue.split(',')[h], '비교될 제품 데이터 : ', _lastPro[i][_selectKey], _selectValue.split(',')[h] === _lastPro[i][_selectKey])
                                 // console.debug('******', _lastPro[i])
                                 _stepProductArray.push(_lastPro[i]);
                                 break;
                              }
                           }

                        } else {
                           if (_lastPro[i][_selectKey] === _selectValue) {
                              // console.log('선택된 데이터 : ', _selectValue, '비교될 제품 데이터 : ', _lastPro[i][_selectKey], _lastPro[i][_selectKey] === _selectValue)
                              if (idx !== 6 && idx !== 5) {
                                 // console.debug('******', _lastPro[i])
                                 _stepProductArray.push(_lastPro[i]);
                              } else {
                                 _judgmentNum++;
                              }
                           }
                        }
                        // AllSelectOption 데이터 존재할 경우에 _valueCounting -1 개를 삭제
                        if (_selectValue === AllSelectOption) {
                           _AllSelectBol = true;
                        }
                     }
                  }
               }

               if (_AllSelectBol) { // All Select 가 있으면 - 1
                  _valueCounting--;
               }
               // 선택한 벨류값의 갯수와 true 된 갯수와 같으면 제품 추출
               if ((idx === 6 || idx === 5) && _judgmentNum === _valueCounting) {
                  // console.debug('true 된 갯수 : ', _judgmentNum, '카운트 갯수 : ', _valueCounting, _judgmentNum === _valueCounting)
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

         $(".answer_btn").prop('disabled', true); // default disabled true

         // 현재 스텝의 key 값을 모두 추출 하고, 중복된 key값은 제거
         $('.answer_btn').each(function () {
            _currentKey.push($(this).data('key'));
         });
         _currentKeyRemoval = Array.from(new Set(_currentKey)); // 중복된 key 값 제거

         // 추출된 제품 갯수만큼 for 문 실행 
         for (let i = 0; i < _lastPro.length; i++) {
            // 현재 스텝의 있는 key 갯수만큼 for 문 실행
            for (let j = 0; j < _currentKeyRemoval.length; j++) {
               // 현재스텝의 key에 Feature 가 있을 때 _dataValue에 value값 모두 push
               if (Array.isArray(_lastPro[i][_currentKeyRemoval[j]])) {
                  let binArray = _lastPro[i][_currentKeyRemoval[j]];
                  for (let p = 0; p < binArray.length; p++) {
                     _dataValue.push(binArray[p]);
                  }
               } else {
                  _dataValue.push(_lastPro[i][_currentKeyRemoval[j]])
               }
            }
         }

         // disabled 하기 
         let _arrayDataValue = Array.from(new Set(_dataValue)); // 추출된 제품 중복되는 value 제거한 나머지 최종 value

         // 1:1 비교
         for (let i = 0; i < _arrayDataValue.length; i++) {
            $('.answer_btn[data-value="' + _arrayDataValue[i]).removeAttr('disabled');
         }

         // 1:n 다중비교
         $('.answer_btn').each(function () {
            let _this = $(this);
            // value 값이 여러개가 있는지 없는지 판단
            if (_this.data('value').includes(',')) {
               let severalValue = _this.data('value').split(','); // 다중 value
               // 여러개의 밸류값은 갯수만큼 배열 생성하여 반복
               for (let j = 0; j < severalValue.length; j++) {
                  // 선택한 value 값 만큼 반복
                  for (let i = 0; i < _arrayDataValue.length; i++) {
                     // 같은 value 값이 있으면 false
                     if (severalValue[j] === _arrayDataValue[i]) {
                        _this.removeAttr('disabled');
                     }
                  }
               }
            }

            // All Select Option (전체선택)
            if (_this.data('value') === AllSelectOption) {
               _this.removeAttr('disabled');
            }
         });

         let openOptionNum = 0;
         // 매칭되지 않아서 옵션이 오픈 되지 않았을 때 팝업 생성
         $('.answer_btn').each(function () {
            if ($(this).data('value') !== AllSelectOption && $(this).attr('disabled') === undefined) {
               openOptionNum++
            }
         });
         if (openOptionNum === 0) {
            $('#quickFinder').addClass('not_matched');
            $('.all_select').prop('disabled', true);
         } else {
            $('#quickFinder').removeClass('not_matched');
            $('.all_select').prop('disabled', false);
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
            // console.log(selectedParameters[selectedParameters.length - (1 + i)])
            let _selectKey = selectedParameters[selectedParameters.length - (1 + i)].split('=')[0]; // key
            let _selectValue = selectedParameters[selectedParameters.length - (1 + i)].split('=')[1]; // value

            // 버튼 value와 저장된 value와 같으면 active 
            $('.answer_btn').each(function () {
               let _thisValue = $(this).data('value');
               let _thisKey = $(this).data('key');
               // console.log(_thisKey, _selectKey, _selectValue, _thisValue, _thisKey === _selectKey && _selectValue === _thisValue)
               if (_thisKey === _selectKey && _selectValue === _thisValue) {
                  $(this).addClass('active');
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
      answerSelectEvent(idx, _htmlIdx); // 항목 클릭 함수
   }

   // 항목 클릭시 실행 함수
   function answerSelectEvent(idx, _htmlIdx) {
      let _lastAnswerValue; // 저장된 데이터에서 마지막 value
      let _currentHtml = configData.htmlData[_htmlIdx]; // 현재 스텝의 항목 데이터

      // 항목 클릭 
      $('.answer_btn').on('click', function () {
         let _this = $(this);
         let _currentKeyValue = _this.data('key') + '=' + _this.data('value'); // 현재 선택한 키/벨류 ex) Q2=Q2_value2
         let _answerBtnActive = 0; // 버튼 active 카운팅 저장용 (All Select 해제 시 카운팅 수 필요)
         let _step2AnswerBtnActive = 1; // step02 의 acitve 된 버튼의 count
         let _btnAllCount = 0; // All Select 제외한 나머지 버튼 count
         let _activeBtn = 0; // 현재 클릭된 버튼 count

         // step 02          
         let _btnAllCount1 = 0; // All Select 제외한 나머지 버튼 count
         let _activeBtn1 = 0; // 현재 클릭된 버튼 count



         $('.answer_btn').each(function () {
            if ($(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) { // acitve 없고, diabled 없고, All Select 가 아닌 버튼의 kay / value 값 
               _btnAllCount++;
            }
         });

         if (_this.data('value') === AllSelectOption) { // All Select Button (전체 선택 버튼)
            if (idx !== 2) { // step03 제외 
               $('.answer_btn').each(function () {
                  // active 전체 갯수 카운팅 ++
                  if ($(this).attr('disabled') === undefined) {
                     _answerBtnActive++
                  }
               });

               // All Select 선택시 모든 옵션이 선택됨
               if (!_this.hasClass('active')) {
                  $('.answer_btn').each(function () {
                     // All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
                     if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) { // acitve 없고, diabled 없고, All Select 가 아닌 버튼의 kay / value 값 
                        selectedParameters.push($(this).data('key') + '=' + $(this).data('value')); // push
                     }
                     if ($(this).attr('disabled') === undefined) {
                        $(this).addClass('active');
                     }
                  });
               } else {
                  // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
                  $('.answer_btn').removeClass('active');
                  for (let i = 0; i < _answerBtnActive; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                     selectedParameters.splice(-1, 1);
                  }
               }
            } else { // step03 
               let _notAllSelectOption = _this.siblings(); // AllSelectOption 가 아닌 기존버튼

               // step03 의 acitve 된 버튼의 count ++
               _notAllSelectOption.each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     _step2AnswerBtnActive++;
                  }
               });

               // All Select 선택시 모든 옵션이 선택됨
               if (!_this.hasClass('active')) {
                  _this.addClass('active');
                  _notAllSelectOption.each(function () {
                     // All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
                     if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) { // acitve 없고, diabled 없고, All Select 가 아닌 버튼의 kay / value 값 
                        selectedParameters.push($(this).data('key') + '=' + $(this).data('value')); // push
                     }
                     if ($(this).attr('disabled') === undefined) {
                        $(this).addClass('active');
                     }
                  });
               } else {
                  // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
                  _this.removeClass('active');
                  _this.siblings().removeClass('active');
                  for (let i = 0; i < _step2AnswerBtnActive; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                     selectedParameters.splice(-1, 1);
                  }
               }
            }
         } else { // Answer Button (일반 버튼)
            // All Select Option key / value 값 저장
            let _AllSelectKeyValue = $('.all_select').data('key') + '=' + $('.all_select').data('value');
            let _AllSelectKeyStep3Value = _this.parent().find('.all_select').data('key') + '=' + _this.parent().find('.all_select').data('value');

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
               if (!_this.hasClass('active')) {
                  _this.addClass('active');
               } else {
                  // active 해제
                  _this.removeClass('active');
                  if (idx !== 2) {  //step03 제외
                     $('.all_select').removeClass('active');
                     // All Select Option Active 삭제 
                     selectedParameters.forEach(function (item, i) {
                        if (item === _AllSelectKeyValue) {
                           selectedParameters.splice(i, 1);
                        }
                     });
                  } else {//step03 
                     _this.siblings('.all_select').removeClass('active');
                     // All Select Option Active 삭제 
                     selectedParameters.forEach(function (item, i) {
                        if (item === _AllSelectKeyStep3Value) {
                           selectedParameters.splice(i, 1);
                        }
                     });
                  }
               }
               if (idx !== 2) { // step03 제외
                  $('.answer_btn').each(function () {
                     if ($(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) {
                        if ($(this).hasClass('active')) {
                           _activeBtn++
                        }
                     }
                  });
                  if (_activeBtn === _btnAllCount) { // active 된 버튼 갯수와 전체버튼의 갯수와 일치 할 때 All Select 버튼 acitve 
                     $('.all_select').addClass('active');
                     selectedParameters.push(_AllSelectKeyValue);
                  }
               } else { // step03
                  let _divBtn = _this.parent().find('button');
                  _divBtn.each(function () {
                     if ($(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) { // acitve 없고, disabled 없고, All Select 가 아닌 버튼의 kay / value 값 
                        _btnAllCount1++;
                     }
                  });
                  _divBtn.each(function () {
                     if ($(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) {
                        if ($(this).hasClass('active')) {
                           _activeBtn1++
                        }
                     }
                  });

                  if (_btnAllCount1 === _activeBtn1 && _this.parent().find('.all_select').length !== 0) { // active 된 버튼 갯수와 전체버튼의 갯수와 일치 할 때 & 부모에 all Select 버튼이 존재 할 때
                     _this.parent().find('.all_select').addClass('active');
                     selectedParameters.push(_AllSelectKeyStep3Value);
                  }
               }
            }
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

         console.log('stepCount : ', stepCount);
         console.log('selectedParameters (배열에 저장된 키/벨류 값) : ', selectedParameters);

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

         // 데이터 없는 부분
         if (idx !== 2 && _selectData[0].DataNon === true) {
            $('.que_title').css('display', 'block');
            $descHeadWrap.css('display', 'none');
         }
         if (idx === 1) {
            $descIcon.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.icon + ')');
            $descHead.text(_selectData[0].changeData.description);
         } else if (idx === 2) {
            let _currentHtml = configData.htmlData[2]; // 현재 스텝의 항목 데이터
            $descIcon.attr('style', 'background-image:url(' + imgPath + _currentHtml[0].changeData.icon + ')');
            $descHead.text(_currentHtml[0].changeData.description.head);
            $descDetail.text(_currentHtml[0].changeData.description.detail);
         } else if (idx === 6) {
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step07/' + selectedProduct[0].class + '_' + _selectData[0].changeData.screenImg + ')');
            $descHead.text(_selectData[0].changeData.description);
         } else {
            // 해당 idx 0, 3, 4, 5 
            // 데이터 없는 부분
            // if (_selectData[0].DataNon === true) {
            // 	$('.que_title').css('display', 'block');
            // 	$descHeadWrap.css('display', 'none');
            // }
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
            let _currentHtml = configData.htmlData[2]; // 현재 스텝의 항목 데이터
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
         TweenMax.to($nextBtn, .2, { display: 'none', opacity: 0 })
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
      let result = '';
      let test = ''; // 콘솔 확인 체크 test 
      // selectedParameters =  ['FT06513471=FV65320783', 'FT06510172=FTV0330202V', 'FT06509990=FTV0323815V', 'FT06509987=FTV0329676V', 'FT06509991=FTV0329681V'];

      for (let i = 0; i < selectedParameters.length; i++) {
         let _key = selectedParameters[i].split('=')[0];
         let _val = selectedParameters[i].split('=')[1];

         if (_val !== AllSelectOption) {
            // (content 내용 보기용 테스트)
            for (let j = 0; j < configData.htmlData.length; j++) {
               for (let p = 0; p < configData.htmlData[j].length; p++) {
                  if (configData.htmlData[j][p].value === _val) {
                     test += configData.htmlData[j][p].key + ' : ' + configData.htmlData[j][p].content.replace(/(<([^>]+)>)/ig, '') + '\n'
                  }
               }
            }
            if (selectedParameters[i].includes(',')) {
               let _key = selectedParameters[i].split('=')[0];
               let _val = selectedParameters[i].split('=')[1];
               for (let j = 0; j < _val.split(',').length; j++) {
                  result += _key + '=' + _val.split(',')[j] + '&'
               }
            } else {
               if (_val === 'dummy') {
                  result += ''
               } else {
                  result += selectedParameters[i] + '&'
               }
            }
         }
      }
      let filterParameter = '?' + result.slice(0, -1);
      let openLink = resultPageUrl + filterParameter;

      if (stageLiveDecide) {
         location.href = openLink; // 현재 탭에서 이동
      } else {
         window.open(openLink, '_blank'); // 새탭에서 이동
         console.debug('확인용 \n' + test);
         console.log('result : ', filterParameter);
      }
   }

   /* @22-07-28 태깅 관련 스크립트 삽입 (s) */
   function taggingEvent(elm) {
      stageCont = []; // 누적 선택한 항목 컨텐츠

      // 선택한 항목 for 문 실행
      for (let i = 0; i < selectedParameters.length; i++) {
         let _selectKey = selectedParameters[i].split('=')[0]; // key
         let _selectVal = selectedParameters[i].split('=')[1]; // value

         if (AllSelectOption !== _selectVal) {
            // html 데이터 for 문 실행
            for (let j = 0; j < configData.htmlData.length; j++) {
               for (let p = 0; p < configData.htmlData[j].length; p++) {
                  let _configKey = configData.htmlData[j][p].key;
                  let _configVal = configData.htmlData[j][p].value;
                  // console.log(_configKey, _selectKey, _configVal, _selectVal, _configKey === _selectKey && _configVal === _selectVal)
                  // 선택한 key, value 값의 해당하는 content 추출 
                  if (_configKey === _selectKey && _configVal === _selectVal) {
                     stageCont.push(configData.htmlData[j][p].content.replace(/(<([^>]+)>)/ig, ''));
                  }
               }
            }
         }
      }

      if (elm === 'result') {
         stageDesc = 'stage7';
         $('.result_btn').attr('data-link-name', 'r_Btn_' + stageDesc);
         $('.result_btn').attr('data-model-description', stageCont);
      } else {
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
      $('.popup_step03 .' + selectedProduct[0].class).css('display', 'block');
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
   });

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
   });

   $('#selectAgainCloseBtn').on('click',function(){
      $quickFinder.removeClass('not_matched');
   })

   // 인트로 애니메이션 없이 처음으로 돌아가기
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   /* 영상 --------------------------------------------------- */
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
      $quickFinder.css('display', 'none');
      $('#finderResult').css('display', 'block');
      $('.center_img_wrap').attr('style', 'background-image: url(' + imgPath + selectedProduct[0].screenImg.resultImg + ');') // 배경 이미지 변경
      $(window).scrollTop(headerH);

      let _valueArray = [[], [], [], []]; // content 저장 
      let _cont;
      // selectedParameters for 문 실행 
      for (let i = 0; i < selectedParameters.length; i++) {
         let _selectValue = selectedParameters[i].split('=')[1];
         for (let j = 0; j < configData.htmlData.length; j++) {
            for (let p = 0; p < configData.htmlData[j].length; p++) {
               let Html = configData.htmlData[j][p];
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
                  _selectResultTxt += _valueArray[i][j] + '<span>, </span>';
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
   $(window).resize(function () {
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