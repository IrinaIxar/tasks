const countPerPage = 10
function addProductRow(product, index) {
	$('#products tbody').append($('<tr id="'+product.id+'">')
		.append($('<td>').append(parseInt(index) +1))
		.append($('<td>').append(product.name))
		.append($('<td>').append(product.price))
		.append($('<td>').append(product.count))
		.append($('<td>').append(product.category.name))
		.append($('<td class="text-center">').append($('<i class="fa fa-pencil margin-right-10 cursor-pointer" aria-hidden="true">'))
											.append($('<i class="fa fa-trash cursor-pointer" aria-hidden="true">')))
	)
}

function addListener() {
	$('.fa-pencil').on('click', (event) => {
		let parent = $(event.target).parent()
		parent = $(parent).parent()
		window.location.href = window.location.origin+'/src/Product/Update.php/'+$(parent).attr('id')
	})

	$('.fa-trash').on('click', (event) => {
		if(confirm("Are you sure?")){
			let parent = $(event.target).parent()
			parent = $(parent).parent()
			$.ajax({
				type: 'GET',
				url: window.location.origin+'/src/Product/Delete.php/'+$(parent).attr('id'),
				dataType: 'json',
				success: (data) => {
					if (data.result === 'deleted') {
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
}

function addPagination() {
	$.ajax({
		type: 'GET',
		url: window.location.origin+'/src/Product/List.php',
		dataType: 'json',
		data: {'page':1, 'countPerPage':countPerPage},
		success: (data) => {
			let count = parseInt(data.productsCount)
			let page = 1
			if(count > 0) {
				if(countPerPage < count) {
					let pagesCount = Math.ceil(count/countPerPage)
					while (page<pagesCount) {
						let a = $('<a class="page-link" href="#"></a>').text((page+1))
						let li = $('<li class="page-item"></li>').html(a)
						$('#next').before(li)
						page++
					}
					//needed only when we have more than 1 page
					$('.page-link').on('click', (event) => {
						showProductList(parseInt($(event.target).text()))
						let parent = $(event.target).parent()
						$.each($('.page-item'), (index, element) => {
							$(element).removeClass('disabled')
						})
						$(parent).addClass('disabled')
					})
				}
			}			
		},
		error: (xhr, status, error) => {
			$('#products').html('No products list data')
		}
	})
}

function showProductList(page=1) {
	$.ajax({
		type: 'GET',
		url: window.location.origin+'/src/Product/List.php',
		dataType: 'json',
		data: {'page':page, 'countPerPage':countPerPage},
		success: (data) => {
			$('#products tbody').html('')
			if(parseInt(data.productsCount) > 0) {
				$.each(data.products, (index, element) => {
					addProductRow(element, index)
				})
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
	addPagination()
})