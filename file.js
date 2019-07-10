function setInfo(data){
	$("#cityInfo").removeClass("d-none");
	$("#area").html(data.area);
	$("#population").html(data.population);
	$("#history").html(data.history);
}
function clearData(children){
	$("#"+children).find('option').remove().end();
	$("#area").html('');
	$("#population").html('');
	$("#history").html('');
	$("#cityInfo").addClass("d-none");
}
function onSelectObject(parent='') {
	var parentVal = 0;
	if (parent) {
		parentVal = $("#"+parent).val();
		children = $('#'+parent).attr('data-children');
	} else {
		children = 'countries';
	}

	$.ajax({
		type: "POST",
		url: 'registersHandler.php',
		dataType: 'json',
		data: {functionname: children, id: parentVal},

		success: function (data) {
			clearData(children);
			if (children!='cityInfo' && data){
				var select = $('#'+children);
				select.append(new Option('-', 0));
				$.each(data, function(index, item) {
				  select.append(new Option(item.name, item.id));
				});
			} else if (children==='cityInfo' && data){
				setInfo(data);
			}
		},
		error: function(data){
			console.log('something with data');
		}
	});
}

function validateValues(){
	
}

function onSaveParameters(){
	//disable Save button
	$('#saveParameters').attr('disabled', 'disabled');
	//save changes in list of attributes of input
	$("#dropdownInput").attr('min', $("#minValue").val());
	$("#dropdownInput").attr('max', $("#maxValue").val());
	$("#dropdownInput").attr('allowMinus', $("#allowMinus").prop('checked'));
}