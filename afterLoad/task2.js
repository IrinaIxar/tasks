//validation for parameters form

//rule to compare min and max values
$.validator.addMethod(
    'compare', 
    function(value, element) {
        return parseFloat($('#minValue').val()) < parseFloat($('#maxValue').val())
    },
    'Max value should be greater than min value'
);

//rule to check if allowMinus is checked, at least min value to be negative
$.validator.addMethod(
    'checkValue', 
    function(value, element) {
    	return parseFloat($('#minValue').val()) < 0
    },
    'At least min value should be negative'
);

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
	//save changes in list of attributes of input
	$('#dropdownInput').attr('min', $('#minValue').val());
	$('#dropdownInput').attr('max', $('#maxValue').val());
	$('#dropdownInput').attr('allowMinus', $('#allowMinus').prop('checked'));
}

$('#saveParameters').on('click', function(e){
	e.preventDefault()
	onSaveParameters()
})

//keyboard initialization
$(document).ready(function() {
	$.getScript( 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js');
	$('#dropdownInput').keyboard({
		layout : 'custom',
		customLayout: {
		  'default' : ['7 8 9 {del}', '4 5 6 {b}', '1 2 3 {clear}', '{sign} 0 . {a}'],
		},
		position: {
			of : null,
			my : 'center bottom',
			at : 'center bottom',
		}
	})
	.addTyping();
});