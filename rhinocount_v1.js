//INITIATE CODE AFTER CEROS CALL
				
/*
 * The goal here is to create a script that
 * doesn't require that anyone open up the HTML
 * window to edit everything. They should be
 * able to get everything running just by tagging
 * what's needed and letting the script take it
 * all from there and run with it.
*/
				
/*
 * Curent logic is:
 * Tag a text layer with 'count' and 'up' or 'down' depending on the direction.
 * In the payload put 'start number, end number, time interval, (opt) tag of layer to trigger it'.
 * If you want the layer to trigger itself, don't bother with the fourth payload value.
 * The time interval isn't in any exact unit. It's from a scale of 0-10 (slowest to fastest).
*/


function $instanceStorage() {

	//create array of instances of layer with 'count' tag
	var $instances = experience.findLayersByTag('count').layers;

	//create variable for payload storage
	var $instancePayload;

	//create an array for the scale
	var scale = []

	//fill the array for the scale with 0.0-100.00
	for (i=0.0; i < 10; i += .1) {
	scale.unshift(i.toFixed(1));
	};
	//add an extra value to make the array have a length 101
	scale.unshift('0');


	function count(instance, countUpOrDown, startNumber, endNumber, timeInterval, targetLayerTag) {
	
		////console.log('countSelf');
		
		//set current layer as a fallback
		var $layer = experience.findLayerById(instance.id);
		
		//turn startNumber value into an integer
		var $startNumber = parseInt(startNumber.match(/\d+/).pop());
		////console.log('start number: ', $startNumber);
		
		//turn endNumber value into an integer
		var $endNumber = parseInt(endNumber.match(/\d+/).pop());
		////console.log('end number: ', $endNumber);

	
		//create variable for the number as it count s
		var $newNumber;
		
		var $hasCharacters;
		var $hasTwoCharacters;
		var $placement;
		var $Char;
		var $Char2;
		
		//separate characters from integers
		
		
		if (startNumber.split(/\d+/)[0] == '' && startNumber.split(/\d+/)[1] == '' && endNumber.split(/\d+/)[0] == '' && endNumber.split(/\d+/)[1] == '') {
			
			// if neither has a value
			$hasCharacters = false;
			//console.log('no characters');
			
		} else if (startNumber.split(/\d+/)[0] != '' || startNumber.split(/\d+/)[1] != '' || endNumber.split(/\d+/)[0] != '' || endNumber.split(/\d+/)[1] != '') {
			
			// if one of them has a value
			//console.log('we have characters over here');
			
			if (startNumber.split(/\d+/)[0] != '' && startNumber.split(/\d+/)[1] != '') {
				
				//if start has two values
				$hasTwoCharacters = true;
				$Char = startNumber.split(/\d+/)[0];
				$Char2 = startNumber.split(/\d+/)[1];
				//console.log('we have two characters: ', $Char, $Char2);
				
			} else if (endNumber.split(/\d+/)[0] != '' && endNumber.split(/\d+/)[1] != '') {
				
				//if end has two values
				$hasTwoCharacters = true;
				$Char = endNumber.split(/\d+/)[0];
				$Char2 = endNumber.split(/\d+/)[1];
				//console.log('we have two characters: ', $Char, $Char2);
				
			} else if (startNumber.split(/\d+/)[0] != '' && startNumber.split(/\d+/)[1] == '') {
				
				//if start has value in first position
				$hasCharacters = true;
				$Char = startNumber.split(/\d+/)[0];
				$placement = 'first';
				//console.log('we have one character: ', $Char, $placement);
			
			} else if (startNumber.split(/\d+/)[0] == '' && startNumber.split(/\d+/)[1] != '') {
				
				//if start has value in last position
				$hasCharacters = true;
				$Char = startNumber.split(/\d+/)[1];
				$placement = 'last';
				//console.log('we have one character: ', $Char, $placement);
				
			} else if (endNumber.split(/\d+/)[0] != '' && endNumber.split(/\d+/)[1] == '') {
				
				//if end has value in first position
				$hasCharacters = true;
				$Char = endNumber.split(/\d+/)[0];
				$placement = 'first';
				//console.log('we have one character: ', $Char, $placement);
			
			} else if (endNumber.split(/\d+/)[0] == '' && endNumber.split(/\d+/)[1] != '') {
				
				//if end has a value in last position
				$hasCharacters = true;
				$Char = endNumber.split(/\d+/)[1];
				$placement = 'last';
				//console.log('we have one character: ', $Char, $placement);
				
			} else {
				console.error('fix this code');
			};
			
		} else {
			console.error('fix this code');
			
		};
		
		
		if (targetLayerTag != undefined) {
			var $targetLayer = targetLayerTag;
			$targetLayer = experience.findLayersByTag($targetLayer);
			//console.log('we have a target layer: ', $targetLayer);
		};
		
		if (countUpOrDown == 'countUp') {
			// if countUp then figure the scale out by the end number
			var $timeInterval = (scale[parseInt(timeInterval)*10]*300)/$endNumber;	
			//console.log('we\'re counting up by: ', $timeInterval);
		} else if (countUpOrDown == 'countDown') {
			// if countDown then figure the scale out by the start number
			var $timeInterval = (scale[parseInt(timeInterval)*10]*300)/$startNumber;
			//console.log('we\'re counting down by: ', $timeInterval);
		} else {
			console.error('broken execution, need count up or down')
		};
		
		//var $timeInterval = (scale[parseInt(timeInterval)*10]*300)/$endNumber;
	
		//just for checking shit
		////console.log($startNumber, $endNumber, instance, countUpOrDown, 'time interval: ' + $timeInterval, experience.findLayerById(instance.id), targetLayerTag);
	
		var countUp = function(layer) {

			//console.log('firing up countUp function');

			//Counting Function
		 	function countingUpFunction() {
				
				
				$startNumber += 1;
				$newNumber = $startNumber;
				
				//if the character storage is empty, don't use it,
				//otherwise go for it and add it to the end of the new value for the text
				
				if ($hasCharacters == false && $hasTwoCharacters == false) {
					
					//console.log('countUp: ain\'nt no characters here!');
					//if there is no target layer tag, then use default layer otherwise, don't
					if (targetLayerTag == undefined) {
						//console.log($newNumber);
						layer.setText($newNumber);
					} else if (targetLayerTag != undefined) {
						//console.log($newNumber);
						$layer.setText($newNumber);
					};	
					
				} else if ($hasCharacters == true) {
					
					//console.log('countUp: we\'ve got some characters!');
					if ($placement == 'first') {
						//console.log('first position!');
						//if there is no target layer tag, then use default layer otherwise, don't
						if (targetLayerTag == undefined) {
							//console.log($Char + $newNumber);
							layer.setText($Char + $newNumber);
						} else if (targetLayerTag != undefined) {
							//console.log($Char + $newNumber);
							$layer.setText($Char + $newNumber);
						} else {
							console.error('fix this code');
						};	
					} else if ($placement == 'last') {
						//console.log('last position!');
						//if there is no target layer tag, then use default layer otherwise, don't
						if (targetLayerTag == undefined) {
							//console.log($newNumber + $Char);
							layer.setText($newNumber + $Char);
						} else if (targetLayerTag != undefined) {
							//console.log($newNumber + $Char);
							$layer.setText($newNumber + $Char);
						} else {
							console.error('fix this code');
						};	
					} else {
						console.error('fix this code');
					};
					
				} else if ($hasTwoCharacters == true) {
					
					//console.log('we\'ve got TWO characters');
					//if there is no target layer tag, then use default layer otherwise, don't
					if (targetLayerTag == undefined) {
						//console.log($Char + $newNumber + $Char2);
						layer.setText($Char + $newNumber + $Char2);
					} else if (targetLayerTag != undefined) {
						//console.log($Char + $newNumber + $Char2);
						$layer.setText($Char + $newNumber + $Char2);
					} else {
						console.error('fix this code');
					};	
					
				} else {
					console.error('fix this code');
				};
				
	
				// stop timer when hit number
				if ($newNumber >= $endNumber) {
					clearInterval(timerForCountingFunction);
					return;
				 };
			};

			//how often to countdown	
			var timerForCountingFunction = setInterval(countingUpFunction, $timeInterval);
	
		};
		
		
		var countDown = function(layer) {

			//console.log('countDown function');
			
			//Counting Function
		 	function countingDownFunction() {
	
				$startNumber -= 1;
				$newNumber = $startNumber;
				
				//if the character storage is empty, don't use it,
				//otherwise go for it and add it to the end of the new value for the text
				
				if ($hasCharacters == false && $hasTwoCharacters == false) {
					
					//console.log('countUp: ain\'nt no characters here!');
					//if there is no target layer tag, then use default layer otherwise, don't
					if (targetLayerTag == undefined) {
						//console.log($newNumber);
						layer.setText($newNumber);
					} else if (targetLayerTag != undefined) {
						//console.log($newNumber);
						$layer.setText($newNumber);
					};	
					
				} else if ($hasCharacters == true) {
					
					//console.log('countUp: we\'ve got some characters!');
					if ($placement == 'first') {
						//console.log('first position!');
						//if there is no target layer tag, then use default layer otherwise, don't
						if (targetLayerTag == undefined) {
							//console.log($Char + $newNumber);
							layer.setText($Char + $newNumber);
						} else if (targetLayerTag != undefined) {
							//console.log($Char + $newNumber);
							$layer.setText($Char + $newNumber);
						} else {
							console.error('fix this code');
						};	
					} else if ($placement == 'last') {
						//console.log('last position!');
						//if there is no target layer tag, then use default layer otherwise, don't
						if (targetLayerTag == undefined) {
							//console.log($newNumber + $Char);
							layer.setText($newNumber + $Char);
						} else if (targetLayerTag != undefined) {
							//console.log($newNumber + $Char);
							$layer.setText($newNumber + $Char);
						} else {
							console.error('fix this code');
						};	
					} else {
						console.error('fix this code');
					};
					
				} else if ($hasTwoCharacters == true) {
					
					//console.log('we\'ve got TWO characters');
					//if there is no target layer tag, then use default layer otherwise, don't
					if (targetLayerTag == undefined) {
						//console.log($Char + $newNumber + $Char2);
						layer.setText($Char + $newNumber + $Char2);
					} else if (targetLayerTag != undefined) {
						//console.log($Char + $newNumber + $Char2);
						$layer.setText($Char + $newNumber + $Char2);
					} else {
						console.error('fix this code');
					};	
					
				} else {
					console.error('fix this code');
				};
	
				// stop timer when hit number
				if ($newNumber <= $endNumber) {
					clearInterval(timerForCountingFunction);
					return;
				 };
			};

			//how often to countdown	
			var timerForCountingFunction = setInterval(countingDownFunction, $timeInterval);
	
		};
	
		
		// if there isn't a targetLayer then just use the shown layer as the target
		if (targetLayerTag == undefined) {
			if (countUpOrDown == 'countUp') {
				instance.on(CerosSDK.EVENTS.SHOWN, countUp);	
			} else if (countUpOrDown == 'countDown') {
				instance.on(CerosSDK.EVENTS.SHOWN, countDown);
			} else {
				console.error('broken execution, need count up or down')
			};
		} else {
			// otherwise, you want to use whatever layer is set as the target
			if (countUpOrDown == 'countUp') {
				$targetLayer.on(CerosSDK.EVENTS.SHOWN, countUp);	
			} else if (countUpOrDown == 'countDown') {
				$targetLayer.on(CerosSDK.EVENTS.SHOWN, countDown);
			} else {
				console.error('broken execution, need count up or down')
			};
		};

	
	
	};




	for (var i = 0; $instances[i] != undefined; i++) {
	
		// check to see if the list of video IDs has spaces or not after the commas
		if ($instances[i].getPayload().includes(' ')) {
		
		    $instancePayload = $instances[i].getPayload().split(', ');
		
		} else {
		
			$instancePayload = $instances[i].getPayload().split(',');
		
		};
	
					
		// check to see if the right amount of values is there				
		if ($instancePayload.length == 3) {
		
			//if 3 values, show on that layer
		
			//check to see whether to count up or down
			if ($instances[i].tags.includes('up')) {
			
				//need to trigger a function that passes a value to everything below
				count($instances[i], 'countUp', $instancePayload[0], $instancePayload[1], $instancePayload[2]);
				//$instances[i].on(CerosSDK.EVENTS.SHOWN, countUp);	
		
			} else if ($instances[i].tags.includes('down')) {
			
				count($instances[i], 'countDown', $instancePayload[0], $instancePayload[1], $instancePayload[2]);
				//$instances[i].on(CerosSDK.EVENTS.SHOWN, countDown);	
			
			} else {
			
				console.error('Item ' + $instances[i].id + ' needs a direction');
			
			};
		
		
		} else if ($instancePayload.length == 4) {
		
			//if 4 values, show on the target layer (3rd value)
		
			//check to see whether to count up or down
			if ($instances[i].tags.includes('up')) {
			
				//need to trigger a function that passes a value to everything below
				count($instances[i], 'countUp', $instancePayload[0], $instancePayload[1], $instancePayload[2], $instancePayload[3]);
				//$instances[i].on(CerosSDK.EVENTS.SHOWN, countUp);	
		
			} else if ($instances[i].tags.includes('down')) {
			
				count($instances[i], 'countDown', $instancePayload[0], $instancePayload[1], $instancePayload[2], $instancePayload[3]);
				//$instances[i].on(CerosSDK.EVENTS.SHOWN, countDown);	
			
			} else {
			
				//tell me which layer needs a direction
				console.error('Item ' + $instances[i].id + ' needs a direction');
			
			};
		
		
		} else {
		
			//tell which layer is set up wrong
			console.error('Item ' + $instances[i].id + ' doesn\'t have enough values');
		
		};

	}


};

$instanceStorage();
