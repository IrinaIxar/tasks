$.validator.addMethod(
    'phoneNumber', 
    ( value, element ) => {
    	if(value){
		    let re = new RegExp(/[+]?[(]?\d{3}[)]?[\s]?\d{8}/)
		    return re.test(value)
		}
		return true
	},
	'Incorrect phone number'
)

function addressToString(obj) {
	let addressString = ''
	$.each(obj, (index, value) => {
		addressString = addressString + value + ' '
	})
	return addressString
}

function addPersonRow(person){
	let address = addressToString(person.address)
	let div = '<tr><td title="name">'+person.name+'</td><td title="age">'+person.age+'</td><td title="address"><input type="hidden" name="country" value="'+person.address.country+'"><input type="hidden" name="city" value="'+person.address.city+'"><input type="hidden" name="street" value="'+person.address.street+'"><input type="hidden" name="houseNumber" value="'+person.address.houseNumber+'"><input type="hidden" name="apartmentNumber" value="'+person.address.apartmentNumber+'">'+address+'</td><td title="phoneNumber">'+person.phoneNumber+'</td><td title="email">'+person.email+'</td></tr>'
	$('#personsList tbody').append(div)
}

function getPersonList(){
	$.ajax({
		type: 'GET',
		url: window.location.origin+':3000/persons',
		dataType: 'json',
		success: (data) => {
			$('#personsList').removeClass('d-none')
			$.each(data, (index, item) => {
				addPersonRow(item)
			})
		},
		error: () => {
			$('#personList').html('No person list data')
		}
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
	$.ajax({
		type: 'POST',
		url: window.location.origin+':3000/persons',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(data),
		success: (data) => {
			addPersonRow(data)
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
		$.each($(element).find('td'), (ind, el) => {
			if ($(el).attr('title') === 'address') {
				person['address']['country'] = $(element).find('input[name="country"]').val()
				person['address']['city'] = $(element).find('input[name="city"]').val()
				person['address']['street'] = $(element).find('input[name="street"]').val()
				person['address']['houseNumber'] = $(element).find('input[name="houseNumber"]').val()
				person['address']['apartmentNumber'] = $(element).find('input[name="apartmentNumber"]').val()
			} else {
				person[$(el).attr('title')] = $(el).html()
			}
		})
		list.push(person)
	})
	return list
}

function personShowList(params) {
	$.ajax({
		type: 'POST',
		url: window.location.origin+'/src/Controllers/PersonListHandler.php',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(params),
		success: (data) => {
			$('#personsList tbody').html('')
			$.each(data, (index, element) => {
				addPersonRow(element)
			})
		},
		error: () => {
			$('#personList').html('No person list data')
		}
	})
}

$(document).ready(()=>{
	getPersonList()

	$('#create').on('click', () => {
		$('#addForm').toggle('slow')
	})

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

	$('.fa-sort').on('click', (event) => {
		let parent = $(event.target).parent()
		let params = {}
		let order = $(parent).attr('abbr')
		params['method'] = 'order'
		params['field'] = $(parent).attr('id')
		params['order'] = order
		params['list'] = listPerson()
		$(parent).attr('abbr', order === 'asc' ? 'desc' : 'asc')
		personShowList(params)
	})
})