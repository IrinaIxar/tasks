$(document).ready(function(){
	$('#myTab a').on('click', function (e) {
		$('#'+$(this).attr('aria-controls')).load('/templates/'+$(this).attr('alt')+'.html', function() {
			$.getScript( '/assets/js/'+$(this).attr('id')+'.js');
		});
		e.preventDefault();
		$(this).tab('show');
	});
})