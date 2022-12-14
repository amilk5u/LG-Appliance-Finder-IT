<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/jsp/gp/common/include/head/head.jsp" %>
<head>
   <!-- default code -->
   <%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-default-tag.jsp" %>
   <!-- sns tag -->
   <%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-sns-tag.jsp" %>
   <!-- chrome audits -->
   <meta name="theme-color" content="#a50034" />
   <title>Washing machine finder | LG UK</title>
   <meta name="Keywords" content="Washing machine, Washer and dryer, LG, LG washing machine, Washer dryer, washer dryer combo, 2-in-1 Washing machine, Steam Washer">
	<meta name="Description" content="Do you need some help choosing a washing machine? LG's appliance finder is here to help guide you on your journey.">
   <meta property="og:title" content="Washing machine finder | LG UK" />
	<meta property="og:url" content="https://www.lg.com/uk/washing-machine/appliance-finder">
	<meta property="og:description" content="Do you need some help choosing a washing machine? LG's appliance finder is here to help guide you on your journey." />
	<meta property="og:image" content="https://www.lg.com/uk/washing-machine/images/common/og_banner.jpg">
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

	<!-- pc ?????? ????????? QR ?????? -->
	<!-- <div id="onlyMobile">
		<div class="txt_wrap">
			<strong>Appliance finder only offers <br>a mobile version for now,</strong>
			<p> so we ask that you <br> use your phone to access it. <br> Stay tuned for the upcoming <span>desktop version! </span>
			</p>
		</div>
	</div> -->
	<!-- // pc ?????? ????????? QR ?????? -->
	
	<!-- intro -->
	<div id="finderIntro">
		<div id="introAnimation">
			<div id="animationPlayer"></div>
		</div>
	</div>
	<!-- //intro -->

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
						<p>ENERGY EFFICIENT</p>
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
		<div id="selectWrap">
			<button type="button" class="caution_open_btn">Click here for a guide to dimensions and measurement.</button>
			<div class="select_tit">
				<strong></strong>
			</div>
			<ol></ol>
		</div>
		<div class="show_now_wrap">
			<!--?????? ?????? ??? ?????? shopNowBtn id ??? (active) class ??????-->
			<button type="button" id="shopNowBtn">See Results Now</button>
		</div>
		<div class="step_move_wrap">
			<div class="btn_cont">
				<button type="button" id="backStepBtn">BACK</button>
			</div>
			<div class="btn_cont">
				<!--?????? ?????? ??? ?????? nextStepBtn id ??? (active) class ??????-->
				<button type="button" id="nextStepBtn">NEXT</button>
			</div>
		</div>
	</div>
	<!-- //finder -->

	<!-- result -->
	<div id="finderResult">
		<strong class="tit">You???re set out <br>to make a savvy choice!</strong>
		<div class="center_img_wrap"></div>
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
				<dt>washing machines with</dt>
			</dl>
		</div>
		<div class="result_btn_wrap">
			<button type="button" id="tryAgain">Try Again</button>
			<button type="button" id="shopNowBtn02">Get Result</button>
		</div>
	</div>
	<!-- //result --> 

   <!-- step01 Interactive Popup -->
	<div class="popup_step01 popup_step">
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Washer Only</strong>
			</div>
			<div class="popup_con">
				<strong>Like to keep it simple and reliable? </br> This may be your perfect </br> choice of washing machine</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img01.png" alt="family & Washer Only">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img01.png" alt="family & Washer Only">
					<div class="txt_box">
						<p>Classic in appearance and functionality, these efficiently execute the primary functions of a washing machine. Large-capacity machines have risen as the popular choice for households  in recent years.</p>
						<button type="button" class="close_btn">Moving On</button>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Washer and Dryer </strong>
			</div>
			<div class="popup_con">
				<strong>This combined version is the </br> most popular choice by far</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img02.png" alt="family & Washer and Dryer">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img02.png" alt="family & Washer and Dryer">
					<div class="txt_box">
						<p>You???re opting for a space-saving multi-player. Minimal in appearance, its functions present an all-in-one solution that makes it a frequent choice for the majority of households in markets like the UK.</p>
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
			<div class="popup_box">
				<div class="swiper-wrapper">
					<div class="swiper-slide"> 
						<img class="mo_only" src="./images/step03/popup_img01.jpg" alt="Washer Only & Washer and Dryer, width / height / depth">
						<img class="pc_only" src="./images/pc/step03/popup_img01.jpg" alt="Washer Only & Washer and Dryer, width / height / depth">
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
			<div class="gentle_fabric">
				<strong>Gentle Fabric </br>Care for Minimal Damage</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video01.mp4" type="video/mp4">
					</video>			
					<i></i>
					<img src="./images/common/video01_poster_img.jpg" alt="Gentle Fabric Care for Minimal Damage">
					<button type="button" class="video_btn" data-link-name="Video Play : Gentle Fabric Care for Minimal Damage">Video Play Button</button>
				</div>
				<div class="desc">
					<span>*The product images in the image and video are for illustrative purposes only and might differ from the real product.</span>
					<span>*Tested by Intertek on March 2019. Cotton cycle with 2kg of underwear compared to LG Conventional Cotton cycle(F4V9RWP2W vs. FC1450S2W). The results may be different depending on the clothes and environment.</span>
					<span>*AI DD is available in 3 cycles.(Cotton, Mixed Fabric, Easy Care)</span>
				</div>
			</div>
			<div class="hygiene">
				<strong>Hygiene</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video03.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video03_poster_img.jpg" alt="Hygiene">
					<button type="button" class="video_btn" data-link-name="Video Play : Hygiene">Video Play Button</button>
				</div>
				<div class="desc">
					<span>*The product images in the image and video are for illustrative purposes only and might differ from the real product.</span>
					<span>*The Allergy Care cycle approved by the BAF (British Allergy Foundation) eliminates 99.9% of dust mite allergens.</span>
					<span>*Tested by Intertek in December 2018 in accordance with AATCC standard. Cotton cycle with the ???Wrinkle Care" option (3 mixed shirts) compared to the cotton cycle without option. Results may be different depending on clothes and environment.</span>
					<span>*The Wrinkle Care function is optionally available in 6 cycles.</span>
				</div>
			</div>
			<div class="detergent">
				<strong> Detergent Portioned </br>And Dispensed Automatically </strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video02.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video02_poster_img.jpg" alt="Detergent Portioned And Dispensed Automatically">
					<button type="button" class="video_btn" data-link-name="Video Play : Detergent Portioned And Dispensed Automatically">Video Play Button</button>
				</div>
				<div class="desc">
					<span>*The product images in the image and video are for illustrative purposes only and might differ from the real product.</span>
					<span>*Wash up to 20 times with normal dispense level (5 kg load). Tested by LG internal lab. Cotton cycle with "Normal" detergent level.</span>
					<span>*Wash up to 35 loads when using both detergent and softener compartments as detergent. Tested by LG internal lab. Results may vary depending on the environment.</span>
				</div>
			</div>
			<div class="smart_assistance">
				<strong>Smart Assistance</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video04.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video04_poster_img.jpg" alt="Smart Assistance">
					<button type="button" class="video_btn" data-link-name="Video Play : Smart Assistance">Video Play Button</button>
				</div>	
				<div class="desc">
					<span>*Google and Google Home are trademarks of Google LLC.</span>
					<span>*Amazon, Alexa, Echo and all related logos and motion marks are trademarks of Amazon.com, Inc or its affiliates.</span>
					<span>*LG SmartThinQ is now renamed as LG ThinQ.</span>
					<span>*Smart features and voice assistant product may vary by country and model. Check with your local retailer or LG for service availability.</span>
					<span>*Voice-enabled smart speaker device is not included.</span>
					<span>*The video of the product may differ from the actual product.</span>
					<span>*Voice Control is only activated when the washer is powered on.</span>
				</div>				
			</div>
			<div class="powerful_washing">
				<strong>Powerful Washing <br> Performance</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop=""> 
						<source src="./datafile/video05.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video05_poster_img.jpg" alt="Powerful Washing Performance">
					<button type="button" class="video_btn" data-link-name="Video Play : Powerful Washing Performance">Video Play Button</button>
				</div>
				<div class="desc">
					<span>*The product images in the image and video are for illustrative purposes only and might differ from the real product.</span>
					<span>*Tested by Intertek, based on IEC 60456 : edition 5.0. TurboWash39 cycle with 5kg of IEC load compared to Conventional Cotton Cycle with TurboWash (F4V9RWP2W vs. FC1450S2W). The results may be different depending on the environment.</span>
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
							<strong>White</strong>
						</div>
						<div class="popup_con">
							<strong>The traditional choice </br> You can't go wrong with </br> a white appliance</strong>
							<div class="txt_wrap">
								<img src="" alt="white product">
								<div class="txt_box">
									<div>
										<p>White is clean, hygienic and will blend in well with other appliances in your home.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Graphite</strong>
						</div>
						<div class="popup_con">
							<strong>A graphite colourway </br> provides a calming contrast </br> for surrounding items</strong>
							<div class="txt_wrap">
								<img src="" alt="steel product">
								<div class="txt_box">
									<div>
										<p>The natural tones of graphite allow other items to stand out. Since it doesn???t show marks or stains as much as some other finishes, graphite is a practical choice in many ways.</p>
									</div>
								</div>
							</div>
						</div>
					</li>				
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Black</strong>
						</div>
						<div class="popup_con">
							<strong>Adding a black appliance to your </br> set-up adds an eye-catching, </br> unusual touch</strong>
							<div class="txt_wrap">
								<img src="" alt="black product">
								<div class="txt_box">
									<div>
										<p>Choosing black is really making a statement. You are truly one of a kind!</p>
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
            "category": "washing-machines",
			 "microsite_name": "WASHING-MACHINES-FINDER"
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

	<!-- ???????????? gtag (????????? ???????????? ???????????? gtag ?????? ??? ?????? ????????? gtag ?????????) --> 
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-69014947-51"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-69014947-51');
	</script> -->
	<!-- //???????????? gtag (????????? ???????????? ???????????? gtag ?????? ??? ?????? ????????? gtag ?????????) --> 

	<!-- ????????? gtag -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-69014947-47"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-69014947-47');
	</script>
	<!-- //????????? gtag -->

   <!-- default code -->
   <jsp:include page="/WEB-INF/jsp/gp/common/include/tail/tail-script-default.jsp" />
   <!-- // default code -->

   <!-- your js -->
   <script src="./javascripts/plugin.js"></script>
   <script src="./javascripts/design_common.js"></script>
   <!-- //your js -->
</body>
</html>