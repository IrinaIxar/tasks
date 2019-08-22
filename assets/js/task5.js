function addressToString(obj) {
	let addressString = ''
	$.each(obj, (index, value) => {
		addressString = addressString + value + ' '
	})
	return addressString
}

function addPersonRow(person){
	let address = addressToString(person.address)
	$('#personsList tbody').append($('<tr id="'+person.position+'">')
		.append($('<td title="position">').append(person.position))
		.append($('<td title="name">').append(person.name))
		.append($('<td title="age">').append(person.age))
		.append($('<td title="address">').append(address)
										 .append('<input type="hidden" name="country" value="'+person.address.country+'">')
										 .append('<input type="hidden" name="city" value="'+person.address.city+'">')
										 .append('<input type="hidden" name="street" value="'+person.address.street+'">')
										 .append('<input type="hidden" name="houseNumber" value="'+person.address.houseNumber+'">')
										 .append('<input type="hidden" name="apartmentNumber" value="'+person.address.apartmentNumber+'">'))
		.append($('<td title="phoneNumber">').append(person.phoneNumber))
		.append($('<td title="email">').append(person.email))
		.append($('<td title="delete">').append($('<i class="fa fa-trash" aria-hidden="true">')))
	)
}

function addListener() {
	$('.fa-trash').on('click', (event) => {
		let parent = $(event.target).parent()
		parent = $(parent).parent()
		$.ajax({
			type: 'GET',
			url: window.location.origin+'/person/delete/'+$(parent).find('td:first').html(),
			dataType: 'json',
			success: (data) => {
				listUpdate(data)
			},
			error: (xhr, status, error) => {
				$('#personList').html('No person list data')
			}
		})
		selectPositionUpdate()	
	})
}

function selectPositionUpdate(count) {
	$('select[name="position"]').html('')
	//append options in select position in create form
	$('select[name="position"]').append(new Option('Last', (count + 1)))
	for(let ind=1; ind<=parseInt(count); ind++){
		$('select[name="position"]').append(new Option(ind, ind))
	}
}

function listUpdate(data) {
	$('#personsList').removeClass('d-none')
	$('#personsList tbody').html('')
	let count = 0
	$.each(data, (index, item) => {
		addPersonRow(item)
		count = index
	})
	selectPositionUpdate((parseInt(count)+1))
	addListener()
}

function addPerson(){
	$.ajax({
		type: 'POST',
		url: window.location.origin+'/person/add',
		dataType: 'json',
		data: $('.addForm').serialize(),
		success: (data) => {
			listUpdate(data)
		},
		error: (xhr, status, error) => {
			$('#personList').html('No person list data')
		}
	})
}

function removePerson() {
	$.ajax({
		type: 'POST',
		url: window.location.origin+'/person/delete',
		dataType: 'json',
		data: $('.deleteForm').serialize(),
		success: (data) => {
			listUpdate(data)
		},
		error: (xhr, status, error) => {
			$('#personList').html('No person list data')
		}
	})
}

function personListShow(params={}) {
	$.ajax({
		type: 'GET',
		url: window.location.origin+'/person/list',
		dataType: 'json',
		data: params,
		success: (data) => {
			listUpdate(data)
		},
		error: (xhr, status, error) => {
			$('#personList').html('No person list data')
		}
	})
}

$(document).ready(()=>{
	//show persons list
	personListShow()

	/*
	 * Create new  Person block
	 */

	//on click create button to show form
	$('#create').on('click', () => {
		$('#addForm').toggle('slow')
	})

	//validation for create form
	$('.addForm').validate({
		rules: {
			name: {
				required: true
			},
			age: {
				required: true,
				digits: true
			},
			phoneNumber: {
				required: false,
				phoneNumber: true,
				minlength: 12,//+37369000000
				maxlength: 15 //+(373) 69447713
			},
			email: {
				required: false,
				email: true
			},
			country: {
				//if city, street, house number or apartment number is filled country becomes required
				required: () => {
					if($('input[name="city"]').val() || $('input[name="street"]').val() || $('input[name="houseNumber"]').val() || $('input[name="apartmentNumber"]').val()) return true
					return false
				}
			},
			city: {
				required: () => {
					if($('input[name="street"]').val() || $('input[name="houseNumber"]').val() || $('input[name="apartmentNumber"]').val()) return true
					return false
				}
			},
			street: {
				required: () => {
					if($('input[name="houseNumber"]').val() || $('input[name="apartmentNumber"]').val()) return true
					return false
				}
			},
			houseNumber: {
				required: () => {
					if($('input[name="apartmentNumber"]').val()) return true
					return false
				}
			},
			apartmentNumber : {
				required: false
			}
		},
		onkeyup: () => {
			$('.addForm').valid()
			if ($('.addForm').valid()){
				$('#add').removeAttr('disabled')
			}
		},
		submitHandler: (form, event) => {
			if ($('.addForm').valid()){
				addPerson()
				$('#add').attr('disabled', 'disabled')
			}
			$('.addForm')[0].reset()
			return false
		}
	})

	/*
	 * Sort block
	 */

	//sort persons by field
	$('.fa-sort').on('click', (event) => {
		let parent = $(event.target).parent()
		let params = {}
		let order = $(parent).attr('abbr')
		params['field'] = $(parent).attr('id')
		params['order'] = order
		$(parent).attr('abbr', order === 'asc' ? 'desc' : 'asc')
		personListShow(params)
	})

	/*
	 * Delete Person block
	 */

	//delete person block
	$('#delete').on('click', () => {
		$('#deleteForm').toggle('slow')
	})

	//validation initialization for delete form
	$('.deleteForm').validate({
		rules: {
			field: {
				required: true
			},
			strictComparison: {
				required: false
			},
			emptyValue: {
				required: false
			},
			string: {
				checkRangeValue: true,
				required: () => {
					if($('#strictComparison').prop('checked') || ($('select[name="field"]').val() === 'position')) return true
					return false
				}				
			},
			'range[min]': {
				digits: true,
				required: false,
				compare: true
			},
			'range[max]': {
				digits: true,
				required: false,
				compare: true
			}
		},
		onkeyup: () => {
			$('.deleteForm').valid()
			//button becomes active if at least one field is filled
			if ($('.deleteForm').valid() && (	$('#strictComparison').prop('checked') || 
												$('#emptyValue').prop('checked') || 
												$('input[name="string"]').val() !== '' ||
												$('input[name="range[min]"]').val() !== '' ||
												$('input[name="range[max]"]').val() !== '')){
				$('#remove').removeAttr('disabled')
			} else {
				$('#remove').attr('disabled', 'disabled')
			}
		},
		onclick: () => {
			if($('select[name="field"]').val() === 'position') {
				return false
			}
			if ($('.deleteForm').valid() && (	$('#strictComparison').prop('checked') || 
												$('#emptyValue').prop('checked') || 
												$('input[name="string"]').val() !== '' ||
												$('input[name="range[min]"]').val() !== '' ||
												$('input[name="range[max]"]').val() !== '')){
				$('#remove').removeAttr('disabled')
			} else {
				$('#remove').attr('disabled', 'disabled')
			}
		},
		submitHandler: (form, event) => {
			if(confirm("Are you sure?")){
				if ($('.deleteForm').valid() && ($('#strictComparison').prop('checked') || 
												$('#emptyValue').prop('checked') || 
												$('input[name="string"]').val() !== '' ||
												$('input[name="range[min]"]').val() !== '' ||
												$('input[name="range[max]"]').val() !== '')){
					removePerson()
					$('#remove').attr('disabled', 'disabled')
				} else {
					$('#remove').attr('disabled', 'disabled')
				}
				$('.deleteForm')[0].reset()
				//shows only "string" input for selected Position in Fields
				$.each($('.deleteForm input[type!="hidden"]'), (ind, el) => {
					let parent = $(el).parent()
					$(parent).addClass('d-none')
				})
				let parent = $('input[name="string"]').parent()
				$(parent).removeClass('d-none')
				return false
			}			
		}
	})

	//on select Field in delete form
	const fields={
		'position' : ['string'],
		'name' : ['string', 'strict'],
		'age' : ['range'],
		'country' : ['empty', 'string', 'strict'],
		'city' : ['empty', 'string'],
		'street' : ['empty', 'string', 'strict'],
		'houseNumber' : ['empty', 'range'],
		'apartmentNumber' : ['empty', 'range'],
		'phoneNumber' : ['empty', 'string', 'strict'],
		'email' : ['empty', 'string', 'strict']
	}

	$('select[name="field"]').on('change', () => {
		$("label.error").hide();
		$(".error").removeClass("error");
		$.each($('.deleteForm input'), (ind, el) => {
			$(el).val('')
			$(el).prop('checked', false)
			let parent = $(el).parent()
			$(parent).addClass('d-none')
		})
		let field = $('select[name="field"]').val()
		$.each(fields[field], (index, value) => {
			let parent = $('input[name^="'+value+'"]').parent()
			$(parent).removeClass('d-none')
		})
	})

	//shows only "isEmpty" field or "isStrict" and "string" fields
	$('#emptyValue').on('change', () => {
        if($('#emptyValue').prop('checked')) {
        	$('input[name="strictComparison"]').parent().addClass('d-none')
        	$('input[name="string"]').parent().addClass('d-none')
        } else if($.inArray('strict', fields[$('select[name="field"]').val()]) !== -1) {
        	$('input[name="strictComparison"]').parent().removeClass('d-none')
        	$('input[name="string"]').parent().removeClass('d-none')
        }
        $('#emptyValue').val($('#emptyValue').prop('checked'))
    })

    $('#strictComparison').on('change', () => {
        if($('#strictComparison').prop('checked')) {
        	$('input[name="emptyValue"]').parent().addClass('d-none')
        } else if ($('input[name="string"]').val() === '' && ($.inArray('empty', fields[$('select[name="field"]').val()]) !== -1)) {
        	$('input[name="emptyValue"]').parent().removeClass('d-none')
        }
        $('#strictComparison').val($('#strictComparison').prop('checked'))
    })

    $('input[name="string"]').on('keyup keydown keypress', () => {
        if($('input[name="string"]').val() !== '') {
        	$('input[name="emptyValue"]').parent().addClass('d-none')
        } else if ($.inArray('empty', fields[$('select[name="field"]').val()]) !== -1) {
        	$('input[name="emptyValue"]').parent().removeClass('d-none')
        }
    })
})