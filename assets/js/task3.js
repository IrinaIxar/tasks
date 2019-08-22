$(document).ready(function(){
	//Array object initialization
	let arrayObject = new ArrayObject()
	arrayObject.pushItem($('#firstArray').val())
	arrayObject.pushItem($('#secondArray').val())
	let array = arrayObject.concat()
	$('.result').html(arrayObject.order(array).join(' '))

	//on change parameters
	$('#parameters').change(() => {
		arrayObject.sort = $('input[name="sortParameter"]:checked').val()
		arrayObject.deleteDublicates = $('#deleteDublicates').prop('checked')
		array = arrayObject.concat()
		array = arrayObject.removeDublicates(array)
		$('.result').html(arrayObject.order(array).join(' '))
	})

	// on change input values
	$('#arrays').on('keyup change paste', () => {
		$('#sort').removeAttr('disabled')
	});

	//on click button "Sort"
	$('#sort').on('click', () => {
		arrayObject.items = []
		arrayObject.pushItem($('#firstArray').val())
		arrayObject.pushItem($('#secondArray').val())
		//save current filter parameters
		arrayObject.sort = $('input[name="sortParameter"]:checked').val()
		arrayObject.deleteDublicates = $('#deleteDublicates').prop('checked')
		array = arrayObject.concat()
		array = arrayObject.removeDublicates(array)
		$('.result').html(arrayObject.order(array).join(' '))
		$('#sort').attr('disabled', 'disabled')
	})
})
