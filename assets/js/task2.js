//validation initialization 
$( '#parameters' ).validate({
	rules: {
		allowMinus: {
			required: function(){
				return (parseFloat($('#minValue').val()) < 0)
			}
		},
		minValue: {
			required: true,
			number: true,
			checkValue: {
				depends: function(){
					return $('#allowMinus').prop('checked');
				}
			},
			compare: true
		},
		maxValue: {
			required: true,
			number: true,
			compare: true
		}
	},
	messages: {
		allowMinus: {
			required: 'Should allow if min value is negative'
		}
	},
	errorPlacement: function (error, element) {
	    if (element.attr('type') == 'checkbox') {
	    	$('#saveParameters').attr('disabled', 'disabled');
	        return element.next('label').append(error);
	    }
		error.insertAfter($(element));
		$('#saveParameters').attr('disabled', 'disabled');
	},
	onkeyup: function(){
		$('#parameters').valid();
		if ($('#parameters').valid()){
			$('#saveParameters').removeAttr('disabled');
		}
	},
   	onclick: function(){
		$('#parameters').valid();
		if ($('#parameters').valid()){
			$('#saveParameters').removeAttr('disabled');
		}
	}
});

//on save changed parameters
function onSaveParameters(){
	//disable Save button
	$('#saveParameters').attr('disabled', 'disabled');
	//save changes
	$('input[name="savedMinValue"]').val($('#minValue').val());
	$('input[name="savedMaxValue"]').val($('#maxValue').val());
	$('input[name="savedAllowMinus"]').val($('#allowMinus').prop('checked'));

	//sign button in dropdown table 
	if($('input[name="savedAllowMinus"]').val() === 'false'){
		$('#sign').attr('disabled', 'disabled');
	} else {
		$('#sign').removeAttr('disabled');
	}
	//when dropdown input has some value
	$('#dropdownInput').val('');
}

$('#saveParameters').on('click', function(e){
	e.preventDefault()
	onSaveParameters()
})

function removeAttrDisable(){
	$.each($('.dropdown button'), function(key, val){
		$(val).removeAttr('disabled');
	});
}

function characterComparison(){
	var maxValue = $('input[name="savedMaxValue"]').val()
	var currentValue = $('#dropdownInput').val();
	var flag = false;
	var index = 1; //if current and max values are negative
	var count = 0;
	if(parseFloat(maxValue[0]) > 0 && parseFloat(currentValue[0]) > 0) index = 0; // if current and min values are positive
	
	for(index; index < currentValue.length; index++){
		// if any of numbers is more than previous munbers of min value, we disable all numbers
		if(currentValue[index] > maxValue[index]){
			flag = true;
			break;
		}
		//count how many numbers are equal to know if it is needed to disable some buttons
		if (currentValue[index] === maxValue[index]){
			count++;
		}
	}
	return {'flag': flag, 'count': count};
}

function checkCurrentValue(){
	$('#dropdownInput').removeClass('danger');
	removeAttrDisable($('input[name="savedMaxValue"]').val().length);

	var currentValue = $('#dropdownInput').val();
	var minValue = parseFloat($('input[name="savedMinValue"]').val());
	var maxValue = $('input[name="savedMaxValue"]').val();
	var maxValueLength = $('input[name="savedMaxValue"]').val().length;

	if(currentValue) {
		//check if current value not less than min value
		if((currentValue === '.' && minValue > 0) || (parseFloat(currentValue) < minValue)){
			$('#dropdownInput').addClass('danger');
		}
		
		//check if current value not more than max value
		//do this only if length of current value is 1 less than max value length and signs of current and max value are equal
		console.log(parseFloat(currentValue) > parseFloat(maxValue))
		if(((maxValue[0] === '-' && currentValue[0] === '-') || (parseFloat(maxValue[0]) > 0 && parseFloat(currentValue[0]) > 0)) 
			&& (currentValue.length == (maxValueLength -1))
			&& (maxValueLength > 1)){ //current value maybe negative
			result = characterComparison()

			if (result['flag']){ 
				$('.btn-warning').attr('disabled', 'disabled');
			} else if (result['count'] == currentValue.length) {
				var maxAllowedValue = maxValue[maxValueLength-1];
				$.each($('button'), function(){
					if(parseInt($(this).html()) > maxAllowedValue){
						$(this).attr('disabled','disabled');
					}
				});
			}
		} else if(parseFloat(currentValue) > parseFloat(maxValue)){
			$('#dropdownInput').addClass('danger');
		} 
	}
}

//dropdownInput
$(document).ready(function(){
	var position;
	//save caret position before button click
	$('#dropdownInput').on('focusout', function() {
		position = $('#dropdownInput')[0].selectionStart;
	});

	$('#dropdownInput').on('click', function(){
		if($('table').hasClass('d-none')){
			$('table').removeClass('d-none')
		}
		if($('input[name="savedAllowMinus"]').val() === 'false'){
			$('#sign').attr('disabled', 'disabled');
		}
	});

	$('#dropdownInput').change(checkCurrentValue());

	$('#dropdownInput').on('keyup keydown keypress', function(event) {
		var currentValue = $('#dropdownInput').val();
		var allowedArray = [
			8, //backspace
			46, //delete
			107, 187, //+
			109, 189, //-
			13, //enter
			110, 190, //.
			37, 39 //arrows,
		];

		//allows to enter only numbers and press buttons from allowedArray
		if (($.inArray(event.which, allowedArray) == -1) && (event.which < 96 || event.which > 105) && (event.which < 48 || event.which > 57) ) {
			return false;
		} else if(event.which == 109 || event.which == 189 && currentValue.length > 0) { //if "-" pressed
			if($('input[name="savedAllowMinus"]').val() === 'false') return false;
			if(currentValue.indexOf(event.key) != 0){
				currentValue = event.key+currentValue;
				$('#dropdownInput').val(currentValue);
			}
			return false;
		} else if(event.which == 107 || event.which == 187 && currentValue.length > 0) { //if "+" pressed
			if(currentValue.indexOf('-') === 0){
				currentValue = currentValue.slice(1);
				$('#dropdownInput').val(currentValue);
			}
			return false;
		} else if(event.which == 13 && (currentValue === '-' || currentValue === '.' || currentValue === '-.')) {
			$(this).addClass('danger');
		}

		checkCurrentValue();
	});

	//buttons actions
	$('.dropdown button').on('click', function(){
		var id = $(this).attr('id');
		var currentValue = $('#dropdownInput').val();
		var value = $(this).html();
		$('#dropdownInput').focus();
		switch(id) {
			case 'delete':  
				currentValue = currentValue.slice(0,position) + currentValue.slice(position+1);
				$('#dropdownInput').val(currentValue);
				checkCurrentValue();
				break;
			case 'clr':  
				$('#dropdownInput').val('');
				break;
			case 'cancel':  
				if(currentValue === '-' || currentValue === '.' || currentValue === '-.') {
					$('#dropdownInput').addClass('danger');
				} else {
					$('table').addClass('d-none');
				}
				break;
			case 'done':  
				if(currentValue === '-' || currentValue === '.' || currentValue === '-.') {
					$('#dropdownInput').addClass('danger');
				} else {
					$('table').addClass('d-none');
				}
				break;
			case 'sign':  
				if(currentValue.length === 0){
					$('#dropdownInput').val('-');
					position ++;
				} else if(currentValue.indexOf('-') === 0){
					currentValue = currentValue.slice(1);
					$('#dropdownInput').val(currentValue);
				} else {
					$('#dropdownInput').val('-'+currentValue);
					position++;
				}
				checkCurrentValue();
				break;
			case 'dot':
				if(currentValue.indexOf('.') == -1){
					currentValue = currentValue.slice(0,position) + '.' + currentValue.slice(position);
					$('#dropdownInput').val(currentValue);
					position++;
					checkCurrentValue();
				}
				break;
			default: 
				currentValue = currentValue.slice(0,position) + value + currentValue.slice(position);
				$('#dropdownInput').val(currentValue);
				position++;
				checkCurrentValue();
		}
		$('#dropdownInput')[0].setSelectionRange(position, position);
	});
});