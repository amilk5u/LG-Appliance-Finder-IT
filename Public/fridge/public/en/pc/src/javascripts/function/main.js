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

	let currentUrl = document.location.href; // 현재 url
	let resultPageUrl; // pdp 페이지 (result)
	let stageLiveDecide; // 현재 url 판단
	let _animationJson; // json file
	let headerH = $('header').outerHeight();

	// LG stg live <--> 로컬 판단
	currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;

	if (stageLiveDecide) {
		resultPageUrl = './../promotions/fridge-freezers-finder-result';
	} else {
		resultPageUrl = 'https://wwwstg.lg.com/uk/promotions/fridge-freezers-finder-result';
	}

	// json animation Desktop / Mobile 구분
	if (window.innerWidth >= 1024) {
		_animationJson = './images/pc/intro/intro_animation.json';
	} else {
		_animationJson = './images/intro/intro_animation.json';
	}

	// json animation
	var introLottie = lottie.loadAnimation({
		container: document.getElementById('animationPlayer'), // required
		path: _animationJson, // required
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

	function stepUpdateEvent(idx, _judgmentStep) {
		let _htmlIdx = idx; // 항목 별 index
		if (idx > 2) { _htmlIdx += 2; }// 페이지 데이터 index
		let _currentHtml = configData.htmlData[_htmlIdx]; // 현재 스텝의 항목 데이터
		let _lastAnswerValue; // 저장된 데이터에서 마지막 value
		let _stepProductArray = []; // 스텝별 제품 추출
		currentStep = configData.finderSetting[idx]; // 인터렉션 페이지 유/무

		!stageLiveDecide && console.log('selectedParameters : ', selectedParameters); // 선택된 key,value
		idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제

		// 앞전 데이터 삭제
		_judgmentStep === 'backStep' && matchingProducts.pop();

		console.log('index : ', idx, ' -------------------------------------------------')
		$('body,html').scrollTop(0);
		$descDetailWrap.removeClass('open');
		TweenMax.to($nextBtn, .2, { display: 'none', opacity: 0 });
		$showNow.removeClass('active');
		$quickFinder.removeClass();
		$quickFinder.addClass(configData.finderSetting[idx].finderStep); // step class 변경
		$(window).scrollTop(headerH);

		// next 버튼에 내용 step 별 내용 심기
		$nextBtn.attr('data-link-name', 'Next : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());

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


		if (idx === 2) {
			// step 3 데이터 뿌리기
			let liHtml = '';
			while (_htmlIdx < 5) { // 2, 3, 4 연속 출력
				let _currentHtml = configData.htmlData[_htmlIdx]; // 현재 스텝의 항목 데이터
				let _buttonHtml = '';
				for (let i = 0; i < _currentHtml.length; i++) {
					_buttonHtml += '<button class="answer_btn" type="button" data-key="' + _currentHtml[i].key + '" data-value="' + _currentHtml[i].value + '"><i></i><p>' + _currentHtml[i].content + '</p></button>';
				}
				liHtml += '<li><span>' + configData.finderSetting[idx].key[_htmlIdx - 2] + '<em>You Can Select Multiple Choices.</em> </span> <div>' + _buttonHtml + ' </div></li> ';
				_htmlIdx++;
			}
			$selectWrap.find('ol').append(liHtml);
		} else if (idx === 6) {
			for (let i = 0; i < _currentHtml.length; i++) {
				$selectWrap.find('ol').append('<li><button class="answer_btn" type="button" data-key="' + _currentHtml[i].key + '"  data-value="' + _currentHtml[i].value + '"><span></span><p>' + _currentHtml[i].content + '</p></button></li>');
			}
		} else {
			for (let i = 0; i < _currentHtml.length; i++) {
				$selectWrap.find('ol').append('<li><button class="answer_btn" type="button" data-key="' + _currentHtml[i].key + '"  data-value="' + _currentHtml[i].value + '"><i></i><p>' + _currentHtml[i].content + '</p></button></li>');
			}
		}

		// 선택된 제품 추출 
		// step 1만 동작
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

				// 제품 갯수만큼 for 문 실행
				for (let i = 0; i < _lastPro.length; i++) {
					let _judgmentNum = 0; // true 된 갯수 판단
					// 선택한 value 값 추출
					for (let j = 0; j < stepCount[stepCount.length - 1]; j++) {
						let _selectValue = selectedParameters[selectedParameters.length - (1 + j)].split('=')[1]; // value
						for (let p = 0; p < _restKey.length; p++) {
							// value값 비교해서 같으면 ++
							// console.log(_lastPro[i][_restKey[p]], _selectValue, _lastPro[i][_restKey[p]] === _selectValue, _lastPro[i])
							if (_lastPro[i][_restKey[p]] === _selectValue) {
								_judgmentNum++
							}
						}
					}
					// 선택한 key 만큼 _judgmentNum 의 true 된 갯수가 동일 할 때의 제품을 추출
					if (_judgmentNum === _restKey.length) {
						_stepProductArray.push(_lastPro[i]);
					}
				}
				matchingProducts.push(_stepProductArray);
			} else if (idx === 5) {
				let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
				// 추출된 마지막 제품 갯수 만큼 for 문 실행 
				for (let i = 0; i < _lastPro.length; i++) {
					let _valueCounting = stepCount[stepCount.length - 1]; // step count
					let _judgmentNum = 0; // 매칭 count
					let _AllSelectBol = false; // All Select 데이터가 있는지 없는지 판단
					// console.log('비교제품 : ', _lastPro[i])
					// 마지막에 선택한 value 값 추출
					for (let j = 0; j < _valueCounting; j++) {
						let _selectKey = selectedParameters[selectedParameters.length - (1 + j)].split('=')[0]; // key
						let _selectValue = selectedParameters[selectedParameters.length - (1 + j)].split('=')[1]; // value
						// value 값 비교
						let _bol = false;

						if (Array.isArray(_lastPro[i][_selectKey])) {
							for (let p = 0; p < _selectValue.split(',').length; p++) { // feature 중에 value 값이 여러개인 값 판단
								for (let u = 0; u < _lastPro[i][_selectKey].length; u++) {
									if (_selectValue.split(',')[p] === _lastPro[i][_selectKey][u]) {
										// console.log('선택된 데이터 : ', _selectValue.split(',')[p], '비교될 제품 데이터 : ', _lastPro[i][_selectKey][u], _selectValue.split(',')[p] === _lastPro[i][_selectKey][u])
										_bol = true;
										break;
									}
								}

								// AllSelectOption 데이터 존재할 경우에 _valueCounting -1 개를 삭제
								if (_selectValue.split(',')[p] === AllSelectOption) {
									_AllSelectBol = true;
								}
							}
							if (_bol) {
								_judgmentNum++;
							}
						} else {
							for (let p = 0; p < _selectValue.split(',').length; p++) { // feature 중에 value 값이 여러개인 값 판단
								if (_selectValue.split(',')[p] === _lastPro[i][_selectKey]) {
									// console.log('선택된 데이터 : ', _selectValue.split(',')[p], '비교될 제품 데이터 : ', _lastPro[i][_selectKey], _selectValue.split(',')[p] === _lastPro[i][_selectKey])
									_judgmentNum++;
									break;
								}

								// AllSelectOption 데이터 존재할 경우에 _valueCounting -1 개를 삭제
								if (_selectValue.split(',')[p] === AllSelectOption) {
									_AllSelectBol = true;
								}
							}
						}
					}
					if (_AllSelectBol) { // All Select 가 있으면 - 1
						_valueCounting--;
					}
					// 선택한 벨류값의 갯수와 true 된 갯수와 같으면 제품 추출
					// console.log(_judgmentNum, _valueCounting, _judgmentNum === _valueCounting)
					if (_judgmentNum === _valueCounting) {
						console.debug('선택된 제품 : ', _lastPro[i]);
						_stepProductArray.push(_lastPro[i]);
					}
				}
				matchingProducts.push(_stepProductArray);
			} else {
				// 2, 4, 6
				let _lastPro = matchingProducts[matchingProducts.length - 1]; // 라스트 추출 제품 가져오기
				let _bol = false;

				// 추출된 마지막 제품 갯수 만큼 for 문 실행 
				for (let i = 0; i < _lastPro.length; i++) {
					let _valueCounting = stepCount[stepCount.length - 1]; // step count
					let _judgmentNum = 0; // 매칭 count
					let _AllSelectBol = false; // All Select 데이터가 있는지 없는지 판단
					// 마지막에 선택한 value 값 추출

					// console.log('비교제품 : ', _lastPro[i])

					for (let j = 0; j < stepCount[stepCount.length - 1]; j++) {
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
									console.log('선택된 데이터 : ', _selectValue, '비교될 제품 데이터 : ', selectValueArray[p], selectValueArray[p] === _selectValue)
									if (selectValueArray[p] === _selectValue) {
										idx !== 6 && _stepProductArray.push(_lastPro[i]);
										_judgmentNum++;
									}

									// AllSelectOption 데이터 존재할 경우에 _valueCounting -1 개를 삭제
									if (_selectValue === AllSelectOption) {
										_AllSelectBol = true;
									}
								}
							} else {
								// console.log('선택된 데이터 : ', _selectValue, '비교될 제품 데이터 : ', _lastPro[i][_selectKey], _lastPro[i][_selectKey] === _selectValue)
								if (_lastPro[i][_selectKey] === _selectValue) {
									idx !== 6 && _stepProductArray.push(_lastPro[i]);
									_judgmentNum++;
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
					// console.log(_judgmentNum, _valueCounting, _judgmentNum === _valueCounting)
					if (idx === 6 && _judgmentNum === _valueCounting) {
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
			let _AllSelectKeyValue;

			// console.log(AllSelectOption)
			if (_this.data('value') === AllSelectOption) { // All Select Button (전체 선택 버튼)
				if (idx !== 2) {
					// All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
					$('.answer_btn').each(function () {
						if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined && $(this).data('value') !== AllSelectOption) { // acitve 없고, diabled 없고, All Select 가 아닌 버튼의 kay / value 값 
							selectedParameters.push($(this).data('key') + '=' + $(this).data('value')); // push
						}
						// active 전체 갯수 카운팅 ++
						if ($(this).attr('disabled') === undefined) {
							_answerBtnActive++
						}
					});
					// All Select 선택시 모든 옵션이 선택됨
					if (!_this.hasClass('active')) {
						$('.answer_btn').each(function () {
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
				} else {
					// console.log('step02 번');
				}
			} else { // Answer Button (일반 버튼)
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
						_this.removeClass('active');
						// All Select Option Active 삭제 & key / value 값 저장
						$('.answer_btn').each(function () {
							if ($(this).data('value') === AllSelectOption) {
								console.log($(this).removeClass('active'))
								_AllSelectKeyValue = $(this).data('key') + '=' + $(this).data('value')
							}
						});
						// All Select Option key / value 배열에서 삭제
						selectedParameters.forEach(function (item, i) {
							if (item === _AllSelectKeyValue) {
								selectedParameters.splice(i, 1);
							}
						});
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
				if (_val === 'FTV0329693V') {
					result += selectedParameters[i] + '&'
					result += _key + '=' + 'FV65319312&'
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