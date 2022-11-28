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