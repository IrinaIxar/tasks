function setInfo(data){
	$('#cityInfo').removeClass('d-none');
	$('#area').html(data.area);
	$('#population').html(data.population);
	$('#history').html(data.history);
}
function clearData(children){
	$('#'+children).find('option').remove().end();
	$('#area').html('');
	$('#population').html('');
	$('#history').html('');
	$('#cityInfo').addClass('d-none');
}
function onSelectObject(parent='') {
	var parentVal = 0;
	var params = {};
	if (parent) {
		parentVal = $('#'+parent).val();
		children = $('#'+parent).attr('data-children');
		if(children == 'cityInfo'){
			params['id'] = parentVal;
			url = 'cities';
		} else {
			params[$('#'+parent).attr('data-id')] = parentVal;
			url = children;
		}
	} else {
		children = url = 'countries';
	}

	$.ajax({
		type: 'GET',
		url: window.location.origin+':3000/'+url,
		dataType: 'json',
		data: params,
		success: function (data) {
			clearData(children);
			if (children!='cityInfo' && data){
				var select = $('#'+children);
				select.append(new Option('-', 0));
				$.each(data, function(index, item) {
				  select.append(new Option(item.name, item.id));
				});
			} else {
				setInfo(data);
			}
		},
		error: function(){
			$('#errors').removeClass('d-none').html(children+' not found');
		}
	});
}

$(document).ready(function(){	
	$('select').change(function(){
		parent = $(this).attr('id');
		onSelectObject(parent);
	});
	onSelectObject();
})