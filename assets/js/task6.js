const countPerPage = 10
let paginationAdded = false
function addProductRow(product, index) {
	$('#products tbody').append($('<tr id="'+product.id+'">')
		.append($('<td>').append(parseInt(index) +1))
		.append($('<td>').append(product.name))
		.append($('<td>').append(product.price))
		.append($('<td>').append(product.count))
		.append($('<td>').append(product.category_name))
		.append($('<td class="text-center">').append($('<i class="fa fa-pencil margin-right-10 cursor-pointer" aria-hidden="true">'))
											.append($('<i class="fa fa-trash cursor-pointer" aria-hidden="true">')))
	)
}

function addListener() {
	$('.fa-pencil').on('click', (event) => {
		let parent = $(event.target).parent()
		parent = $(parent).parent()
		window.location.href = window.location.origin+'/src/Entity/ProductUpdate.php/'+$(parent).attr('id')
	})

	$('.fa-trash').on('click', (event) => {
		if(confirm("Are you sure?")){
			let parent = $(event.target).parent()
			parent = $(parent).parent()
			$.ajax({
				type: 'GET',
				url: window.location.origin+'/src/Entity/ProductDelete.php/'+$(parent).attr('id'),
				success: (data) => {
					data = JSON.parse(data)
					if (data.result === true) {
						$('#deleteResult').text('Product was deleted')
						showProductList()
					} else {
						$('#deleteResult').text(data.result)
					}
				},
				error: (xhr, status, error) => {
					$('#deleteResult').text('Product was not deleted')
				}
			})
		}	
	})

	$('.page-link').on('click', (event) => {
		showProductList(parseInt($(event.target).text()))
		let parent = $(event.target).parent()
		$.each($('.page-item'), (index, element) => {
			$(element).removeClass('disabled')
		})
		$(parent).addClass('disabled')
	})
}

function addPagination(count, page) {
	if(!paginationAdded) {
		if(page*countPerPage < count) {
			let a = $('<a class="page-link" href="#"></a>').text((page+1))
			let li = $('<li class="page-item"></li>').html(a)
			let pagesCount = Math.ceil(count/countPerPage)
			while (page<pagesCount) {
				$('#next').before(li)
				page++
			}
		}
		paginationAdded = true
	}	
}

function showProductList(page=1) {
	$.ajax({
		type: 'GET',
		url: window.location.origin+'/src/Entity/ProductsList.php',
		dataType: 'json',
		data: {'page':page, 'countPerPage':countPerPage},
		success: (data) => {
			$('#products tbody').html('')
			if(parseInt(data.productsCount) > 0) {
				$.each(data.products, (index, element) => {
					addProductRow(element, index)
				})
				addPagination(parseInt(data.productsCount), page)
				addListener()
			}			
		},
		error: (xhr, status, error) => {
			$('#products').html('No products list data')
		}
	})
}

$(document).ready(() => {
	showProductList()
})