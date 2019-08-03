function change_data(val,name)
{
	console.log(val);
	if(val=="")
		{return;}
	else{
		alert(val);
		var obj = document.getElementsByName(name);
		obj.selectedIndex=0;
		} 
}