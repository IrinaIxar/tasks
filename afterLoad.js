$('#myTab a').on('click', function (e) {
	$('#'+$(this).attr('aria-controls')).load('views/'+$(this).attr('alt'));
	e.preventDefault();
	$(this).tab('show');
})