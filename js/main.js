function navClick(nav,sub){
	if(document.getElementById(sub).classList.contains('u-open')){
		document.querySelector('.subNavs').classList.add("u-closed");
		document.querySelector('#' + nav + ' a').classList.remove("u-open");
		document.getElementById(sub).classList.remove("u-open")
	}
	else{
		setTimeout(function(){document.querySelector('.subNavs').classList.remove("u-closed");},500);
		removeClass();
		document.querySelector('#' + nav + ' a').classList.add("u-open");
		document.getElementById(sub).classList.add("u-open")
	}
}

function removeClass(){
	document.querySelector('#nav-youtube a').classList.remove("u-open");
	document.getElementById('subNav-youtube').classList.remove("u-open")
	document.querySelector('#nav-video a').classList.remove("u-open");
	document.getElementById('subNav-video').classList.remove("u-open")
	document.querySelector('#nav-dateswap a').classList.remove("u-open");
	document.getElementById('subNav-dateswap').classList.remove("u-open")
	document.querySelector('#nav-pixel a').classList.remove("u-open");
	document.getElementById('subNav-pixel').classList.remove("u-open")
}

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#filler').show();
        removeClass();
    } else {
        $('#sticky').removeClass('stick');
        $('#filler').hide();
    }
}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});

$("#plain-yotube").click(function() {
	document.querySelector('.subNavs').classList.add("u-closed");
	removeClass();
	$("#iframe").attr('src','pages/youtube/youtube.html'); 
});

$("#plain-dateswap").click(function() {
	document.querySelector('.subNavs').classList.add("u-closed");
	removeClass();
	$("#iframe").attr('src','pages/dateswap/dateswap.html'); 
});