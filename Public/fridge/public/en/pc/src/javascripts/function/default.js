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
let Width_value4 = 'Width_value4';

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
let Color_value5 = 'Color_value5';

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
		Feature: [Plumbed, Door_in_Door, Reversible_Door, Instaview, Door_cooling, Linearcooling, Pure_N_Fresh],
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
		Feature: [Plumbed, Door_in_Door, Reversible_Door, Instaview, Door_cooling, Linearcooling],
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
		Feature: [Plumbed, Reversible_Door, Instaview, Door_cooling, Linearcooling, Wine_Rack],
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
				changeScreenImg: 'step02/que_img03.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img03.png',
			}
		},
		{
			key: 'Type_value4',
			class: 'product4',
			screenImg: {
				changeScreenImg: 'step02/que_img04.png',
				lastScreenImg: 'step07/american_que_img04.png',
				resultImg: 'result/center_img04.png',
			}
		},
		{
			key: 'Type_value5',
			class: 'product5',
			screenImg: {
				changeScreenImg: 'step02/que_img05.png',
				lastScreenImg: 'step07/american_que_img04.png',
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
				value: Type_value2,
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
				value: Type_value3,
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
				value: Type_value4,
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
				value: Type_value5,
				content: 'Frigoriferi Maxi Side-by-Side',
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
				value: Capacity_value1,
				content: 'Meno di 400L',
				changeData: {
					description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
					icon: 'step02/disc_icon01.png',
				}
			},
			{
				key: 'Capacity',
				value: Capacity_value2,
				content: 'Da 400L a 500L',
				changeData: {
					description: 'La capacità ideale se fai la spesa una volta alla settimana e devi conservare tanto cibo.',
					icon: 'step02/disc_icon02.png',
				}
			},
			{
				key: 'Capacity',
				value: 'Capacity_value3',
				content: 'Da 500L a 600L',
				changeData: {
					description: 'Consigliato se hai una famiglia numerosa e vuoi avere più spazio per i tuoi alimenti rispetto a un frigo tradizionale.',
					icon: 'step02/disc_icon03.png',
				}
			},
			{
				key: 'Capacity',
				value: Capacity_value4,
				content: 'Oltre 600L',
				changeData: {
					description: 'Perfetto per soddisfare le esigenze di una famiglia numerosa grazie alla maxi capacità.',
					icon: 'step02/disc_icon04.png',
				}
			},
			{
				key: 'step02',
				value: AllSelectOption,
				content: 'Scelta multipla',
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
				value: Depth_value1,
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
				value: Width_value1,
				content: 'Meno di 60cm',
			},
			{
				key: 'Width',
				value: Width_value2,
				content: 'Da 61 a 80cm',
			},
			{
				key: 'Width',
				value: Width_value3,
				content: 'Da 81 a 90cm',
			},
			{
				key: 'Width',
				value: Width_value4,
				content: '91cm o più',
			},
			{
				key: 'step03-1',
				value: AllSelectOption,
				content: 'Scelta multipla',
			},
		],
		[
			{
				key: 'Height',
				value: Height_value1,
				content: 'Meno di 180cm',
			},
			{
				key: 'Height',
				value: Height_value2,
				content: 'Da 180 a 200cm',
			},
			{
				key: 'Height',
				value: Height_value3,
				content: '200cm o più',
			},
			{
				key: 'step03-2',
				value: AllSelectOption,
				content: 'Scelta multipla',
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
						detail: 'Quando non hai a disposizione un rubinetto dell’acqua nelle vicinanze, i frigorifero con tanica interna sono la soluzione ideale per avere acqua fresca e ghiaccio ogni volta che vuoi.'
					},
					screenImg: 'step04/que_img03.png',
				}
			},
			{
				key: 'Feature',
				value: Water_Only,
				content: 'Senza allacciamento idrico (solo acqua)',
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
				content: 'Scelta multipla',
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
				content: 'Scelta multipla',
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
				changeData: {
					description: 'Bussa sul vetro per vedere cos’hai nel frigorifero senza aprire la porta principale ed evitando dispersioni di aria fredda.',
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
					screenImg: 'step06/que_img05.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Folding_Shelf,
				content: 'Ripiano pieghevole',
				changeData: {
					description: 'Aumenta lo spazio sui ripiani quando devi conservare bottiglie o pentole semplicemente ripiegando il ripiano su se stesso.',
					screenImg: 'step06/que_img06.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'Feature',
				value: Wine_Rack,
				content: 'Wine rack',
				changeData: {
					description: 'Un pratico supporto in metallo sagomato per organizzare e tenere in fresco fino a 5 bottiglie di vino, disposte parallelamente agli altri ripiani.',
					screenImg: 'step06/que_img07.png',
				},
				resultContent: 'step06',
			},
			{
				key: 'SmartTechnology',
				value: ThinQ, 
				content: 'Funzioni Smart con </br>Intelligenza Artificiale',
				description: {
					head: 'Un assistente smart che ti dà una mano',
					detail: 'Collega il frigorifero al Wi-Fi e gestiscilo anche quando sei fuori casa direttamente dal tuo smartphone.'
				},
				resultContent: 'step06',
			},
			{
				key: 'step06',
				value: AllSelectOption,
				content: 'Scelta multipla',
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
				value: Color_value1,
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
				value: Color_value2,
				content: 'Acciaio inox',
				changeData: {
					description: 'Un look aggraziato per un frigorifero facile da pulire.',
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
				content: 'Argento',
				changeData: {
					description: 'Si abbina a gran parte degli elettrodomestici, donando uniformità di stile alla tua cucina.',
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
				content: 'Bianco',
				changeData: {
					description: 'Adattabile a qualunque arredamento.',
					screenImg: 'que_img04.png',
					// learnMore: {
					// 	interactionPage: 'white', 
					// },
				},
				resultContent: 'step07',
			},
			{
				key: 'Color',
				value: Color_value5,
				content: 'Beige',
				changeData: {
					description: 'Un tocco delicato al colore della tua cucina.',
					screenImg: 'que_img04.png',
					// learnMore: {
					// 	interactionPage: 'white', 
					// },
				},
				resultContent: 'step07',
			},
			{
				key: 'step07',
				value: AllSelectOption,
				content: 'Scelta multipla',
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