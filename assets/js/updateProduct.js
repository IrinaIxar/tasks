$(document).ready(() => {
	//validation for update form
    $('#updateForm').validate({
        rules: {
            product_name: {
                required: true
            },
            product_count: {
                required: false,
                digits: true
            },
            product_price: {
                required: false,
                digits: true
            },
            category_id: {
                required: true
            }
        },
        onkeyup: () => {
            $('#updateForm').valid()
            if ($('#updateForm').valid()){
                $('#update').removeAttr('disabled')
            }
        },
        onclick: () => {
            $('#updateForm').valid()
            if ($('#updateForm').valid()){
                $('#update').removeAttr('disabled')
            }
        },
        submitHandler: (form, event) => {
            if ($('#updateForm').valid()){
                $.ajax({
                    type: 'POST',
                    data: $('#updateForm').serialize(),
                    success: (data) => {
                        window.location.hash = '#task6'
                        window.location.pathname='/'
                    },
                    error: (xhr, status, error) => {
                        $('#result').text('Product was not updated')
                        return false
                    }
                })
            }
        }
    })
})