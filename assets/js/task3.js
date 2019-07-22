class Arrays {
	constructor(sort, deleteDublicates, array1, array2) {
		this.sort = sort;
		this.deleteDublicates = deleteDublicates;

		//removes all that isn't number
		this.array1 = array1.split(' ').filter(Number);
		this.array2 = array2.split(' ').filter(Number);
	}

	parametersChange(sort, deleteDublicates) {
		this.sort = sort;
		this.deleteDublicates = deleteDublicates;
	}

	arraysChange(array1, array2) {
		this.array1 = array1.split(' ').filter(Number);
		this.array2 = array2.split(' ').filter(Number);
	}

	sorting() {
		//concat 2 arrays
		var array = [...this.array1, ...this.array2];

		//sorting array
		if(this.sort == 'ASC') {
			array.sort((a, b) => a - b);
		} else {
			array.sort((a, b) => b - a);
		}

		//if deleteDublicates is true
		if(this.deleteDublicates) {
			array = [...new Set(array)];
		}
		return array
	}

	show() {
		$('.result').html(this.sorting().join(' '))
	}
}


$(document).ready(function(){
	const params = [
		$('input[name="sortParameter"]:checked').val(),
		$('#deleteDublicates').prop('checked'),
		$('#firstArray').val(),
		$('#secondArray').val()
	];

	//Array object initialization
	var arrays = new Arrays(...params);
	arrays.show();

	//on change parameters
	$('#parameters').change(() => {
		arrays.parametersChange($('input[name="sortParameter"]:checked').val(), $('#deleteDublicates').prop('checked'));
		arrays.show();
	});

	// on change input values
	$('#arrays').on('keyup change paste', () => {
		$('#sort').removeAttr('disabled');
	});

	//on click button "Sort"
	$('#sort').on('click', () => {
		arrays.arraysChange($('#firstArray').val(), $('#secondArray').val());
		arrays.show();
		$('#sort').attr('disabled', 'disabled');
	})
})