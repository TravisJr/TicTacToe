


;

//fl_start means the game is started or not...
fl_start=false;



// Draw X 
function drawX(where)

{
a = where;

t1 = '<svg viewBox="0 0 320 320" width="180" height="180"   xml:space="preserve" id="svg" xmlns="http://www.w3.org/2000/svg">';
t2 = '<line id="line1" class="lines" x1="100" y1="100" x2="220" y2="220" style="stroke:rgb(255,0,0);stroke-width:20;stroke-linecap:round;"/>';
t3 = '<line id="line2" class="lines" x1="220" y1="100" x2="100" y2="220" style="stroke:rgb(255,0,0);stroke-width:20;stroke-linecap:round;"/></svg>';

$(a).html(t1+t2+t3);
$(a).css("background-color","gray");
$("#line1").attr("class", "animate");
$("#line2").attr("class", "animate2");
$("#line1").css("stroke",  $('#p1col').val());
$("#line2").css("stroke",  $('#p1col').val());
	console.log("Draw X Completed");
}




// Draw O
function drawO (where)
{
a = where;
t1 = '<svg viewBox="0 0 320 320" width="180" height="180"   xml:space="preserve" id="svg" xmlns="http://www.w3.org/2000/svg">';
t2 = '<circle id="circle"  cx="160" cy="160" r="60" stroke="#000000" fill="none" stroke-width="20" stroke-linecap="round"></circle></svg>';
$(a).html(t1+t2);
$("#box1").css("background-color","gray");
$("#circle").attr("class", "animate"); 
$("#circle").css("stroke",  $('#p2col').val());
	console.log("Draw O Completed");
}






$("#box1").click(function()
	{	
		if (fl_start) {

			if (box1)
			drawX("#box1");
		}
		else alert ("Game not started");
		
		box1=false;
	});






//$("#nick1").keyup(function() {
  //  var value = $( this ).val();
    //console.log(value);
//});




function start()

	{


	var ps = Math.floor(Math.random()*100);

	if (ps>=50) 
		{
			psval= $("#nick1").val();


		} 

		else 

		{
			psval= $("#nick2").val();

		}

		
		$("#nextplayer").empty();
		$("#nextplayer").html(psval);
		alert("First move: " + psval);

		

		console.log(ps);
		console.log(psval);
		fl_start=true;



		}

	/*



	/*for (var i=0; i<ps; i++) 
		{

		setInterval (function()
			{
				if (fl) {
					$("#nextplayer").html($("#nick1").attr("value"));
					fl=false;
					}
			
				else	{
					$("#nextplayer").html($("#nick2").attr("value"));
					fl=true;
					}
				console.log(i);
			
			},1000)
		//console.log(i);
		}
			
	$("#nextplayer").html(psval);



	
	var color1 = "#" + $("#p1col").attr("value");
	//console.log(color1);
	var color2 = "#" + $("#p2col").attr("value");
	$("#nextplayer").css("color", color1);

	*/

	

 	
 	//document.getElementById('box1').style.backgroundColor = 'gray'; 




/*var circle = document.getElementById('path');
var radius = circle.getAttribute("r");
var circleLength = 2 * Math.PI * radius;*/

    

