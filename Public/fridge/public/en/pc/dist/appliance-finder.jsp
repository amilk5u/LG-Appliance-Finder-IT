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
						<p>Tipologia</p>
					</li>
					<li>
						<strong>2</strong>
						<p>CAPACITÀ</p>
					</li>
					<li>
						<strong>3</strong>
						<p>DIMENSIONI</p>
					</li>
					<li>
						<strong>4</strong>
						<p>DISPENSER DI ACQUA E GHIACCIO</p>
					</li>
					<li>
						<strong>5</strong>
						<p>PRESTAZIONI</p>
					</li>
					<li>
						<strong>6</strong>
						<p>CARATTERISTICHE</p>
					</li>
					<li>
						<strong>7</strong>
						<p>COLORE</p>
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
						<button type="button" class="load_more_btn">Scopri di più</button>
						<button type="button" class="learn_more_btn">Scopri di più</button>
					</div>
				</div>
				<div class="qna_description qna_description02">
					<div class="txt_box">
						<p></p>
						<button id="detailCloseBtn" type="button" class="close_more_btn">CHIUDI</button>
					</div>
				</div>
			</div>
			<!--//question & answer area-->
			<!--question image-->
			<div id="qnaImgWrap">
				<!-- <img src="./images/pc/step02/people_icon.png" alt="people image"> -->
			</div>
			<!--//question image-->
		</div>
		<!--선택 항목 버튼-->
		<!--선택 된 항목은 button에 active 클래스-->
		<!--선택 불가 항목은 button에 disable 클래스-->
		<div id="selectWrap">
			<button type="button" class="caution_open_btn">Clicca qui per vedere i consigli su misure e dimensioni.</button>
			<div class="select_tit">
				<strong></strong>
			</div>
			<ol></ol>
		</div>
		<!--//선택 항목 버튼-->
		<!--항목 선택 됬을 때 shopNowBtn 클래스에 active 추가-->
		<div class="show_now_wrap">
			<button type="button" id="shopNowBtn">Vai subito ai prodotti</button>
		</div>
		<!--항목 선택되면 nextStepBtn id에 active 클래스 추가-->
		<div class="step_move_wrap">
			<div class="btn_cont">
				<button type="button" id="backStepBtn">INDIETRO</button>
			</div>
			<div class="btn_cont">
				<button type="button" id="nextStepBtn">AVANTI</button>
			</div>
		</div>
	</div>
	<!-- //finder -->

	<!--result-->
	<div id="finderResult">
		<strong class="tit">Ecco un riepilogo di <br>ciò che hai selezionato!</strong>
		<div class="center_img_wrap"></div>
		<div class="txt_wrap">
			<dl>
				<dt>Hai scelto un</dt>
			</dl>
			<dl>
				<dt>Ti interessa</dt>
			</dl>
			<dl>
				<dt>Ti consiglieremo un frigo</dt>
			</dl>
			<dl>
				<dt>con</dt>
			</dl>
		</div>
		<div class="result_btn_wrap">
			<button type="button" id="tryAgain">Cambia le scelte</button>
			<button type="button" id="shopNowBtn02">Vai ai risultati</button>
		</div>
	</div>
	<!--//result--> 

	<!-- step01 Interactive Popup -->
	<div class="popup_step01 popup_step">
		<!-- Multidoor -->
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Multidoor</strong>
			</div>
			<div class="popup_con">
				<strong>La scelta più indicata se devi conservare tanti alimenti o se hai una famiglia numerosa</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img01.png" alt="family & Multidoor">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img01.png" alt="family & Multidoor">
					<div class="txt_box">
						<p>Comodo per le famiglie numerose o per chi usa spesso la zona frigo, facilmente raggiungibile senza chinarti. Chiamato anche frigorifero francese, sta trovando sempre più spazio anche qui in Italia.</p>
						<button type="button" class="close_btn">Andiamo avanti</button>
					</div>
				</div>
			</div>
		</div>
		<!-- // Multidoor -->
		<!-- Side-by-Side -->
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Side-by-Side</strong>
			</div>
			<div class="popup_con">
				<strong>Una scelta indicata se usi spesso il freezer e se hai bisogno di tanto spazio di conservazione</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img02.png" alt="cooking & Side-by-Side">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img02.png" alt="cooking & Side-by-Side">
					<div class="txt_box">
						<p>Chiamato anche "americano", è sempre più popolare anche qui in Italia. Ha il frigorifero a destra e il congelatore a sinistra e offre tanto spazio per gli alimenti. </p>
						<button type="button" class="close_btn">Andiamo avanti</button>
					</div>
				</div>
			</div>
		</div>
		<!-- // Side-by-Side -->
		<!-- Combinati -->
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Combinati</strong>
			</div>
			<div class="popup_con">
				<strong>Una soluzione pratica dall'ingombro ridotto</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img03.png" alt="best seller & Combinati (Combi)">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img03.png" alt="best seller & Combinati (Combi)">
					<div class="txt_box">
						<p>È la tipologia più diffusa qui in Italia: il classico frigorifero alto e snello con congelatore in basso, particolarmente indicato per chi fa la spesa più volte nell'arco della settimana.</p>
						<button type="button" class="close_btn">Andiamo avanti</button>
					</div>
				</div>
			</div>
		</div>
		<!-- // Combinati -->
		<!-- Doppia Porta -->
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Doppia Porta</strong>
			</div>
			<div class="popup_con">
				<strong>Il frigorifero Doppia porta è indicato se hai bisogno di più spazio di conservazione nel comparto frigo</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img04.png" alt="best seller & Doppia Porta (Top Freezer)">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img04.png" alt="best seller & Doppia Porta (Top Freezer)">
					<div class="txt_box">
						<p>Più largo e capiente dei frigoriferi combinati tradizionali, è indicato se hai bisogno di tanto spazio per i tuoi cibi, ma non vuoi passare a un modello Side-by-Side o Multidoor.</p>
						<button type="button" class="close_btn">Andiamo avanti</button>
					</div>
				</div>
			</div>
		</div>
		<!-- // Doppia Porta -->
		<!-- Frigoriferi Maxi Side-by-Side -->
		<div class="popup_wrap">
			<div class="tit_wrap">
				<i></i>
				<strong>Frigoriferi Maxi Side-by-Side</strong>
			</div>
			<div class="popup_con">
				<strong>La scelta migliore se hai bisogno di separare frigo e congelatore</strong>
				<div class="txt_wrap">
					<img class="mo_only" src="./images/step01/popup_contents_img05.png" alt="best seller & Frigoriferi Maxi Side-by-Side (Lader & Freezer)">
					<img class="pc_only" src="./images/pc/step01/popup_contents_img05.png" alt="best seller & Frigoriferi Maxi Side-by-Side (Lader & Freezer)">
					<div class="txt_box">
						<p>Questi elettrodomestici sono perfetti se vuoi un frigo o un congelatore supplementare per conservare ancora più alimenti. Sono modelli componibili in base alle tue esigenze.</p>
						<button type="button" class="close_btn">Andiamo avanti</button>
					</div>
				</div>
			</div>
		</div>
		<!-- // Frigoriferi Maxi Side-by-Side -->
	</div>
	<!-- //step01 Interactive Popup -->

	<!-- step03 Size Popup -->
	<div class="popup_step03 popup_step">
		<div class="popup_wrap">
			<strong>INFO SULLE DIMENSIONI</strong>
			<div class="multi">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img01_1.jpg" alt="Multidoor, Larghezza / Altezza / Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img01_1.jpg" alt="Multidoor, Larghezza / Altezza / Profondità">
						<div class="size_txt">
							<span>Profondità</span>
							<span>Larghezza</span>
							<span>Altezza</span>
						</div>
					</div>
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img01_2.jpg" alt="Multidoor, Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img01_2.jpg" alt="Multidoor, Profondità">
						<div class="depth_size">
							<div class="size_elm">
								<p>In linea con <br> l'arredamento</p>
							</div>
							<div class="size_elm">
								<p>Sporgente</p>
							</div>
						</div>
						<div class="under_more_txt">
							<span>Meno di 760mm</span>
							<span>Più di 760mm</span>
						</div>
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="american">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img02_1.jpg" alt="Side-by-Side, Larghezza / Altezza / Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img02_1.jpg" alt="Side-by-Side, Larghezza / Altezza / Profondità">
						<div class="size_txt">
							<span>Profondità</span>
							<span>Larghezza</span>
							<span>Altezza</span>
						</div>
					</div>
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img02_2.jpg" alt="Side-by-Side, Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img02_2.jpg" alt="Side-by-Side, Profondità">
						<div class="depth_size">
							<div class="size_elm">
								<p>In linea con <br> l'arredamento</p>
							</div>
							<div class="size_elm">
								<p>Sporgente</p>
							</div>
						</div>
						<div class="under_more_txt">
							<span>Meno di 760mm</span>
							<span>Più di 760mm</span>
						</div>
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="tall">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img03_1.jpg" alt="Combinato, Larghezza / Altezza / Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img03_1.jpg" alt="Combinato, Larghezza / Altezza / Profondità">
						<div class="size_txt">
							<span>Profondità</span>
							<span>Larghezza</span>
							<span>Altezza</span>
						</div>
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="double">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img04_1.jpg" alt="Doppia porta, Larghezza / Altezza / Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img04_1.jpg" alt="Doppia porta, Larghezza / Altezza / Profondità">
						<div class="size_txt">
							<span>Profondità</span>
							<span>Larghezza</span>
							<span>Altezza</span>
						</div>
					</div>
				</div>
				<div class="indicator"></div>
			</div>
			<div class="lader">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img05_1.jpg" alt="Frigoriferi Maxi Side-by-Side, Larghezza / Altezza / Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img05_1.jpg" alt="Frigoriferi Maxi Side-by-Side, Larghezza / Altezza / Profondità">
						<div class="size_txt">
							<span>Profondità</span>
							<span>Larghezza</span>
							<span>Altezza</span>
						</div>
					</div>
					<div class="swiper-slide">
						<img class="mo_only" src="./images/step03/popup_img05_2.jpg" alt="Frigoriferi Maxi Side-by-Side, Profondità">
						<img class="pc_only" src="./images/pc/step03/popup_img05_2.jpg" alt="Frigoriferi Maxi Side-by-Side, Profondità">
						<div class="depth_size">
							<div class="size_elm">
								<p>In linea con <br> l'arredamento</p>
							</div>
							<div class="size_elm">
								<p>Sporgente</p>
							</div>
						</div>
						<div class="under_more_txt">
							<span>Meno di 760mm</span>
							<span>Più di 760mm</span>
						</div>
					</div>
				</div>
				<div class="indicator"></div>
			</div>			
			<button type="button" class="popup_close_btn">pulsante di chiusura</button>
		</div>
	</div>
	<!-- //step03 Size Popup -->

	<!-- step05 Video Popup -->
	<div class="popup_movie_step05 popup_step">
		<div class="popup_wrap">
			<div class="long">
				<strong>Mantenimento della freschezza</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video01.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video01_poster_img.jpg" alt="Mantenimento della freschezza manifesto">
					<button type="button" class="video_btn" data-link-name="riproduzione Video : Mantenimento della freschezza">riproduzione Video pulsante</button>
				</div>
				<div class="desc">
					<span>*La posizione delle bocchette del Door Cooling+ può variare a seconda del modello.</span>
					<span>*Il prodotto mostrato nel video è puramente indicativo e può differire dal modello reale. Il sistema Door Cooling+ non è attivo quando la porta del frigo è aperta.</span>
				</div>
			</div>
			<div class="ventilation">
				<strong>Ventilazione</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video02.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video02_poster_img.jpg" alt="Ventilazione manifesto">
					<button type="button" class="video_btn" data-link-name="riproduzione Video : Ventilazione">riproduzione Video pulsante</button>
				</div>
				<div class="desc">
					<span>*La posizione del filtro Pure N Fresh può variare a seconda del modello.</span>
				</div>
			</div>
			<div class="instaview">
				<strong>InstaView™ Door-in-Door®</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video03.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video03_poster_img.jpg" alt="InstaView™ Door-in-Door® manifesto">
					<button type="button" class="video_btn" data-link-name="riproduzione Video : InstaView™ Door-in-Door®">riproduzione Video pulsante</button>
				</div>
			</div> 
			<div class="smart_ai_features">
				<strong>Funzioni Smart con <br>Intelligenza Artificiale</strong>
				<div class="video_wrap">
					<video playsinline="" muted="" loop="">
						<source src="./datafile/video04.mp4" type="video/mp4">
					</video>
					<i></i>
					<img src="./images/common/video04_poster_img.jpg" alt="Funzioni Smart con Intelligenza Artificiale">
					<button type="button" class="video_btn" data-link-name="riproduzione Video : Funzioni Smart con Intelligenza Artificiale">riproduzione Video pulsante</button>
				</div>	
				<div class="desc">
					<span>*Google e Google Home sono marchi di Google LLC.</span>
					<span>*LG SmartThinQ è anche conosciuto come LG ThinQ.</span>
					<span>*Le funzioni smart e quelle degli assistenti vocali possono variare in base al modello e al Paese. Verifica sul sito LG.com la disponibilità dei servizi.</span>
					<span>*Smart speaker con assistente vocale non incluso.</span>
					<span>*Il video delle funzionalità e del prodotto potrebbe differire dal prodotto reale.</span>
				</div>			
			</div>
			<button type="button" class="popup_close_btn">pulsante di chiusura</button>
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
							<strong>Nero</strong>
						</div>
						<div class="popup_con">
							<strong>Sempre di moda</strong>
							<div class="txt_wrap">
								<img src="" alt="Nero product">
								<div class="txt_box">
									<div>
										<p>La superficie nera opaca trattiene meno le impronte, risultando sempre elegante.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Acciaio inox</strong>
						</div>
						<div class="popup_con">
							<strong>Sfumature eleganti che valorizzano i tuoi interni</strong>
							<div class="txt_wrap">
								<img src="" alt="Acciaio inox product">
								<div class="txt_box">
									<div>
										<p>Il look inox non è solo bello da vedere, ma è anche facile da pulire.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Argento</strong>
						</div>
						<div class="popup_con">
							<strong>Uno dei colori più venduti che si adatta a tutti gli stili di arredamento</strong>
							<div class="txt_wrap">
								<img src="" alt="Argento product">
								<div class="txt_box">
									<div>
										<p>L'argento si abbina con praticamente qualunque colore e stile di cucina.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Bianco</strong>
						</div>
						<div class="popup_con">
							<strong>Il bianco è una scelta di classe. Chiaro e facile da pulire</strong>
							<div class="txt_wrap">
								<img src="" alt="Bianco product">
								<div class="txt_box">
									<div>
										<p>Il tuo nuovo frigorifero starà benissimo con tutti i tipi di arredamento.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="swiper-slide">
						<div class="tit_wrap">
							<i></i>
							<strong>Beige</strong>
						</div>
						<div class="popup_con">
							<strong>Aggiungi un tocco di calore alla tua cucina</strong>
							<div class="txt_wrap">
								<img src="" alt="Beige product">
								<div class="txt_box">
									<div>
										<p>Il beige scalda l'atmosfera in cucina e la rende più confortevole.</p>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ol>
			</div>
			<button type="button" class="close_btn">Scopri il frigo per te</button>
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
         "country_code": "it", 
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
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-69014947-28"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-69014947-28');
	</script> -->
	<!-- //Global site tag (gtag.js) - Google Analytics -->
   
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-69014947-51"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-69014947-51');
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