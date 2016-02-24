var vidInpage = [],
	vidExpand = [],
	playStateInpage = [],
	playStateExpand = [],
	containerInpage = [],
	containerExpand = [],
	previewTrackings = [],
	engageInpTrackings = [],
	engageExpTrackings = [],
	ytControllerList = [],
	closeAdTrackings = "",
	previewDuration,
	code,
	content = "",
	dynamicInvo = "",
	isDynamic = false,
	isMobile = false,
	autoCreate = false,
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
			b = '<select class="' + s + '" name="pState'+ i +'" id="play'+ i +'" onchange="changeListHandler(this)"><option value="none">None</option><option value="standard">Standard</option><option value="preview">Preview</option><option value="intro">Intro</option></select>';
		}else{
			a = '';
			b = '<select class="' + s + '" name="pState'+ i +'" id="play'+ i +'" onchange="changeListHandler(this)"><option value="none">None</option><option value="standard">Standard</option><option value="intro">Intro</option></select>';
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
							"<input id='ePlayCounter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_Play_Ctr'>"+
							"<input id='e25Counter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_25%_Ctr'>"+
							"<input id='e50Counter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_50%_Ctr'>"+
							"<input id='e75Counter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_75%_Ctr'>"+
							"<input id='e100Counter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_100%_Ctr'>"+
						"</li>"+
						"<li>"+
							"<input id='ePauseCounter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_Pause_Ctr'>"+
							"<input id='eReplayCounter"+ i +"' class='counter_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_Replay_Ctr'>"+
							"<input id='eVideoTimer"+ i +"' class='timer_tracker' type='text' placeholder='ex: YT_INP_Engaged_Video1_Timer'>"+
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
				"<input id='p0Counter1' class='preview1 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_0%_Ctr'/>"+
				"<input id='p25Counter1' class='preview2 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_25%_Ctr'/>"+
				"<input id='p50Counter1' class='preview3 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_50%_Ctr'/>"+
				"<input id='p75Counter1' class='preview4 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_75%_Ctr'/>"+
				"<input id='p100Counter1' class='preview5 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_100%_Ctr'/>"+
			"</li>"+
			"<li>"+
				"<input id='pCFSCounter1' class='preview6 counter_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_ClickForSound_Ctr'/>"+
				"<input id='pVideoTimer1' class='preview7 timer_tracker' type='text' placeholder='ex: YT_INP_Autoplay_Video1_Timer'/>"+
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
		dynamicInvo = document.counters_form.invocation.value;
	}else{
		isDynamic = false;
		dynamicInvo = '';
	}
	code = '';
	populateInpageVideos();
	populateExpandVideos();
	injectCode();
	trackerRegister();
	createDestroyEvent();
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
	ytControllerList.length = 0;
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
	var y = document.querySelector('.videoInpageAutoCreate'),
		z = document.querySelector('.videoInpageFormat')
	autoCreate = (y.options[y.selectedIndex].value == "yes") ? true : false;
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
		c = document.getElementById('dyn').checked ? (dynamicInvo + "\n\n") : '',
		d = c +
			"window.onload = function() {\n\t" +
				"if (Enabler.isInitialized()) {\n\t\t" +
				  	"enablerInitHandler();\n\t" +
				"} else {\n\t\t" +
				  	"Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);\n\t" +
				"}\n\n\t" +
				"function enablerInitHandler() {\n\t\t" +
				  	"if (Enabler.isPageLoaded()) {\n\t\t\t" +
				    	"pageLoadedHandler();\n\t\t" +
				  	"} else {\n\t\t\t" +
				    	"Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);\n\t\t" +
				  	"}\n\t" +
				"}\n\t" +
				"console.log('window loading...');\n" +
			"}\n\n" +
			"function pageLoadedHandler() {\n\t" +
			"console.log('page loaded');\n\t" +
			"var vidInpageList = ["+ vidInpage +"],\n\t\t" +
				"containerInpageList = ["+ containerInpage +"],\n\t\t" +
				"playStateInpageList = ["+ playStateInpage +"];\n",
		e = "\tvar vidExpandList = ["+ vidExpand +"],\n\t\t" +
				"containerExpandList = ["+ containerExpand +"],\n\t\t" +
				"playStateExpandList = ["+ playStateExpand +"];\n\t",
		f = "TRACKING_METRICS_PREVIEWED_PERCENT_0 : "+ previewTrackings[0] +",\n\t\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_25 : "+ previewTrackings[1] +",\n\t\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_50 : "+ previewTrackings[2] +",\n\t\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_75 : "+ previewTrackings[3] +",\n\t\t" +
			"TRACKING_METRICS_PREVIEWED_PERCENT_100 : "+ previewTrackings[4] +",\n\t\t" +
			"TRACKING_METRICS_PREVIEWED_TIMER : "+ previewTrackings[6] +",\n\t\t",
		g = "TRACKING_METRICS_CLICK_FOR_SOUND : "+ previewTrackings[5] +",\n\t\t",
		h = "PREVIEW_DURATION : " + "'" + previewDuration + "'" +",\n\t\t",
		k = "var ",
		l = "var ";
	code += d;
	for(var i = 1; a>=i; i++){
		f = (i==1) ? f : '';
		g = (i==1) ? g : '';
		h = (previewDuration != '') ? h : '';
		(i==1) ? (k += "ytpInp" + i) : (k += ',ytpInp' + i);
		var codeInput = "\t//Inpage YT video"+ i +"\n\t" +
			"var playerInp" + i + " = {\n\t\t" +
				"ID : 'ytpInp" + i + "',\n\t\t" +
				"CONTAINER_ID : containerInpageList[" + (i-1) + "],\n\t\t" +
				"_URL : vidInpageList[" + (i-1) + "],\n\t\t" +
				"AUTOPLAY : playStateInpageList[" + (i-1) + "],\n\t\t" +
				"// INTRO_HIDE : true,\n\t\t" +
				h +
				"PAUSE_ON_START : false,\n\t\t" +
				"MUTED : false,\n\t\t" +
				"CONTROLS : '',\n\t\t" +
				"ALLOWFULLSCREEN : false,\n\t\t" +
				"IS_MOBILE : " + "'" + isMobile + "'" +",\n\t\t" +
				"TRACKING_METRICS_PLAYING : "+ "'" + engageInpTrackings[i-1][0] + "'" +",\n\t\t" +
				"TRACKING_METRICS_PAUSE : "+ "'" + engageInpTrackings[i-1][5] + "'" +",\n\t\t" +
				"TRACKING_METRICS_ENDED : '',\n\t\t" +
				"TRACKING_METRICS_REPLAY : "+ "'" + engageInpTrackings[i-1][6] + "'" +",\n\t\t" +
				g +
				"TRACKING_METRICS_VIEWED_PERCENT_0 : '',\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_25 : "+ "'" + engageInpTrackings[i-1][1] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_50 : "+ "'" + engageInpTrackings[i-1][2] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_75 : "+ "'" + engageInpTrackings[i-1][3] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_100 : "+ "'" + engageInpTrackings[i-1][4] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_TIMER : "+ "'" + engageInpTrackings[i-1][7] + "'" +",\n\t\t" +
				f +
				//"TRACKING_METRICS_CLOSE_AD : '" + closeAdTrackings + "',\n\t" +
				"PAUSE_ON_EXPAND : true,\n\t\t" +
				"DESTROY_ON_COLLAPSE : true\n\t" +
			"};\n\n\t" +
			"ytpInp" + i + " = new YTController(playerInp" + i + ");\n\n";

		ytControllerList.push("ytpInp" + i);
		code += codeInput;
		for(var j=1; j<=previewTrackings.length; j++){
			previewTrackings[j-1] = '';
		}
	};

	if(!document.getElementById('c1').checked){
		k = '';
	}

	if(!document.getElementById('c2').checked){
		autoCreate && (code += "\tsetTimeout(function(){ytpInp1.createYT()},500);\n");
		code += "}\n\n" + k;
		return;
	}

	code += e;

	for(var i = 1; b>=i; i++){
		(i==1) ? (l += "ytpExp" + i) : (l += ',ytpExp' + i);
		var codeInput = "\t//Expand YT video"+ i +"\n\t" +
			"var playerExp" + i + " = {\n\t\t" +
				"ID : 'ytpExp" + i + "',\n\t\t" +
				"CONTAINER_ID : containerExpandList[" + (i-1) + "],\n\t\t" +
				"_URL : vidExpandList[" + (i-1) + "],\n\t\t" +
				"AUTOPLAY : playStateExpandList[" + (i-1) + "],\n\t\t" +
				"// INTRO_HIDE : true,\n\t\t" +
				"PAUSE_ON_START : false,\n\t\t" +
				"MUTED : false,\n\t\t" +
				"CONTROLS : '',\n\t\t" +
				"ALLOWFULLSCREEN : false,\n\t\t" +
				"IS_MOBILE : " + "'" + isMobile + "'" +",\n\t\t" +
				"TRACKING_METRICS_PLAYING : "+ "'" + engageExpTrackings[i-1][0] + "'" +",\n\t\t" +
				"TRACKING_METRICS_PAUSE : "+ "'" + engageExpTrackings[i-1][5] + "'" +",\n\t\t" +
				"TRACKING_METRICS_ENDED : '',\n\t\t" +
				"TRACKING_METRICS_REPLAY : "+ "'" + engageExpTrackings[i-1][6] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_0 : '',\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_25 : "+ "'" + engageExpTrackings[i-1][1] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_50 : "+ "'" + engageExpTrackings[i-1][2] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_75 : "+ "'" + engageExpTrackings[i-1][3] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_PERCENT_100 : "+ "'" + engageExpTrackings[i-1][4] + "'" +",\n\t\t" +
				"TRACKING_METRICS_VIEWED_TIMER : "+ "'" + engageExpTrackings[i-1][7] + "'" +",\n\t\t" +
				//"TRACKING_METRICS_CLOSE_AD : '" + closeAdTrackings + "',\n\t" +
				"PAUSE_ON_EXPAND : true,\n\t\t" +
				"DESTROY_ON_COLLAPSE : true\n\t" +
			"};\n\n\t" +
			"ytpExp" + i + " = new YTController(playerExp" + i + ");\n\n";

		ytControllerList.push("ytpExp" + i);
		code += codeInput;
	};
	autoCreate && (code += "\tsetTimeout(function(){ytpInp1.createYT()},500);\n");
	code += "}\n\n" + k + "\n" + l;
}

function trackerRegister(){
	var a = document.querySelectorAll('#tracking-list li input.counter_tracker'),
		b = document.querySelectorAll('#tracking-list li input.timer_tracker'),
		c = document.querySelectorAll('#tracking-list-autoplay1 li input.counter_tracker'),
		d = document.querySelectorAll('#tracking-list-autoplay1 li input.timer_tracker'),
		e = "\n\nfunction registerTrackings(){\n\t" + 
			"return;\n";

	code += e;
	for(var i = 0; a.length>i; i++){
		if(a[i].value != ""){
			code += "\tEnabler.counter(" + "'" + a[i].value + "'" + ");\n";
		}
	}

	for(var i = 0; c.length>i; i++){
		if(c[i].value != "" && c != null){
			code += "\tEnabler.counter(" + "'" + c[i].value + "'" + ");\n";
		}
	}

	for(var i = 0; b.length>i; i++){
		if(b[i].value != ""){
			code += "\tEnabler.StartTimer(" + "'" + b[i].value + "'" + ");\n";
		}
	}

	for(var i = 0; d.length>i; i++){
		if(d[i].value != "" && d != null){
			code += "\tEnabler.StartTimer(" + "'" + d[i].value + "'" + ");\n";
		}
	}
	code += "}";
}

function createDestroyEvent(){
	var a = ytControllerList,
		b = "\n\nfunction destroyAllYTPlayer(){";

	code += b;
	for(var i = 0; a.length>i; i++){
		code += "\n\ttry{" + a[i] + ".destroyYT()}catch(e){};";
	}
	code += "\n}";
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
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}