;

					

fl_start=false; //fl_start means the game is started or not...
counter=0;      // counter - is a move counter
xcol="#p1col";	
ocol="#p2col";
ai="False";
spinner = 0;    //selected number of rotations								
strategy = 0;   // nubmer of selected attack strategy in Hard Mode 


var arr = Array(10);   //  The main array that stores the data of all moves  

$.each(arr,function(index,value){

arr[index]="-";

});



var varr = Array(10);  // Virtual array (varr) for spinner function and attack strategy

$.each(varr,function(index,value){

varr[index]="-";

});




function getRandomColor() {       // chose random color (AI)
  var letters = '0123456789ABCDEF';
  var color='';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function drawX(where)    // Draw X

{
a = where;
id1="line"+counter;
id2="line"+(counter+1);


t1 = '<svg viewBox="0 0 320 320" width="180" height="180"   xml:space="preserve" id="svg" xmlns="http://www.w3.org/2000/svg">';
t2 = '<line id="line1" class="lines" x1="100" y1="100" x2="220" y2="220" style="stroke:rgb(255,0,0);stroke-width:20;stroke-linecap:round;"/>';
t3 = '<line id="line2" class="lines" x1="220" y1="100" x2="100" y2="220" style="stroke:rgb(255,0,0);stroke-width:20;stroke-linecap:round;"/></svg>';

a.html(t1+t2+t3);

$("#line1").attr("id", "r"+id1);
$("#line2").attr("id", "r"+id2);

id1="#r"+id1;
id2="#r"+id2;


a.css("background","gray");
$(id1).css("stroke",  $(xcol).val());
$(id2).css("stroke",  $(xcol).val());
$(id1).attr("class", "animate");
$(id2).attr("class", "animate2");
	

	console.log("Draw X Completed");


	
	


	counter++;
}




function drawO (where)  // Draw X
{


a = where;
id3="circle"+counter;

t1 = '<svg viewBox="0 0 320 320" width="180" height="180"   xml:space="preserve" id="svg" xmlns="http://www.w3.org/2000/svg">';
t2 = '<circle id="circle1"  cx="160" cy="160" r="60" stroke="#000000" fill="none" stroke-width="20" stroke-linecap="round"></circle></svg>';


$(a).html(t1+t2);


$("#circle1").attr("id", "r"+id3);


id3="#r"+id3;



$(a).css("background","gray");
$(id3).attr("class", "animate"); 
$(id3).css("stroke",  $(ocol).val());
$(id3).attr("class", "animate"); 
	console.log("Draw O Completed");




	counter++;

}




//Turn on and turn off AI mode. If selected Multiplayer in GM the AI will be disabled.

$("#gm").change(function () {  
	if($("#gm").val() == "0")
		{
			
			$("#ai").attr("disabled", true);
			$("#ai").css("opacity", 0.3);
			$("#nick2").attr("disabled", false);
			$("#nick2label").empty();
			$("#nick2label").html("Friend name:");
			console.log("Option 'Multiplayer' selected. ");
			ai="false";
	
		}

	else
		{

			$("#ai").attr("disabled", false);
			$("#ai").css("opacity", 1);
			$("#nick2").attr("disabled", true);
			$("#nick2label").html("AI name: ");
			ai="Easy";
			console.log("Option 'Single Player' selected. ");
			console.log(ai + " mode selected.");
		}
});


$("#ai").change(function () {
	if ($("#ai").val()=="0") 
		{
		ai="Easy";
		}

	else if ($("#ai").val()=="1") 
			{
			ai="Normal";		
			} 
			else 	{
					ai="Hard";
					}
	console.log(ai + " mode selected.");
})








function start()

{



	//Check input fields.
	if ($("#nick1").val()=="") 
					{
						$("#nick1").val("Player 1");
					}


				//Need use aiName(); aiName() is name randomize function
		if($("#gm").val() == "1")

			{	

				aiName();
				color= getRandomColor();
				$("#p2col").val(color);
				$("#p2col").css("background-color",  "#"+color);


			}


			else

			{
			


				if($("#nick2").val()=="")
					{
						$("#nick2").val("Player 2");
					}
			}



		

		$("#btn").empty();
		$("#btn").html("RESET");
		$("#btn").attr("onclick","reset()");


	ps = Math.floor(Math.random()*100);
		
	if (ps>=50) 
		{
			psval= $("#nick1").val();
			nextmove = 1;
			xcol="#p1col";
			ocol="#p2col";
			xname=psval;
			oname=$("#nick2").val();


		} 

		else 

		{
			psval= $("#nick2").val();
			nextmove = 1;
			ocol="#p1col";
			xcol="#p2col";
			xname=psval;
			oname=$("#nick1").val();


		}

		
		$("#nextplayer").empty();
		$("#nextplayer").html(psval);
		alert("First move: " + psval);

		

	
		fl_start=true;
		counter=1;
		
		$( "#nick1, #nick2, #p1col, #p2col, #gm, #ai").prop( "disabled", true );
		$( "#nick1, #nick2, #p1col, #p2col, #gm, #ai").css( "opacity", 0.3 );



		if (ai!="False" && xcol=="#p2col") 
			{
				mainAI();
			}
		}



function mainAI() 
	{

	fl=false;

	for (var i = 1; i <= arr.length; i++) 
		{
		
		if(arr[i]=="-")
			{
			
			fl=true;
			}
		
		}


	if (fl==true) 
		{
			if (counter<=10)
				{

					if (ai=="Easy") 
						{
						easyAI();
						}
					if (ai=="Hard") 
						{
						mainHard();
						}
					if (ai=="Normal") 
						{
						normalAI();
						}

				}
		}

	}




function drawer(wh)
	
	{	


		//console.log(wh);

		xindex=wh.substring(4);
		console.log(xindex);
		stopfl=0;
		//box2=wh.substring(4);


				if(counter>=5) 

					{
					stopfl=checkwin();
					console.log("Checkwin equal" + stopfl);
					}

		if (stopfl!=1)

			{



				if (fl_start)

				{
					if (arr[xindex]=="-") 
					{

						if (nextmove==1) 

					 		{
						
							drawX($(wh));
							nextmove=2;
							arr[xindex]="x";

							
							//Change next player label
							$("#nextplayer").empty();
							$("#nextplayer").html(oname);


									if (ai!="False" && ocol=="#p2col") 
										{
											mainAI();
										}
							

										
											
							}


						else

								{

								drawO($(wh));
								nextmove=1;
								arr[xindex]="o";
								

								//Change next player label
								$("#nextplayer").empty();
								$("#nextplayer").html(xname);


								if (true) {}

								if (ai!="False" && xcol=="#p2col") 
										{
											mainAI();
										}


								

								}



					console.log(arr[1],arr[2],arr[3]);
					console.log(arr[4],arr[5],arr[6]);
					console.log(arr[7],arr[8],arr[9]);
					console.log("Move = " + counter);





				}


					


				


				}

				else

				{
					alert ("Game not started");
				}

		}

		}

					

$("#box9").click(function () {
	drawer("#box9");
});

$("#box8").click(function () {
	drawer("#box8");
});

$("#box7").click(function () {
	drawer("#box7");
});

$("#box6").click(function () {
	drawer("#box6");
});


$("#box5").click(function () {
	drawer("#box5");
});

$("#box4").click(function () {
	drawer("#box4");
});


$("#box3").click(function () {
	drawer("#box3");
});


$("#box2").click(function () {
	drawer("#box2");
});

$("#box1").click(function () {
	drawer("#box1");
});




function checkwin() 
{


	if (arr[1] == arr[2] && arr[1]==arr[3])

	{
		if (arr[1]!="-") 
			{
				if (arr[1]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("1th Horizontal");	
			}
				
	}


	if (arr[4] == arr[5] && arr[4]==arr[6])

	{
		if (arr[4]!="-") 
			{
				if (arr[4]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("2th Horizontal");
			}
		
	}


	if (arr[7] == arr[8] && arr[7]==arr[9])

	{
		if (arr[7]!="-") 
			{
				if (arr[7]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("3th Horizontal");
			}
		
	}

	if (arr[1] == arr[4] && arr[1]==arr[7])

	{
		if (arr[1]!="-") 
			{
				if (arr[1]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("1th Vertical");
			}
		
		
	}

	if (arr[2] == arr[5] && arr[2]==arr[8])

	{
		if (arr[2]!="-") 
			{
				if (arr[2]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("2th Vertical");
			}

		
		
	}


	if (arr[3] == arr[6] && arr[3]==arr[9])

	{
		if (arr[3]!="-") 
			{
				if (arr[3]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("3th Vertical");
			}
		
	}

	if (arr[1] == arr[5] && arr[1]==arr[9])

	{
		if (arr[1]!="-") 
			{
				if (arr[1]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
			console.log("1th Diagonal");
			}
		
	}

	if (arr[3] == arr[5] && arr[3]==arr[7])

	{
		if (arr[3]!="-") 
			{
				if (arr[3]=="x") 
					{
					setTimeout(function() { alert('Player '+ xname + " WON!") }, 700); return 1;
					}
				else 
					{
					setTimeout(function() { alert('Player '+ oname + " WON!") }, 700); return 1;
					}
		console.log("1th Diagonal"); 
		}
		
	}

}


function reset () 
{
	$("#rline1,#rline2,#rline3,#rline4,#rline5,#rline6,#rline7,#rline8,#rline9,#rline10").remove();
	$("#rcircle2,#rcircle4,#rcircle6,#rcircle8").remove();
	$( "#nick1, #nick2, #p1col, #p2col, #gm, #ai").prop( "disabled", false );
	$( "#nick1, #nick2, #p1col, #p2col, #gm, #ai").css( "opacity", 1 );

	fl_start=false;
	counter=0;
	xcol="#p1col";
	ocol="#p2col";
	strategy=0;
	spinner=0;
	$("#box1,#box2,#box3,#box4,#box5,#box6,#box7,#box8,#box9").css("background","");
	$.each(arr,function(index,value){

	arr[index]="-";
	});


	$.each(varr,function(index,value){

	varr[index]="-";
	});

	$( "#nick1" ).prop( "disabled", false );
	$( "#nick2" ).prop( "disabled", false );
	$( "#gm").prop( "disabled", false );
	$("#btn").empty();
	$("#btn").html("START");
	$("#btn").attr("onclick","start()");

	console.log("Reset Completed")
}




function aiName() {
	ps = Math.floor(Math.random()*11);

	 if (ps==0)
	 	{	
	 	aiName();
	 	}




	 	switch (ps)
	{
	
		case 1:
		$("#nick2").val("William");
		break;

		case 2:
		$("#nick2").val("Jayden");
		break;

		case 3:
		$("#nick2").val("Emily");
		break;

		case 4:
		$("#nick2").val("Elizabeth");
		break;

		case 5:
		$("#nick2").val("Logan");
		break;

		case 6:
		$("#nick2").val("David");
		break;

		case 7:
		$("#nick2").val("James");
		break;

		case 8:
		$("#nick2").val("Evelyn");
		break;

		case 9:
		$("#nick2").val("Victoria");
		break;

		case 10:
		$("#nick2").val("Sarah");
		break;

	}





}


function easyAI () 

{
	 

	 	
	 	ps = Math.floor(Math.random()*10);


	 	


	 	while (ps==0) 
	 	{

	 		ps = Math.floor(Math.random()*10);
	 

	 		if (ps>0) 
	 			{
	 				break;
	 			}
  		
		}


	if (arr[ps]=="-")

		{
	 		drawer("#box"+ps);
	 			
		}

	else easyAI();
  		
	 		
	
	
}

function normalAI () {
	if (ocol=="#p2col") 
		{
			defenceAI();

		}

	else
		{
			easyAI();
		}
}


function mainHard () {
	if (ocol=="#p2col") 
		{
			defenceAI();

		}

	else
		{
			attackAI();
		}
}


function defenceAI() {

	df=checkstupedkwin("o");
	if (df!=0)
		{
			drawer("#box"+df);
		}
	df=checkstupedkwin("x");
	if (df!=0)
		{
			drawer("#box"+df);
		}
	else

		{

			if (counter==2) 
					{
						if (arr[1]=="x" || arr[3]=="x" || arr[7]=="x" || arr[9]=="x") 
							{
								drawer("#box5");
							}

						if (arr[2]=="x") 
							{
								drawer("#box8");
							}
						if (arr[4]=="x") 
							{
								drawer("#box6");
							}

						if (arr[6]=="x") 
							{
								drawer("#box4");
							}
						if (arr[8]=="x") 
							{
								drawer("#box2");
							}

						if (arr[5]=="x") 
							{
									randmove = Math.floor(Math.random()*5);
									if (randmove==0) 
										{
											randmove++;
										}
									
									if (randmove==1) 
												{
													drawer("#box1");
												}

									if (randmove==2) 
												{
													drawer("#box3");
												}

									if (randmove==3) 
												{
													drawer("#box7");
												}

									if (randmove==4) 
												{
													drawer("#box9");
												}


							}

					}

				if (counter==4) 
					{

					 if (arr[5]=="o") 
					 	{
					 		if (arr[1]=="x" && arr[9]=="x" || arr[3]=="x" && arr[7]=="x" ) 
					 			{
					 				randmove=0;
					 				randmove = Math.floor(Math.random()*5);
					 				if (randmove==0) 
										{
											randmove++;
										}
									
									if (randmove==1) 
												{
													drawer("#box2");
												}

									if (randmove==2) 
												{
													drawer("#box4");
												}

									if (randmove==3) 
												{
													drawer("#box6");
												}

									if (randmove==4) 
												{
													drawer("#box8");
												}

					 			}
					 	}

					 	if (arr[5]=="x") 
					 		{
						 		if(arr[1]=="x" || arr[3]=="x" || arr[7]=="x" || arr[9]=="x") 
						 		{
						 	

						 			if (arr[1]=="-") 
						 			{
						 				drawer("#box1");
						 			}

						 			else if (arr[3]=="-") 
						 			{
						 				drawer("#box3");

						 			}

						 			else if (arr[7]=="-") 
						 			{
						 				drawer("#box7");
						 			}

						 			else if (arr[9]=="-") 
						 			{
						 				drawer("#box9");
						 			}

						 		}
					 		}



					}



					if (counter>=6) 
						{
							easyAI();
						}
		}


	
}

	

function checkstupedkwin(w) 

{
var pos=0;

	for (i=1; i<=8; i++)
	{
		if (i==1) 
			{
			x=1;
			y=2;
			z=3;
			}
		if (i==2) 
			{
			x=4;
			y=5;
			z=6;	
			}
		if (i==3) 
			{
			x=7;
			y=8;
			z=9;	
			}
		if (i==4) 
			{
			x=1;
			y=4;
			z=7;	
			}
		if (i==5) 
			{
			x=2;
			y=5;
			z=8;	
			}
		if (i==6) 
			{
			x=3;
			y=6;
			z=9;	
			}
		if (i==7) 
			{
			x=1;
			y=5;
			z=9;	
			}
		if (i==8) 
			{
			x=3;
			y=5;
			z=7;	
			}

pos=checkstupedkwin2(x,y,z,w);


	if (pos!=0) 
		{	
			break;
		}

	}	

	if (pos==0) 
		{
			return 0;
		}

	else 
		{
			return pos;
		}
	

}




function checkstupedkwin2 (x,y,z,w) 
{
	fl=0;
	pos=0;

	if (arr[x]=="-" && arr[y]==arr[z] && arr[x]!=arr[z] && arr[y]==w) 
		{
			fl++;
			pos=x;
		}

	if (arr[y]=="-" && arr[x]==arr[z] && arr[y]!=arr[z] && arr[x]==w) 
		{
			fl++;
			pos=y;
		}

	if (arr[z]=="-" && arr[y]==arr[x] && arr[z]!=arr[x] && arr[y]==w) 
		{
			fl++;
			pos=z;
		}

	if (fl==1) 

		{
			return pos;
		}

	else
		{
			return 0;
		}

}


function attackAI() 
{


		if (strategy==0) 
		{

			strategy=Math.floor(Math.random()*4);
			if (strategy==0) 
				{
					strategy++;
				}
		}

		
		if (spinner==0) 
		{


		spinner=Math.floor(Math.random()*5);
		if (spinner==0) 
			{
				spinner++;
			}
 
		}	


		spinnerFN();


		af=checkstupedkwin("x");
	if (af!=0)
		{
			drawer("#box"+af);
		}
		af=checkstupedkwin("o");
		if (af!=0)
		{
			drawer("#box"+af);
		}
	else

		{


		if (strategy==1) 
			{
				if (counter==1) 
					{
					 spindrawer(1);
					}

				if (counter==3) 
					{
						if (varr[5]=="o") 
							{
								spindrawer(9);
							}
						if (varr[3]=="o") 
							{
								randmove=0;
					 				randmove = Math.floor(Math.random()*3);
					 				if (randmove==0) 
										{
											randmove++;
										}
									
									if (randmove==1) 
												{
													spindrawer(9);
												}

									if (randmove==2) 
												{
													spindrawer(7);	
				
												}

							}

						if (varr[7]=="o") 
							{
								randmove=0;
					 				randmove = Math.floor(Math.random()*3);
					 				if (randmove==0) 
										{
											randmove++;
										}
									
									if (randmove==1) 
												{
													spindrawer(3);
													
												}

									if (randmove==2) 
												{
													spindrawer(9);
													
												}

							}


						if (varr[9]=="o") 
							{
								randmove=0;
					 				randmove = Math.floor(Math.random()*3);
					 				if (randmove==0) 
										{
											randmove++;
										}
									
									if (randmove==1) 
												{
													spindrawer(3);
												}

									if (randmove==2) 
												{
													spindrawer(7);
											
												}

							}

							if (varr[2]=="o" || varr[4]=="o" || varr[6]=="o" || varr[8]=="o") 
								{
									spindrawer(5);
								}

					}

					if (counter==5) 
						{
							if (varr[1]=="x" && varr[2]=="o" && varr[5]=="x") 
								{
									spindrawer(7);
								}
						
							if (varr[1]=="x")  
								{
									if(varr[3]=="x" || varr[7]=="x" || varr[9]=="x")
										{
											if (varr[3]=="-") 
												{
													spindrawer(3);
												}
											else if (varr[7]=="-") 
												{
													spindrawer(7);
												}
											else if (varr[9]=="-") 
												{
													spindrawer(9);
												}
										}
								}

							if (varr[1]=="x" && varr[5]=="x" && varr[9]=="o") 
								{
									if (varr[3]=="-") 
												{
													spindrawer(3);
												}
											else if (varr[7]=="-") 
												{
													spindrawer(7);
												}
											else if (varr[9]=="-") 
												{
													spindrawer(9);
												}
								}



						}

						if (counter>=7) 
							{
								easyAI();
							}








			}



			if (strategy==2) 
				{
					if (counter==1) 
						{
							spindrawer(5);
						}
				

					if (counter==3) 
						{
							if (varr[5]=="x") 
								{
									if (varr[2]=="o" || varr[4]=="o" || varr[6]=="o" || varr[8]=="o") 
										{
											if (varr[1]=="-") 
												{
													spindrawer(1);
												}
											else if (varr[3]=="-") 
												{
													spindrawer(3);
												}
											else if (varr[7]=="-") 
												{
													spindrawer(7);
												}
											else if (varr[9]=="-") 
												{
													spindrawer(9);
												}
										}

										if (varr[1]=="o") 
											{
												spindrawer(9);
											}
										if (varr[3]=="o") 
											{
												spindrawer(7);
											}
										if (varr[7]=="o") 
											{
												spindrawer(3);
											}
										if (varr[9]=="o") 
											{
												spindrawer(1);
											}
										
										
										


								}
						}

					if (counter==5) 
						{
							if (varr[1]=="x" || varr[3]=="x" || varr[7]=="x" || varr[9]=="x" ) 
								{
											

											if (varr[1]=="-" && varr[2]=="-" && varr[4]=="-") 
												{
													spindrawer(1);
												}
											else if (varr[3]=="-" && varr[2]=="-" && varr[6]=="-") 
												{
													spindrawer(3);
												}
											else if (varr[7]=="-" && varr[4]=="-" && varr[8]=="-") 
												{
													spindrawer(7);
												}
											else if (varr[9]=="-" && varr[6]=="-" && varr[8]=="-") 
												{
													spindrawer(9);
												}
								}
		

						}

						if (counter>=7) 
								{
									easyAI();
								}

				}



				if (strategy==3) 
					{
						if (counter==1) 
							{
								spindrawer(2);
							}
						if (counter==3) 
							{
								if (varr[5]=="-") 
									{
										if (varr[1]=="-") 
											{
												spindrawer(1);
											}
										else if (varr[3]=="-") 
											{
												spindrawer(3);
											}
									}
								if (varr[5]=="o") 
									{
										easyAI();
									}
							}
						if (counter==5) 
								{
									if (varr[5]=="-")
										{
											spindrawer(5);
										}
								}
						if (counter>=7) 
								{
									easyAI();
								}
					}


		}
	
}


function spinnerFN() 
	{
	if (spinner==1)
		{
			varr[1]=arr[1];
			varr[2]=arr[2];
			varr[3]=arr[3];
			varr[4]=arr[4];
			varr[5]=arr[5];
			varr[6]=arr[6];
			varr[7]=arr[7];
			varr[8]=arr[8];
			varr[9]=arr[9];

		}
	if (spinner==2) 
		{
			varr[1]=arr[3];
			varr[2]=arr[6];
			varr[3]=arr[9];
			varr[4]=arr[2];
			varr[5]=arr[5];
			varr[6]=arr[8];
			varr[7]=arr[1];
			varr[8]=arr[4];
			varr[9]=arr[7];
		}
	if (spinner==3) 
		{	
			varr[1]=arr[9];
			varr[2]=arr[8];
			varr[3]=arr[7];
			varr[4]=arr[6];
			varr[5]=arr[5];
			varr[6]=arr[4];
			varr[7]=arr[3];
			varr[8]=arr[2];
			varr[9]=arr[1];

		}
	if (spinner==4) 
		{
			varr[1]=arr[7];
			varr[2]=arr[4];
			varr[3]=arr[1];
			varr[4]=arr[8];
			varr[5]=arr[5];
			varr[6]=arr[2];
			varr[7]=arr[9];
			varr[8]=arr[6];
			varr[9]=arr[3];
		}



	}


function spindrawer (wh) 
	{
		if (spinner==1) 
			{
				switch (wh)
				{
					case 1: drawer("#box1"); break;
					case 2: drawer("#box2"); break;
					case 3: drawer("#box3"); break;
					case 4: drawer("#box4"); break;
					case 5: drawer("#box5"); break;
					case 6: drawer("#box6"); break;
					case 7: drawer("#box7"); break;
					case 8: drawer("#box8"); break;
					case 9: drawer("#box9"); break;
				}
			
			}

		if (spinner==2) 
			{
				switch (wh)
				{
					case 1: drawer("#box3"); break;
					case 2: drawer("#box6"); break;
					case 3: drawer("#box9"); break;
					case 4: drawer("#box2"); break;
					case 5: drawer("#box5"); break;
					case 6: drawer("#box8"); break;
					case 7: drawer("#box1"); break;
					case 8: drawer("#box4"); break;
					case 9: drawer("#box7"); break;
				}
			
			}

		if (spinner==3) 
			{
				switch (wh)
				{
					case 1: drawer("#box9"); break;
					case 2: drawer("#box8"); break;
					case 3: drawer("#box7"); break;
					case 4: drawer("#box6"); break;
					case 5: drawer("#box5"); break;
					case 6: drawer("#box4"); break;
					case 7: drawer("#box3"); break;
					case 8: drawer("#box2"); break;
					case 9: drawer("#box1"); break;
				}
			
			}
		
		if (spinner==4) 
			{
				switch (wh)
				{
					case 1: drawer("#box7"); break;
					case 2: drawer("#box4"); break;
					case 3: drawer("#box1"); break;
					case 4: drawer("#box8"); break;
					case 5: drawer("#box5"); break;
					case 6: drawer("#box2"); break;
					case 7: drawer("#box9"); break;
					case 8: drawer("#box6"); break;
					case 9: drawer("#box3"); break;
				}
			
			}	

	}

