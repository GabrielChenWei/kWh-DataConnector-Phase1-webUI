

////////////////////////////////////////////////////////////////////////////

function dataValidation() {
	var x, text;

	// Get the value of input field with id="numb"
	x = document.getElementById("oneToTen").value;

	// If x is Not a Number or less than one or greater than 10
	if (isNaN(x) || x < 1 || x > 10) {
		text = "Input not valid";
    	} else {
		text = "Input OKKK";
	}
	document.getElementById("validationResult").innerHTML = text;
}

///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
function getSite(sel) {
    var SelectedSite = sel.value;
	document.getElementById(PDFdisplay).style.display = 'block';	
	//<a href="./database/Oct-2016(25-Sep-2016_24-Oct-2016).PDF" target="iframe_PDF"></a><br/>
}
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////