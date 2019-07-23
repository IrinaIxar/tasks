class ArrayObject {
	constructor(sort='ASC', deleteDublicates=false) {
		this.sort = sort
		this.deleteDublicates = deleteDublicates
		this.items = []
	}

	/**
	 * Sets in items array string converted to array that contains only numbers
	 * @param {string} array
	 * @return {array} items
	 */
	pushItem(array) {
		this.items.push(array.split(' ').filter(Number))
	}

	/**
	 * Concat all arrays are setted in items
	 * @return {array} array
	 */
	concat() {
		let array=[]
		for (let index=0; index < this.items.length; index++) {
			array = [...array, ...this.items[index]]
		}
		return array
	}

	/**
	 * Delete dublicates in array
	 * @param {array} array
	 * @return {array} array
	 */
	removeDublicates(array) {
		if(this.deleteDublicates) {
			array = [...new Set(array)]
		}
		return array
	}

	/**
	 * Sort array
	 * @param {array} array
	 * @return {array} sorted array 
	 */
	order(array) {
		if(this.sort === 'ASC') {
			array.sort((a, b) => a - b)
		} else {
			array.sort((a, b) => b - a)
		}
		return array
	}
}


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
		array = arrayObject.concat()
		$('.result').html(arrayObject.order(array).join(' '))
		$('#sort').attr('disabled', 'disabled')
	})
})