var containerImage = [],
	preImage = [],
	liveImage = [],
	postImage = [],
	afterImage = [],
	containerVideo = [],
	preVideo = [],
	liveVideo = [],
	postVideo = [],
	afterVideo = [],
	code,
	content = "",
	liveDate = document.getElementById("liveDate"),
	afterLiveDate = document.getElementById("liveDate2"),
	imageCount = document.getElementById("imageCount"),
	videoCount = document.getElementById("videoCount");

imageCount.onkeypress = function(event){
	return (event.keyCode >= 49 && event.keyCode <= 53) ? true : false;
}

videoCount.onkeypress = function(event){
	return (event.keyCode >= 49 && event.keyCode <= 53) ? true : false;
}

imageCount.oninput = function(){
	manifestContent(imageCount,'imageList','Image');
}

videoCount.oninput = function(){
	manifestContent(videoCount,'videoList','Video');
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#c1').addEventListener('change', changeHandler);
	document.querySelector('#c2').addEventListener('change', changeHandler);
	document.querySelector('.secondLiveDate').addEventListener('change', changeLiveDateHandler);
	document.querySelector('#download').addEventListener('click', downloadCode);
});

function manifestContent(e,s,t){
	content = '';
	document.querySelector('#codeGenerated').style.height = "800px";
	if(e.value != '')
	for (var i = 1; i <= e.value; i++) {
		var a = document.querySelector('.secondLiveDate'),
			b = (a.options[a.selectedIndex].value == "yes") ? true : false,
			c = b ? 'required' : '',
			d = b ? '' : 'hidden';

		content += 	"<div class='or-spacer'>"+
					  	"<div class='mask'></div>"+
					"</div>"+
					"<li>"+
						"<label>" + t + " Container "+ i +":</label>"+
						"<input id='fileContent"+ i +"' type='text' class='required' placeholder='Div ID of " + t + " ex: fileHolder' required/>"+
					"</li>"+
					"<li>"+
						"<label>Pre " + t + " "+ i +":</label>"+
						"<input id='fileNamePre"+ i +"' class='required' type='text' placeholder='file name ex: " + t + "1.png' required/>"+
					"</li>"+
					"<li>"+
						"<label>Live " + t + ""+ i +":</label>"+
						"<input id='fileNameLive"+ i +"' class='required' type='text' placeholder='file name ex: " + t + "2.png' required/>"+
					"</li>"+
					"<li>"+
						"<label>Post " + t + ""+ i +":</label>"+
						"<input id='fileNamePost"+ i +"' class='required' type='text' placeholder='file name ex: " + t + "3.png' required/>"+
					"</li>"+
					"<li class='" + d + "'>"+
						"<label>2nd Live " + t + ""+ i +":</label>"+
						"<input id='fileNameLiveSecond"+ i +"' class='" + c + "' type='text' placeholder='file name ex: " + t + "4.png'/" + c + ">"+
					"</li>";
	}
	document.querySelector('#' + s + '').innerHTML = content;
	setTimeout(function(){console.log(document.querySelector('td').offsetHeight - 99);document.querySelector('#codeGenerated').style.height = (document.querySelector('td').offsetHeight - 99) + "px"},300);
}

function changeHandler(e){
	var checkedItem = e.target.id;
	(document.getElementById('c1').checked || document.getElementById('c2').checked) ? document.querySelector('#submit').style.display = 'block' : document.querySelector('#submit').style.display = 'none';
	if(document.getElementById('c1').checked && document.getElementById('c2').checked){ 
		document.querySelector('#codeGenerated').style.height = "800px";
	}else{
		if(document.querySelector('#videoCount').value == '' || document.querySelector('#c2Date').classList.contains("show")){document.querySelector('#codeGenerated').style.height = "590px"};
	} 
	if(document.getElementById(checkedItem).checked){
		document.querySelector('#'+checkedItem+'Date').classList.add("show");
		document.querySelector('#'+checkedItem+'Nav').style.backgroundColor = 'rgba(0, 0, 0, .15)';
	}else{
		document.querySelector('#'+checkedItem+'Date').classList.remove("show");
		document.querySelector('#'+checkedItem+'Nav').style.backgroundColor = '';
	}
	setTimeout(function(){console.log(document.querySelector('td').offsetHeight - 99);document.querySelector('#codeGenerated').style.height = (document.querySelector('td').offsetHeight - 99) + "px"},300);
}

function changeLiveDateHandler(){
	var targetDiv = document.querySelector("#secondLiveDate"),
		afterLiveDateDIV =  "<label>Live Date 2:</label>"+
							"<input type='text' id='liveDate2' class='required date' placeholder='YYYY/MM/DD' required/>",
		secondLiveDateContainer = (targetDiv.options[targetDiv.selectedIndex].value == "yes") ? afterLiveDateDIV : '';

	document.querySelector('#liveDateList').innerHTML = secondLiveDateContainer;
	document.querySelector('#imageList').innerHTML = '';
	document.querySelector('#videoList').innerHTML = '';
	imageCount.value = '';
	videoCount.value = '';
}

function generateCode(){
	code = '';
	populateImages();
	populateVideos();
	injectCode();
	document.counters_form.codeGenerated.value = code;
	containerImage.length = 0;
	preImage.length = 0;
	liveImage.length = 0;
	postImage.length = 0;
	afterImage.length = 0;
	containerVideo.length = 0;
	preVideo.length = 0;
	liveVideo.length = 0;
	postVideo.length = 0;
	afterVideo.length = 0;
	showMessage('Generate Success');
}

function populateImages(){
	if(!document.getElementById('c1').checked) return;
	for (var x = 1; imageCount.value >= x; x++) {
		var a = document.querySelector('#imageList #fileContent'+x).value,
			b = document.querySelector('#imageList #fileNamePre'+x).value,
			c = document.querySelector('#imageList #fileNameLive'+x).value,
			d = document.querySelector('#imageList #fileNamePost'+x).value,
			e = document.querySelector('.secondLiveDate');

		containerImage.push("'" + a + "'");
		preImage.push("'" + b + "'");
		liveImage.push("'" + c + "'");
		postImage.push("'" + d + "'");
		(e.options[e.selectedIndex].value == 'yes') && afterImage.push("'" + (document.querySelector('#imageList #fileNameLiveSecond'+x).value) + "'");
	};
}

function populateVideos(){
	if(!document.getElementById('c2').checked) return;
	for (var x = 1; imageCount.value >= x; x++) {
		var a = document.querySelector('#videoList #fileContent'+x).value,
			b = document.querySelector('#videoList #fileNamePre'+x).value,
			c = document.querySelector('#videoList #fileNameLive'+x.value),
			d = document.querySelector('#videoList #fileNamePost'+x).value,
			e = document.querySelector('.secondLiveDate');

		containerVideo.push("'" + a + "'");
		preVideo.push("'" + b + "'");
		liveVideo.push("'" + c + "'");
		postVideo.push("'" + d + "'");
		(e.options[e.selectedIndex].value == 'yes') && afterVideo.push("'" + (document.querySelector('#videoList #fileNameLiveSecond'+x).value) + "'");
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
	var a = imageCount.value,
		b = videoCount.value,
		c = liveDate.value,
		d = (document.getElementById("liveDate2") != null) ? ("liveDateAfter = new Date("+ document.getElementById("liveDate2").value +"),\n\t\t") : '',
		e = "window.addEventListener('load',windowLoaded)\n\n" +
			"function windowLoaded() {\n\t" +
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
				"console.log('window loading...');\n\t" +
				"window.removeEventListener('load',windowLoaded);\n" +
			"}\n\n" +
			"function pageLoadedHandler() {\n\t" +
			"console.log('page loaded');\n\t" +
			"var liveDate = new Date("+ c +"),\n\t\t" +
				d +
				"containerImageList = ["+ containerImage +"],\n\t\t" +
				"preImageList = ["+ preImage +"],\n\t\t" +
				"liveImageList = ["+ liveImage +"];\n\t\t" +
				"postImageList = ["+ postImage +"];\n\t\t" +
				"afterImageList = ["+ afterImage +"];\n\t",
		f = "\tvar containerVideoList = ["+ containerVideo +"],\n\t\t" +
				"preVideoList = ["+ preVideo +"],\n\t\t" +
				"liveVideoList = ["+ liveVideo +"];\n\t\t" +
				"postVideoList = ["+ postVideo +"];\n\t\t" +
				"afterVideoList = ["+ afterVideo +"];\n\t",
		g = "var ",
		h = "var ";
	code += e;
	for(var i = 1; a>=i; i++){
		var j = (document.getElementById("liveDate2") != null) ? ("LIVE_DATE_AFTER : liveDateAfter,\n\t\t") : '',
		 	k = (document.getElementById("liveDate2") != null) ? ("\tIMG_SRC_AFTER : afterImageList,\n\t") : '',
			codeInput = "\t//DATE SWAP for image"+ i +"\n\t" +
			"var setImage" + i + " = {\n\t\t" +
				"CONTAINER_ID : containerImageList[" + (i-1) + "],\n\t\t" +
				"LIVE_DATE : liveDate,\n\t\t" +
				j +
				"IMG_SRC_PRE : preImageList[" + (i-1) + "],\n\t\t" +
				"IMG_SRC_LIVE : liveImageList[" + (i-1) + "],\n\t\t" +
				"IMG_SRC_POST : postImageList[" + (i-1) + "],\n\t" +
				k +
			"};\n\n\t" +
			"swapImage" + i + " = new DSController(setImage" + i + ");\n\n";
		(i==1) ? (g += "swapImage" + i) : (g += ',swapImage' + i);
		code += codeInput;
	};

	if(!document.getElementById('c1').checked){
		g = '';
	}

	if(!document.getElementById('c2').checked){
		code += "}\n\n" + g;
		return;
	}

	code += f;

	for(var i = 1; a>=i; i++){
		var j = (document.getElementById("liveDate2") != null) ? ("LIVE_DATE_AFTER : liveDateAfter,\n\t\t") : '',
		 	k = (document.getElementById("liveDate2") != null) ? ("\tVID_SRC_AFTER : afterVideoList,\n\t") : '',
			codeInput = "\t//DATE SWAP for image"+ i +"\n\t" +
			"var setVideo" + i + " = {\n\t\t" +
				"CONTAINER_ID : containerVideoList[" + (i-1) + "],\n\t\t" +
				"LIVE_DATE : liveDate,\n\t\t" +
				j +
				"VID_SRC_PRE : preVideoList[" + (i-1) + "],\n\t\t" +
				"VID_SRC_LIVE : liveVideoList[" + (i-1) + "],\n\t\t" +
				"VID_SRC_POST : postVideoList[" + (i-1) + "],\n\t" +
				k +
			"};\n\n\t" +
			"swapVideo" + i + " = new DSController(setVideo" + i + ");\n\n";
		(i==1) ? (h += "swapVideo" + i) : (h += ',swapVideo' + i);
		code += codeInput;
	};
	code += "}\n\n" + g + "\n" + h;
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