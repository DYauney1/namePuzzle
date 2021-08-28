let input = document.querySelector("#input");
let message = document.querySelector("#message");
let responses = {
	"?": "Stuck? Ask for help",
	"help": "Try going 'up'",
	"up": "I hope you're good at Contra",
	"my first girlfriend turned into the moon": "That's rough, buddy",
	"geoff": "Whoa, that's you",
	"dallin": "Whoa, that's me",
	"aleric": "Whoa, that's cool",
	"bored": "Wanna fly kites?",
	"hike": "I love hikes",
	"word": "Cephalaphor",
	"code": "You like it?",
	"who am i": "24601",
	"number": "3301",
	"hi": "Your head's on fire",
	"rickroll": "no u",
	"lol": "haha yeah...",
	"jackie": "tested it for me",
	"..-. --- ..-.": "LOL",
	
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

let code = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a", "start"]
var moveOrder = [];

input.style.top = "calc(50% - 0px)";
input.style.left = "calc(50% - 0px)";
input.addEventListener("keypress", function(event) {
	//console.log(event.code);
	if(event.code == "Enter" || event.code == "NumpadEnter")
	{
		let value = input.value.toLowerCase().trim();
		//console.log(`Whoa, you hit enter. input value:\n${input.value}`)
		
		input.placeholder = "Enter Text Here";
		//if there's a planned response to that entry
		for(const [key, response] of Object.entries(responses)) {
			if(value == key) input.placeholder = response;
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
		
		//if moving down
		if(value == "down")
		{
			//bounds check
			if(parseInt(input.style.top.slice(11, -3)) <= -1 * document.body.offsetHeight / 2 + 120) console.log("at the bottom, can't move");
			else {
				move("down");
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
		
		if(value == "b" || value == "a" || value == "start") move(value);
		
		
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
		case("b"):
		case("a"):
		case("start"):
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
			
			for(value in letters)
			{
				letters[value] = false;
			}
		}
	}
	
	console.log("--------------");
	
	const lettersToAdd = ((Object.keys(letters).length - message.innerHTML.length) / ((code.length - 3) - (moveOrder.length - 1)))
	for(var lettersAdded = 0; lettersAdded < lettersToAdd; lettersAdded++)
	{
		var toBeAdded = Math.floor(Math.random() * (Object.keys(letters).length - message.innerHTML.length));
		
		
		var output = "";
		var index = 0;
		
		for(element in letters)
		{
			if(letters[element])
			{
				output += element.slice(0, 1);
			} else {
				if(index == toBeAdded)
				{
					letters[element] = true;
					output += element.slice(0, 1);
					console.log(element.slice(0, 1));
				}
				index++;
			}
		}
		
		message.innerHTML = output;
		
		
		
		
	}		
	
	if(!success)
	{
		moveOrder = [];
		
		for(value in letters)
		{
			letters[value] = false;
		}
	} else
	{
		switch(moveOrder.length)
		{
			case(4):
				input.placeholder = "Konami Code???";
			break;
			case(8):
				input.placeholder = "Congratulations!";
				alert("You've solved it!")
				input.style.top = `calc(50% - 40px)`;
				input.style.left = `calc(50% + 0px)`;
			break;
			case(9):
				input.placeholder = "Oh, okay";
			break;
			case(10):
				input.placeholder = "Dang, nice";
			break;
			case(11):
				input.placeholder = "You know the rules..."; //just in case?
				window.location.href = "https://youtu.be/dQw4w9WgXcQ";
			break;
			
		}
	}
  	
}

