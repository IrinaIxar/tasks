function addressToString(obj) {
	let addressString = ''
	$.each(obj, (index, value) => {
		addressString = addressString + value + ' '
	})
	return addressString
}

function addPersonRow(person, index=''){
	let address = addressToString(person.address)
	$('#personsList tbody').append($('<tr id="'+person.id+'">')
		.append($('<td title="position">').append(index === '' ? person.position : (parseInt(index)+1)))
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
		let params = {}
		params['method'] = 'remove'
		params['position'] = $(parent).find('td:first').html()
		personShowList(params)
		removeOneFromDB($(parent).attr('id'))
		updatePosition(params['position'], $(parent).attr('id'))
		selectPositionUpdate()	
	})
}

function selectPositionUpdate() {
	$('select[name="position"]').html('')
	let data = listPerson()
	//append options in select position in create form
	$('select[name="position"]').append(new Option('Last', (data.length + 1)))
	for(let ind=1; ind<=data.length; ind++){
		$('select[name="position"]').append(new Option(ind, ind))
	}
}

function getPersonList(){
	$.ajax({
		type: 'GET',
		url: window.location.origin+':3000/persons?_sort=position',
		dataType: 'json',
		success: (data) => {
			$('#personsList').removeClass('d-none')
			$.each(data, (index, item) => {
				addPersonRow(item)
			})
			selectPositionUpdate()
			addListener()
		},
		error: () => {
			$('#personList').html('No person list data')
		}
	})
}

function updatePosition(position, id='') {
	$.ajax({
		type: 'GET',
		url: window.location.origin+':3000/persons?position_gte='+position+((id==='') ? '' : '&id_ne='+id),
		dataType: 'json',
		success: (data) => {
			$.each(data, (index, item) => {
				if (id === '') { //for removing items
					item.position = parseInt(item.position)-1
				} else { //for added items
					item.position = parseInt(item.position)+1
				}				
				$.ajax({
					type: 'PUT',
					url: window.location.origin+':3000/persons/'+item.id,
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(item)
				})
			})
		}
	})
}

function updatePositionForList() {
	let list = listPerson()
	$.each(list, (index, item) => {
		delete item['delete']
		item['position'] = parseInt(item['position'])
		item['age'] = parseInt(item['age'])
		$.ajax({
			type: 'PUT',
			url: window.location.origin+':3000/persons/'+item.id,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(item)
		})
	})
}

function addPerson(){
	let formData = $('.addForm').serializeArray()
	let data = {}
	data['address'] = {}
	for (let index = 0; index <= formData.length - 1; index++) {
		if($.inArray(formData[index]['name'], ['country', 'city', 'street', 'houseNumber', 'apartmentNumber']) !== -1) {
			data['address'][formData[index]['name']] = formData[index]['value']
		} else {
			data[formData[index]['name']] = formData[index]['value']
		}
	}
	data['position'] = parseInt(data['position'])
	data['age'] = parseInt(data['age'])
	$.ajax({
		type: 'POST',
		url: window.location.origin+':3000/persons',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(data),
		success: (data) => {
			let list = listPerson()
			addPersonRow(data)
			addListener()
			if (data.position !== (list.length+1)) {
				let params = {}
				params['method'] = 'add'
				params['position'] = data.position
				personShowList(params)
				//update positions only when it is not on last position in array
				updatePosition(data.position, data.id)
			}
			selectPositionUpdate()		
		},
		error: () => {
			$('#errors').html('Somethig wrong');
		}
	})
}

function listPerson() {
	let list = []
	$.each($('#personsList tbody tr'), (index, element) => {
		let person = {}
		person['address'] = {}
		person['id'] = element.id
		$.each($(element).find('td'), (ind, el) => {
			if ($(el).attr('title') === 'address') {
				person['address']['country'] = $(element).find('input[name="country"]').val()
				person['address']['city'] = $(element).find('input[name="city"]').val()
				person['address']['street'] = $(element).find('input[name="street"]').val()
				person['address']['houseNumber'] = $(element).find('input[name="houseNumber"]').val()
				person['address']['apartmentNumber'] = $(element).find('input[name="apartmentNumber"]').val()
			} else {
				person[$(el).attr('title')] = $(el).text()
			}
		})
		list.push(person)
	})
	return list
}

function personShowList(params, method='') {
	params['list'] = listPerson()
	let list = []
	$.ajax({
		type: 'POST',
		url: window.location.origin+'/src/Controllers/PersonListHandler.php',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(params),
		success: (data) => {
			$('#personsList tbody').html('')
			$.each(data, (index, element) => {
				addPersonRow(element, method === 'remove' ? index : '')
				list.push(element.id)
			})
			addListener()
			if(method === 'remove') {
				//remove items that are not displayed
				removeFromDB(list)
			}
		},
		error: (xhr, status, error) => {
			$('#personList').html('No person list data')
		}
	})
}

function removePerson() {
	let params = {}
	params['form'] = $('.deleteForm').serializeArray()
	params['method'] = 'remove'
	personShowList(params, 'remove')
	selectPositionUpdate()
}

function removeFromDB(ids) {
	let list = listPerson()
	$.each(list, (index, item) => {
		if($.inArray(item['id'], ids) !== -1) {
			$.ajax({
				type: 'DELETE',
				url: window.location.origin+':3000/persons/'+item.id
			})
		}
	})
	updatePositionForList()
}

function removeOneFromDB(id) {
	$.ajax({
		type: 'DELETE',
		url: window.location.origin+':3000/persons/'+id
	})
}

$(document).ready(()=>{
	//show persons list
	getPersonList()

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
		params['method'] = 'order'
		params['field'] = $(parent).attr('id')
		params['order'] = order
		$(parent).attr('abbr', order === 'asc' ? 'desc' : 'asc')
		personShowList(params)
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