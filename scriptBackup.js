let input = document.querySelector("#input");
let message = document.querySelector("#message");
let responses = {
	"help": "Try going 'up'"
}

var letters = {
	'Y0': false,
	'o1': false,
	'u2': false,
	'r3': false,
	' 4': false,
	'C5': false,
	'o6': false,
	'u7': false,
	's8': false,
	'i9': false,
	'n10': false,
	' 11': false,
	'D12': false,
	'a13': false,
	'l14': false,
	'l15': false,
	'i16': false,
	'n17': false
};

let code = ["up", "up", "down", "down", "left", "right", "left", "right"]
var moveOrder = [];

input.style.top = "calc(50% - 0px)";
input.style.left = "calc(50% - 0px)";
input.addEventListener("keypress", function(event) {
	//console.log(event.code);
	if(event.code == "Enter" || event.code == "NumpadEnter")
	{
		let value = input.value.toLowerCase()
		//console.log(`Whoa, you hit enter. input value:\n${input.value}`)
		
		//if there's a planned response to that entry
		for(const [key, response] of Object.entries(responses)) {
			if(value == key) input.placeholder = response;
		}
		
		//if moving down
		if(value == "down")
		{
			//bounds check
			if(parseInt(input.style.top.slice(11, -3)) <= -1 * document.body.offsetHeight / 2 + 120) console.log("at the bottom, can't move");
			else {
				move("down");
			}
		}
		
		//if moving up
		if(value == "up")
		{
			//bounds check
			if(parseInt(input.style.top.slice(11, -3)) >= document.body.offsetHeight / 2 - 40 ) console.log("at the top, can't move");
			else {
				move("up");
			}
		}
		
		//if moving left
		if(value == "left")
		{
			//bounds check
			if(parseInt(input.style.left.slice(11, -3)) >= document.body.offsetWidth / 2 - 40 - 150) console.log("at the left, can't move");
			else {
				move("left");
			}
		}
		
		//if moving right
		if(value == "right")
		{
			//bounds check
			if(parseInt(input.style.left.slice(11, -3)) <= -1 * document.body.offsetWidth / 2 + 40 + 150) console.log("at the right, can't move");
			else {
				move("right");
			}
		}
		
		
		
	}
	
});


function move(direction) {
	switch(direction) {
		case("up"):
			input.style.top = `calc(50% - ${parseInt(input.style.top.slice(11, -3)) + 20}px`;
			break;
		case("down"):
			input.style.top = `calc(50% - ${parseInt(input.style.top.slice(11, -3)) - 20}px`;
			break;
		case("left"):
			input.style.left = `calc(50% - ${parseInt(input.style.left.slice(11, -3)) + 20}px`;
			break;
		case("right"):
			input.style.left = `calc(50% - ${parseInt(input.style.left.slice(11, -3)) - 20}px`;
			break;
			
		default: console.log("error in move direction");
	}
	
	moveOrder.push(direction)
	var success = true;
	
	
	for(const [index, element] of moveOrder.entries())
	{
		if(code[index] != element)
		{
			success = false;
			moveOrder = [];
		}
	}
	
	if(success)
	{
		var indicies = [];
		for(var index = 0; index < (Object.keys(letters).length - message.innerHTML.length) / (code.length - moveOrder.length); index++)
		{
			var toBeAdded = Math.floor(Math.random() * (Object.keys(letters).length - message.innerHTML.length));
			indicies.push(toBeAdded);
		}
		
		indicies.sort((a, b) => a - b);
		
		console.log("indicies post-sort:\n" + indicies);
		
		//console.log("(relative) indicies to be added:\n" + indicies)
		//for(number of indicies) console.log(number);
		
		
		
		
		var output = "";
		var index = 0;
		
		for(element in letters)
		{
			if(letters[element])
			{
				output += element.slice(0, 1);
			} else {
				if(indicies.includes(index))
				{
					letters[element] = true;
					output += element.slice(0, 1);
					console.log(element.slice(0, 1));
					indicies.shift();
					index--;
				}
				index++;
			}
		}
		
		message.innerHTML = output;
		//console.log(output);
		for(element in letters)
		{
			console.log(element, letters[element]);
		}
		
	}
	
	
	
	if(moveOrder.length == 8 & success) alert("yeet");
	
}

