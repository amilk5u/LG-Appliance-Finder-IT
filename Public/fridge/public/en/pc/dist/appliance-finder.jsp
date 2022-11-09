<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/jsp/gp/common/include/head/head.jsp" %>
<head>
   <!-- default code -->
   <%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-default-tag.jsp" %>
   <!-- sns tag -->
   <%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-sns-tag.jsp" %>
   <!-- chrome audits -->
   <meta name="theme-color" content="#a50034" />
   <title>Fridge freezer finder | LG UK</title>
   <meta name="Keywords" content="Multi Door Fridge Freezer, American Style Fridge Freezer, Tall Fridge Freezer, LG, LG fridge freezer, LG Refrigerator, Combi, Bottom Freezer,  Side by Side Frigde Freezer">
   <meta name="Description" content="Do you need some help choosing a fridge freezer? LG's appliance finder is here to help guide you on your journey.">
   <meta property="og:title" content="Fridge freezer finder | LG UK" />
   <meta property="og:url" content="https://www.lg.com/uk/fridge-freezer/appliance-finder">
   <meta property="og:description" content="Do you need some help choosing a fridge freezer? LG's appliance finder is here to help guide you on your journey." />
   <meta property="og:image" content="https://www.lg.com/uk/fridge-freezer/images/common/og_banner.jpg">
   <jsp:include page="/WEB-INF/jsp/gp/common/include/head/head-css.jsp" />
   <jsp:include page="/WEB-INF/jsp/gp/common/include/head/font-woff.jsp" />
   <!-- // default code -->
   <jsp:include page="/WEB-INF/jsp/gp/common/include/head/mic-head-script.jsp" />
   <jsp:include page="/WEB-INF/jsp/gp/common/include/head/gateway-foresee.jsp" />
   <!-- your css -->
   <link rel="stylesheet" href="./stylesheets/css/common.css">
   <script src="./javascripts/jquery-1.8.2.min.js"></script>
   <!-- //your css -->
</head>
<body>
   <jsp:include page="/WEB-INF/jsp/gp/common/include/body/body-noscript.jsp" />
   <jsp:include page="/WEB-INF/jsp/gp/common/include/body/google-tag-manager.jsp" />
   <jsp:include page="/WEB-INF/jsp/gp/common/include/body/broswe-check-popup-layer.jsp" />
   <div class="sr-only" itemscope itemtype="http://schema.org/WebPage">
      <meta itemprop="name" content="{Browser Title}" />
      <meta itemprop="image" content="{Share Image}" />
      <meta itemprop="url" content="{Cannonical URL}" />
      <meta itemprop="description" content="{Page Description}" />
      <meta itemprop="Keywords" content="{Page Keyword}" />
   </div>
   <c:set var='bizType' value='${$bizType }' />
   <c:set var='siteType' value='MKT' />
   <!-- component (navigation) -->
   <c:import url="/${localeCd }/gnb">
      <c:param name="bizType" value="${bizType}" />
      <c:param name="siteType" value="${siteType}" />
      <c:param name="isMobile" value="${isMobile}" />
   </c:import>
   <!-- // component (navigation) -->
   <!-- breadcrumb -->
   <c:import url="/${localeCd }/breadCrumb">
      <c:param name="bizType" value="${bizType}" />
   </c:import>
   <!-- // breadcrumb -->

   <!-- Enter Code Here -->
	<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css">
	<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js"></script>

	<!--intro-->
	<div id="finderIntro">
		<div id="introAnimation">
			<div id="animationPlayer"></div>
		</div>
	</div>
	<!--//intro-->

	<!-- finder -->
	<div id="quickFinder" class="step01">
		<div class="finder_wrap">
			<!--navigation-->
			<div id="finderNav">
				<ul>
					<li>
						<strong>1</strong>
						<p>TYPE</p>
					</li>
					<li>
						<strong>2</strong>
						<p>CAPACITY</p>
					</li>
					<li>
						<strong>3</strong>
						<p>SIZE</p>
					</li>
					<li>
						<strong>4</strong>
						<p>ICE & WATER DISPENSER</p>
					</li>
					<li>
						<strong>5</strong>
						<p>PERFORMAMCE</p>
					</li>
					<li>
						<strong>6</strong>
						<p>FEATURE</p>
					</li>
					<li>
						<strong>7</strong>
						<p>COLOUR</p>
					</li>
				</ul>
			</div>
			<!--//navigation-->
			<!--question & answer area-->
			<div class="qna_wrap">
				<div class="qna_description qna_description01">
					<div class="txt_box">
						<i></i>
						<p></p>
						<button type="button" class="load_more_btn">LOAD MORE</button>
						<button type="button" class="learn_more_btn">Learn More</button>
					</div>
				</div>
				<div class="qna_description qna_description02">
					<div class="txt_box">
						<p></p>
						<button id="detailCloseBtn" type="button" class="close_more_btn">CLOSE</button>
					</div>
				</div>
			</div>
			<!--//question & answer area-->
			<!--question image-->
			<div id="qnaImgWrap"></div>
			<!--//question image-->
		</div>
		<!--선택 항목 버튼-->
		<!--선택 된 항목은 button에 active 클래스-->
		<!--선택 불가 항목은 button에 disable 클래스-->
		<div id="selectWrap">
			<button type="button" class="caution_open_btn">Click here for a guide to dimensions and measurement.</button>
			<div class="select_tit">
				<strong></strong>
			</div>
			<ol></ol>
		</div>
		<!--//선택 항목 버튼-->
		<!--항목 선택 됬을 때 shopNowBtn 클래스에 active 추가-->
		<div class="show_now_wrap">
			<button type="button" id="shopNowBtn">See Results Now</button>
		</div>
		<!--항목 선택되면 nextStepBtn id에 active 클래스 추가-->
		<div class="step_move_wrap">
			<div class="btn_cont">
				<button type="button" id="backStepBtn">BACK</button>
			</div>
			<div class="btn_cont">
				<button type="button" id="nextStepBtn">NEXT</button>
			</div>
		</div>
	</div>
	<!-- //finder -->

	<!--result-->
	<div id="finderResult">
		<strong class="tit">You’re set out <br>to make a savvy choice!</strong>
		<div class="center_img_wrap" style="background-image: url(./images/pc/result/center_img03.png);"></div>
		<div class="txt_wrap">
			<dl>
				<dt>You chose a</dt>
			</dl>
			<dl>
				<dt>You prioritise</dt>
			</dl>
			<dl>
				<dt>We'll recommend you</dt>
			</dl>
			<dl>
				<dt>fridges with</dt>
			</dl>
		</div>
		<div class="result_btn_wrap">
			<button type="button" id="tryAgain">Try Again</button>
			<button type="button" id="shopNowBtn02">Get Result</button>
		</div>
	</div>
	<!--//result--> 

   <!-- step01 Interactive Popup -->
	<div class="popup_step01 popup_step">
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Multi Door Fridge Freezer</strong>
			</div>
			<div class="popup_con">
				<strong> An appropriate choice for large households or food lovers</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img01.png" alt="family & Multi Door Fridge Freezer">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img01.png" alt="family & Multi Door Fridge Freezer">
					<div class="txt_box">
						<p> Good for big households or those who use the fridge often. The elevated fridge position also requires less bending down. Also known as French style/door fridges, these are increasingly popular in the UK market. </p>
						<button type="button" class="close_btn">Moving On</button>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>American Style Fridge Freezer</strong>
			</div>
			<div class="popup_con">
				<strong> A good choice for those who <br> use the freezer frequently</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img02.png" alt="cooking & American Style Fridge Freezer">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img02.png" alt="cooking & American Style Fridge Freezer">
					<div class="txt_box">
						<p> Fridge and freezer sections are positioned next to each other, making both easy to reach. This vertically arranged 'side-by-side' or 'double door' type fridge freezer is spacious. It offers high capacity with our largest model, and is chosen by nearly a quarter of UK households. </p>
						<button type="button" class="close_btn">Moving On</button>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Tall Fridge Freezer</strong>
			</div>
			<div class="popup_con">
				<strong> A sleek and practical <br> space-saving option</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img03.png" alt="best seller & Tall Fridge Freezer">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img03.png" alt="best seller & Tall Fridge Freezer">
					<div class="txt_box">
						<p> Fits effortlessly into smaller spaces, ideal too for prudent grocery shoppers who store smaller quantities of food. A popular, decades-long steady-seller in the UK, chosen by nearly half of households. </p>
						<button type="button" class="close_btn">Moving On</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //step01 Interactive Popup -->

	<!-- step03 Size Popup -->
	<div class="popup_step03 popup_step">
		<div class="popup_wrap">
			<strong>SIZE GUIDE</strong>
			<div class="multi">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img01_1.jpg" alt="Multi Door Fridge Freezer, width / height / depth">
						<img class="pc_only" src="./images/pc/step03/popup_img01_1.jpg" alt="Multi Door Fridge Freezer, width / height / depth">
					</div>
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img01_2.jpg" alt="Multi Door Fridge Freezer, depth">
						<img class="pc_only" src="./images/pc/step03/popup_img01_2.jpg" alt="Multi Door Fridge Freezer, depth">
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="american">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img02_1.jpg" alt="American Style Fridge Freezer, width / height / depth">
						<img class="pc_only" src="./images/pc/step03/popup_img02_1.jpg" alt="American Style Fridge Freezer, width / height / depth">
					</div>
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img02_2.jpg" alt="American Style Fridge Freezer, depth">
						<img class="pc_only" src="./images/pc/step03/popup_img02_2.jpg" alt="American Style Fridge Freezer, depth">
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="tall">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img03_1.jpg" alt="Tall Fridge Freezer, width / height / depth">
						<img class="pc_only" src="./images/pc/step03/popup_img03_1.jpg" alt="Tall Fridge Freezer, width / height / depth">
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<button type="button" class="popup_close_btn">Close button</button>
		</div>
	</div>
	<!-- //step03 Size Popup -->

	<!-- step05 Video Popup -->
	<div class="popup_movie_step05 popup_step">
		<div class="popup_wrap">
			<div class="long">
				<strong>Long-lasting Freshness</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video01.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video01_poster_img.jpg" alt="Long-lasting Freshness poster">
					<button type="button" class="video_btn" data-link-name="Video Play : Long-lasting Freshness">Video Play Button</button>
				</div>
				<div class="desc">
					<span> *The placement of the Door Cooling+ feature may differ by fridge. </span>
					<span> *The video of the product are for illustration purpose only and may differ from the actual product. Door Cooling+ is supposed to stop working when the door is opened. </span>
				</div>
			</div>
			<div class="ventilation">
				<strong>Ventilation</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video02.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video02_poster_img.jpg" alt="Ventilation poster">
					<button type="button" class="video_btn" data-link-name="Video Play : Ventilation">Video Play Button</button>
				</div>
				<div class="desc">
					<span>*The placement and appearance of the Pure N Fresh feature may differ by fridge.</span>
				</div>
			</div>
			<div class="instaview">
				<strong>InstaView™ Door-in-Door®</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video03.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video03_poster_img.jpg" alt="InstaView™ Door-in-Door® poster">
					<button type="button" class="video_btn" data-link-name="Video Play : InstaView™ Door-in-Door®">Video Play Button</button>
				</div>
			</div> 
			<div class="smart_ai_features">
				<strong>Smart/AI features</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video04.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video04_poster_img.jpg" alt="Smart/AI features">
					<button type="button" class="video_btn" data-link-name="Video Play : Smart/AI features">Video Play Button</button>
				</div>	
				<div class="desc">
					<span>*Google and Google Home are trademarks of Google LLC.</span>
					<span>*Amazon, Alexa, Echo and all related logos and motion marks are trademarks of Amazon.com, Inc or its affiliates.</span>
					<span>*LG SmartThinQ is now renamed as LG ThinQ.</span>
					<span>*Smart features and voice assistant product may vary by country and model. Check with your local retailer or LG for service availability.</span>
					<span>*Voice-enabled smart speaker device is not included.</span>
					<span>*The video of the product may differ from the actual product.</span>
				</div>			
			</div>
			<button type="button" class="popup_close_btn">Close button</button>
		</div>
	</div>
	<!-- //step05 Video Popup -->

	<!-- step07 Interactive Popup -->
	<div class="popup_step07 popup_step">
		<div class="popup_wrap">
			<div class="popup_step07_slide">
				<ol class="swiper-wrapper">
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Black</strong>
						</div>
						<div class="popup_con">
							<strong> Black never goes out <br> fashion</strong>
							<div class="txt_wrap">
								<img src="" alt="black product">
								<div class="txt_box">
									<div>
										<p> Matte black surfaces are <br> less likely to show <br> fingerprints from frequent use. </p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Stainless Steel</strong>
						</div>
						<div class="popup_con">
							<strong> A sleek shade that blends in <br> effortlessly with various <br> home styles</strong>
							<div class="txt_wrap">
								<img src="" alt="steel product">
								<div class="txt_box">
									<div>
										<p> Its sleek appearance is <br> both easy on the eye and <br> low maintenance. </p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Silver</strong>
						</div>
						<div class="popup_con">
							<strong> A steady-selling colour that goes well with any kitchen interior, mood or look</strong>
							<div class="txt_wrap">
								<img src="" alt="silver product">
								<div class="txt_box">
									<div>
										<p> Silver goes well with <br> various colours and <br> interior styles. </p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>White</strong>
						</div>
						<div class="popup_con">
							<strong> White is always a classy choice. <br> Clean, fresh and easy to maintain</strong>
							<div class="txt_wrap">
								<img src="" alt="white product">
								<div class="txt_box">
									<div>
										<p> Your new fridge will blend <br> well with diverse décor <br> styles and materials. </p>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ol>
			</div>
			<button type="button" class="close_btn">Your results are ready!</button>
			<div class="indicator"></div>
		</div>
	</div>
   <!-- //step07 Interactive Popup -->
   <!-- // Enter Code Here -->

	<!-- top button -->
   <jsp:include page="/WEB-INF/jsp/gp/common/include/body/top.jsp" />
	<!-- // top button -->

	<!-- footer seo copy -->
   <c:import url="/${localeCd }/footerSeoCopy" />
	<!-- footer seo copy -->

	<!-- footer main contents -->
   <c:import url="/${localeCd }/footer">
      <c:param name="bizType" value="${bizType}" />
      <c:param name="siteType" value="${siteType}" />
   </c:import>
	<!--// footer main contents -->

   <script>
      var standardData = {};
      standardData = {
         "siteType": "B2C",
         "pageType": "MICROSITE",
         "pdpStatus": "",
         "level1": "ha",
         "level2": "",
         "level3": ""
      };
      _dl = {
         "page_name": {
            "super_category": "home-appliances",
            "bu": "ha",
            "sub_category_list": "",
            "sub_category": "",
            "page_purpose": "microsite",
            "category": "refrigerators",
				"microsite_name": "FRIDGE-FREEZERS-FINDER"
         },
         "country_code": "uk", 
         "language_code": "en",
         "appliance_name": "appliance finder"
      };
		
      var dataLayer = window.dataLayer || [];
      dataLayer.push({
         'event': 'dataLayer',
         'dataLayer': _dl,
         'standardData': standardData
      });
   </script>

	<!-- <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-MRK2HXK');</script> -->

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-69014947-47"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-69014947-47');
	</script>
	<!-- //Global site tag (gtag.js) - Google Analytics -->

   <!-- default code -->
   <jsp:include page="/WEB-INF/jsp/gp/common/include/tail/tail-script-default.jsp" />
   <!-- // default code -->

   <!-- your js -->
   <script src="./javascripts/plugin.js"></script>
   <script src="./javascripts/design_common.js"></script>
   <!-- //your js -->
</body>
</html>