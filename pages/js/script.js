var vidInpage = [],
	vidExpand = [],
	playStateInpage = [],
	playStateExpand = [],
	containerInpage = [],
	containerExpand = [],
	previewTrackings = [],
	engageInpTrackings = [],
	engageExpTrackings = [],
	closeAdTrackings = "",
	previewDuration,
	code,
	content = "",
	dynamicInvo = "",
	isDynamic = false,
	isMobile = false,
	videoInpageCount = document.getElementById("videoInpageCount"),
	videoExpandCount = document.getElementById("videoExpandCount");

videoInpageCount.onkeypress = function(event){
	return (event.keyCode >= 49 && event.keyCode <= 53) ? true : false;
}

videoExpandCount.onkeypress = function(event){
	return (event.keyCode >= 49 && event.keyCode <= 53) ? true : false;
}

videoInpageCount.oninput = function(){
	manifestContent(videoInpageCount,'videoInpageList');
}

videoExpandCount.oninput = function(){
	manifestContent(videoExpandCount,'videoExpandList');
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#dyn').addEventListener('change', changeHandler);
	document.querySelector('#c1').addEventListener('change', changeHandler);
	document.querySelector('#c2').addEventListener('change', changeHandler);
	document.querySelector('#download').addEventListener('click', downloadCode);
});

function manifestContent(e,s){
	content = '';
	document.querySelector('#codeGenerated').style.height = "800px";
	if(e.value != '')
	for (var i = 1; i <= e.value; i++) {
		var a,b,c;
		if(i == 1 && s == 'videoInpageList'){
			a = '<li id="pDuration"></li>';
			b = '<select class="' + s + '" name="pState'+ i +'" id="play'+ i +'" onchange="changeListHandler(this)"><option value="standard">Standard</option><option value="preview">Preview</option><option value="none">None</option><option value="intro">Intro</option></select>';
		}else{
			a = '';
			b = '<select class="' + s + '" name="pState'+ i +'" id="play'+ i +'" onchange="changeListHandler(this)"><option value="standard">Standard</option><option value="none">None</option><option value="intro">Intro</option></select>';
		}
		content += "<li>"+
						"<label>Youtube ID "+ i +":</label>"+
						"<input id='videoID"+ i +"' class='required' type='text' placeholder='i73c3dgGxRQ or dynamicContent.Profile[0].video' required/>"+
					"</li>"+
					"<li>"+
						"<label>Div Container "+ i +":</label>"+
						"<input id='videoContent"+ i +"' type='text' class='required' placeholder='Div ID of YT ex: ytHolder' required/>"+
					"</li>"+
					"<li>"+
						"<label>Player State:</label>"+
						b +
					"</li>"+
					a +
					"<h3>Tracking Metrics</h3>"+
					"<ul id='tracking-list-autoplay"+ i +"' class='counters'>"+
					"</ul>"+
					"<ul id='tracking-list' class='counters hideForIntroplay"+i+"'>"+
						"<li>"+
							"<input id='ePlayCounter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_Play_Ctr'>"+
							"<input id='e25Counter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_25%_Ctr'>"+
							"<input id='e50Counter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_50%_Ctr'>"+
							"<input id='e75Counter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_75%_Ctr'>"+
							"<input id='e100Counter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_100%_Ctr'>"+
						"</li>"+
						"<li>"+
							"<input id='ePauseCounter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_Pause_Ctr'>"+
							"<input id='eReplayCounter"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_Replay_Ctr'>"+
							"<input id='eVideoTimer"+ i +"' type='text' placeholder='ex: YT_INP_Engaged_Video1_Timer'>"+
							//"<input id='pCloseAdCounter"+ i +"' type='text' placeholder='ex: CloseAd_Ctr'>"+
						"</li>"+
					"</ul>";
	}
	document.querySelector('#' + s + '').innerHTML = content;
	setTimeout(function(){console.log(document.querySelector('td').offsetHeight - 99);document.querySelector('#codeGenerated').style.height = (document.querySelector('td').offsetHeight - 99) + "px"},300);
}

function changeHandler(e){
	var checkedItem = e.target.id;
	(document.getElementById('c1').checked || document.getElementById('c2').checked) ? document.querySelector('#submit').style.display = 'block' : document.querySelector('#submit').style.display = 'none';
	if(document.getElementById('dyn').checked && document.getElementById('c1').checked && document.getElementById('c2').checked){ 
		document.querySelector('#codeGenerated').style.height = "800px";
	}else{
		if(document.querySelector('#videoExpandCount').value == '' || document.querySelector('#c2Video').classList.contains("show")){document.querySelector('#codeGenerated').style.height = "590px"};
	} 
	if(document.getElementById(checkedItem).checked){
		document.querySelector('#'+checkedItem+'Video').classList.add("show");
		document.querySelector('#'+checkedItem+'Nav').style.backgroundColor = 'rgba(0, 0, 0, .15)';
	}else{
		document.querySelector('#'+checkedItem+'Video').classList.remove("show");
		document.querySelector('#'+checkedItem+'Nav').style.backgroundColor = '';
	}
	setTimeout(function(){console.log(document.querySelector('td').offsetHeight - 99);document.querySelector('#codeGenerated').style.height = (document.querySelector('td').offsetHeight - 99) + "px"},300);
}

function changeListHandler(s){
	var a = s.id,
		b = document.querySelector('#tracking-list-autoplay1'),
		c = document.querySelector('#pDuration'),
		d = document.querySelector('.hideForIntro'+a)
		e = "<li>"+
				"<input id='p0Counter1' class='preview1' type='text' placeholder='ex: YT_INP_Autoplay_Video1_0%_Ctr'/>"+
				"<input id='p25Counter1' class='preview2' type='text' placeholder='ex: YT_INP_Autoplay_Video1_25%_Ctr'/>"+
				"<input id='p50Counter1' class='preview3' type='text' placeholder='ex: YT_INP_Autoplay_Video1_50%_Ctr'/>"+
				"<input id='p75Counter1' class='preview4' type='text' placeholder='ex: YT_INP_Autoplay_Video1_75%_Ctr'/>"+
				"<input id='p100Counter1' class='preview5' type='text' placeholder='ex: YT_INP_Autoplay_Video1_100%_Ctr'/>"+
			"</li>"+
			"<li>"+
				"<input id='pCFSCounter1' class='preview6' type='text' placeholder='ex: YT_INP_Autoplay_Video1_ClickForSound_Ctr'/>"+
				"<input id='pVideoTimer1' class='preview7' type='text' placeholder='ex: YT_INP_Autoplay_Video1_Timer'/>"+
			"</li>",
		f = '<label for="duration">Preview Duration:</label><input id="videoInpagePreviewDuration" class="required"type="text" name="duration" placeholder="Duration of the preview. ex: 15" maxlength="2" onclick="select()" required/>';

	if(s.value == "preview" && a == "play1"){
		d.style.display = 'block';
		b.innerHTML = e;
		c.innerHTML = f;
	}else if(s.value == "intro"){
		d.style.display = 'none';
		b.innerHTML = '';
		c.innerHTML = '';
	}else{
		d.style.display = 'block';
		b.innerHTML = '';
		c.innerHTML = '';
	}
	document.querySelector('#codeGenerated').style.height = "800px";
	setTimeout(function(){console.log(document.querySelector('td').offsetHeight - 99);document.querySelector('#codeGenerated').style.height = (document.querySelector('td').offsetHeight - 99) + "px"},300);
}

function generateCode(){
	if(document.getElementById('dyn').checked){
		isDynamic = true;
		dynamicInvo = '';//document.counters_form.invocation.value;
	}else{
		isDynamic = false;
		dynamicInvo = '';
	}
	code = '';
	populateInpageVideos();
	populateExpandVideos();
	injectCode();
	document.counters_form.codeGenerated.value = code;
	vidInpage.length = 0;
	vidExpand.length = 0;
	playStateInpage.length = 0;
	playStateExpand.length = 0;
	containerInpage.length = 0;
	containerExpand.length = 0;
	previewTrackings.length = 0;
	engageInpTrackings.length = 0;
	engageExpTrackings.length = 0;
	showMessage('Generate Success');
}

function populateInpageVideos(){
	if(!document.getElementById('c1').checked) return;
	for (var x = 1; videoInpageCount.value >= x; x++) {
		var a = document.querySelector('#videoInpageList #play'+x),
			b = a.options[a.selectedIndex].value,
			c = document.querySelector('#videoInpageList #videoID'+x+'').value,
			d = document.querySelector('#videoInpageList #videoContent'+x).value,
			e = document.querySelector('#videoInpageList #tracking-list #ePlayCounter'+x).value,
			f = document.querySelector('#videoInpageList #tracking-list #e25Counter'+x).value,
			g = document.querySelector('#videoInpageList #tracking-list #e50Counter'+x).value,
			h = document.querySelector('#videoInpageList #tracking-list #e75Counter'+x).value,
			i = document.querySelector('#videoInpageList #tracking-list #e100Counter'+x).value,
			j = document.querySelector('#videoInpageList #tracking-list #ePauseCounter'+x).value,
			k = document.querySelector('#videoInpageList #tracking-list #eReplayCounter'+x).value,
			l = document.querySelector('#videoInpageList #tracking-list #eVideoTimer'+x).value,
			m = [e,f,g,h,i,j,k,l];
			console.log(e)
		if(isDynamic){
			vidInpage.push(c);
		}else{
			vidInpage.push("'" + c + "'");
		}
		containerInpage.push("'" + d + "'");
		playStateInpage.push("'" + b + "'");
		engageInpTrackings.push(m);
	};

	if(document.querySelector('#pDuration').innerHTML != ''){
		for (var i = 1; 7 >= i; i++){
			var a = document.querySelector('#tracking-list-autoplay1 .preview'+i).value;
			previewTrackings.push("'" + a + "'");
		}
		previewDuration = document.querySelector('#videoInpageList #pDuration #videoInpagePreviewDuration').value;
	}else{
		for (var i = 1; 7 >= i; i++){
			previewTrackings.push("''");
		}
		previewDuration = '';
	}
	var z = document.querySelector('.videoInpageFormat')
	isMobile = (z.options[z.selectedIndex].value == "mobile") ? true : false;
	//closeAdTrackings = document.querySelector('#videoInpageList #tracking-list #pCloseAdCounter1').value;
}

function populateExpandVideos(){
	if(!document.getElementById('c2').checked) return;
	for (var x = 1; videoExpandCount.value >= x; x++) {
		var a = document.querySelector('#videoExpandList #play'+x),
			b = a.options[a.selectedIndex].value,
			c = document.querySelector('#videoExpandList #videoID'+x+'').value,
			d = document.querySelector('#videoExpandList #videoContent'+x).value,
			e = document.querySelector('#videoExpandList #tracking-list #ePlayCounter'+x).value,
			f = document.querySelector('#videoExpandList #tracking-list #e25Counter'+x).value,
			g = document.querySelector('#videoExpandList #tracking-list #e50Counter'+x).value,
			h = document.querySelector('#videoExpandList #tracking-list #e75Counter'+x).value,
			i = document.querySelector('#videoExpandList #tracking-list #e100Counter'+x).value,
			j = document.querySelector('#videoExpandList #tracking-list #ePauseCounter'+x).value,
			k = document.querySelector('#videoExpandList #tracking-list #eReplayCounter'+x).value,
			l = document.querySelector('#videoExpandList #tracking-list #eVideoTimer'+x).value,
			m = [e,f,g,h,i,j,k,l];
			console.log(e)
		if(isDynamic){
			vidExpand.push(c);
		}else{
			vidExpand.push("'" + c + "'");
		}
		containerExpand.push("'" + d + "'");
		playStateExpand.push("'" + b + "'");
		engageExpTrackings.push(m);
	};
}

$("#submit").click(function() {
    var empty = $(this).parent().find(".show .required").filter(function() {
    	console.log(this)
        return this.value === "";
    });
    if(empty.length) {
    	showMessage('Please fill up all fields first');
        return;
    }
    generateCode();
});

function showMessage(message){
	$('#message').center();
	document.querySelector('#message').innerHTML = message;
	document.querySelector('#message').className = 'message';
	setTimeout(function(){
		document.querySelector('#message').className = 'message show';
	},300);
	document.querySelector('#message').addEventListener("webkitAnimationEnd",function(){
		setTimeout(function(){
			document.querySelector('#message').className = 'message hide';
		},1500);
	});
}

function injectCode(){
	var a = videoInpageCount.value,
		b = videoExpandCount.value,
		c = '',//document.getElementById('dyn').checked ? ("//Dynamic Invocation Code\n"+ dynamicInvo + "\n\n") : '',
		d = c +
			"var vidInpageList = ["+ vidInpage +"],\n\t" +
				"containerInpageList = ["+ containerInpage +"],\n\t" +
				"playStateInpageList = ["+ playStateInpage +"];\n",
		e = "var vidExpandList = ["+ vidExpand +"],\n\t" +
				"containerExpandList = ["+ containerExpand +"],\n\t" +
				"playStateExpandList = ["+ playStateExpand +"];\n",
		f = "TRACKING_METRICS_PREVIEWED_PERCENT_0 : "+ previewTrackings[0] +",\n\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_25 : "+ previewTrackings[1] +",\n\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_50 : "+ previewTrackings[2] +",\n\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_75 : "+ previewTrackings[3] +",\n\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_100 : "+ previewTrackings[4] +",\n\t" +
			"TRACKING_METRICS_PREVIEWED_TIMER : "+ previewTrackings[6] +",\n\t",
		g = "TRACKING_METRICS_CLICK_FOR_SOUND : "+ previewTrackings[5] +",\n\t",
		h = "PREVIEW_DURATION : " + "'" + previewDuration + "'" +",\n\t";
	code += d;
	for(var i = 1; a>=i; i++){
		f = (i==1) ? f : '';
		g = (i==1) ? g : '';
		h = (previewDuration != '') ? h : '';
		var codeInput = "//Inpage YT video"+ i +"\n" +
			"var playerInp" + i + " = {\n\t" +
				"ID : 'ytpInp" + i + "',\n\t" +
				"CONTAINER_ID : containerInpageList[" + (i-1) + "],\n\t" +
				"_URL : vidInpageList[" + (i-1) + "],\n\t" +
				"AUTOPLAY : playStateInpageList[" + (i-1) + "],\n\t" +
				"// INTRO_HIDE : true,\n\t" +
				h +
				"PAUSE_ON_START : false,\n\t" +
				"MUTED : false,\n\t" +
				"CONTROLS : '',\n\t" +
				"ALLOWFULLSCREEN : false,\n\t" +
				"IS_MOBILE : " + "'" + isMobile + "'" +",\n\t" +
				"TRACKING_METRICS_PLAYING : "+ "'" + engageInpTrackings[i-1][0] + "'" +",\n\t" +
				"TRACKING_METRICS_PAUSE : "+ "'" + engageInpTrackings[i-1][5] + "'" +",\n\t" +
				"TRACKING_METRICS_ENDED : '',\n\t" +
				"TRACKING_METRICS_REPLAY : "+ "'" + engageInpTrackings[i-1][6] + "'" +",\n\t" +
				g +
				"TRACKING_METRICS_VIEWED_PERCENT_0 : '',\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_25 : "+ "'" + engageInpTrackings[i-1][1] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_50 : "+ "'" + engageInpTrackings[i-1][2] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_75 : "+ "'" + engageInpTrackings[i-1][3] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_100 : "+ "'" + engageInpTrackings[i-1][4] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_TIMER : "+ "'" + engageInpTrackings[i-1][7] + "'" +",\n\t" +
				f +
				//"TRACKING_METRICS_CLOSE_AD : '" + closeAdTrackings + "',\n\t" +
				"PAUSE_ON_EXPAND : true,\n\t" +
				"DESTROY_ON_COLLAPSE : true\n" +
			"};\n\n" +
			"var ytpInp" + i + " = new YTController(playerInp" + i + ");\n\n";

		code += codeInput;
		for(var j=1; j<=previewTrackings.length; j++){
			previewTrackings[j-1] = '';
		}
	};

	if(!document.getElementById('c2').checked) return;

	code += e;

	for(var i = 1; b>=i; i++){
		var codeInput = "//Expand YT video"+ i +"\n" +
			"var playerExp" + i + " = {\n\t" +
				"ID : 'ytpExp" + i + "',\n\t" +
				"CONTAINER_ID : containerExpandList[" + (i-1) + "],\n\t" +
				"_URL : vidExpandList[" + (i-1) + "],\n\t" +
				"AUTOPLAY : playStateExpandList[" + (i-1) + "],\n\t" +
				"// INTRO_HIDE : true,\n\t" +
				"PAUSE_ON_START : false,\n\t" +
				"MUTED : false,\n\t" +
				"CONTROLS : '',\n\t" +
				"ALLOWFULLSCREEN : false,\n\t" +
				"IS_MOBILE : " + "'" + isMobile + "'" +",\n\t" +
				"TRACKING_METRICS_PLAYING : "+ "'" + engageExpTrackings[i-1][0] + "'" +",\n\t" +
				"TRACKING_METRICS_PAUSE : "+ "'" + engageExpTrackings[i-1][5] + "'" +",\n\t" +
				"TRACKING_METRICS_ENDED : '',\n\t" +
				"TRACKING_METRICS_REPLAY : "+ "'" + engageExpTrackings[i-1][6] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_0 : '',\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_25 : "+ "'" + engageExpTrackings[i-1][1] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_50 : "+ "'" + engageExpTrackings[i-1][2] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_75 : "+ "'" + engageExpTrackings[i-1][3] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_100 : "+ "'" + engageExpTrackings[i-1][4] + "'" +",\n\t" +
				"TRACKING_METRICS_VIEWED_TIMER : "+ "'" + engageExpTrackings[i-1][7] + "'" +",\n\t" +
				//"TRACKING_METRICS_CLOSE_AD : '" + closeAdTrackings + "',\n\t" +
				"PAUSE_ON_EXPAND : true,\n\t" +
				"DESTROY_ON_COLLAPSE : true\n" +
			"};\n\n" +
			"var ytpExp" + i + " = new YTController(playerExp" + i + ");\n\n";

			code += codeInput;
	};
}

function downloadCode(){
	if(document.counters_form.codeGenerated.value == ''){showMessage('You must generate first');return}
	Download.save(document.counters_form.codeGenerated.value, 'ytSetup');
	showMessage('Rename the file into ytSetup.js');
}

var Download = {
    click : function(node) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return node.dispatchEvent(ev);
    },
    encode : function(data) {
            return 'data:application/octet-stream;base64,' + btoa( data );
    },
    link : function(data, name){
        var a = document.createElement('a');
        a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
        a.href = data || self.location.href;
        return a;
    }
};
Download.save = function(data, name){
    this.click(
        this.link(
            this.encode( data ),
            name
        )
    );
};

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}