
function showPdf(isShow){
	var state = "";
	if(isShow){
		state = "block";
	}else{
			state = "none";
		}
	var pop = document.getElementById("pop");
	pop.style.display = state;
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = state;
	}
function close(){
	showPdf(false);
	}
	