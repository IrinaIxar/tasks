function showCategoryList(params={}) {
	$.ajax({
		type: 'GET',
		url: window.location.origin+'/src/views/Category/List.php',
		dataType: 'json',
		data: params,
		success: (data) => {
			$('#categories tbody').html('')
			if(data.length > 0) {
				$.each(data, (index, element) => {
					addCategoryRow(element)
				})
			}			
		},
		error: (xhr, status, error) => {
			$('#categories').html('No categories list data')
		}
	})
}

$(document).ready(() => {
	//on sort buttons click
	$('.fa-sort').on('click', (event) => {
		let parent = $(event.target).parent()
		let order = $(parent).attr('abbr')
        window.location='/src/views/Category/List.php?sort='+$(parent).attr('id')+'&order='+order
	})
})