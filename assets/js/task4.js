$(document).ready(function(){
	//validation initialization for range and original sum parameters
	$( '#parameters' ).validate({
		rules: {
			range: {
				required: true,
				digits: true
			},
			sum: {
				required: true,
				digits: true
			}
		},
		onkeyup: function(){
			$('#parameters').valid();
			if ($('#parameters').valid()){
				$('#saveParameters').removeAttr('disabled')
			}
		},
	   	onclick: function(){
			$('#parameters').valid();
			if ($('#parameters').valid()){
				$('#saveParameters').removeAttr('disabled');
			}
		}
	})

	//calculate current sum
	function calcSum() {
		let sum = 0
		$('input[name^="interimSum"]').each((ind, el)=>{
			sum+=parseInt($(el).val())
		})
		return sum
	}

	//calculate interim sums
	function calcInterimSums() {
		$('input[name="banknotesCount"]').each((ind, el)=>{
			let valueSum=parseInt($(el).val() ? $(el).val() : 0)*parseInt($(el).attr('id'))
			$('input[name="interimSum'+$(el).attr('id')+'"]').val(valueSum)	
		})
	}

	//calculate allowed range for original sum
	function minMaxSumCalc(){
		let x = Math.floor(parseInt($('#sum').val()) / parseInt($('#range').val()))
		let min = x*parseInt($('#range').val())
		let max = (x+1)*parseInt($('#range').val())
		return {min:min, max:max}
	}
	let range = minMaxSumCalc()

	// on change range or original sum parameters
	$('#saveParameters').on('click', () => {
		$('#range').val($('input[name="range"]').val())
		$('#sum').val($('input[name="sum"]').val())
		range = minMaxSumCalc()
		$('#saveParameters').attr('disabled', 'disabled')
	})

	// on press any changes in banknotes list
	$('input[name="banknotesCount"]').on('keyup keydown keypress', (event) => {
		//allows to enter only numbers and backspace
		if ((event.which !== 8) && (event.which < 96 || event.which > 105) && (event.which < 48 || event.which > 57) ) {
			return false;
		} else {
			calcInterimSums()
			let sum = calcSum()
			$('input[name="currentSum"]').val(sum)

			// disable or not cash in button
			if(sum>=range.min && sum<=range.max) {
				$('#cashIn').removeAttr('disabled')
			} else {
				$('#cashIn').attr('disabled', 'disabled')
			}
		}
	})
})