const countPerPage = 10 // task6

/* task3 */
class ArrayObject {
    constructor(sort='ASC', deleteDublicates=false) {
        this.sort = sort
        this.deleteDublicates = deleteDublicates
        this.items = []
    }

    /**
     * Sets in items array string converted to array that contains only numbers
     * @param {string} array
     * @return {array} items
     */
    pushItem(array) {
        this.items.push(array.split(' ').filter(Number))
    }

    /**
     * Concat all arrays are setted in items
     * @return {array} array
     */
    concat() {
        let array=[]
        for (let index=0; index < this.items.length; index++) {
            array = [...array, ...this.items[index]]
        }
        return array
    }

    /**
     * Delete dublicates in array
     * @param {array} array
     * @return {array} array
     */
    removeDublicates(array) {
        if(this.deleteDublicates) {
            array = [...new Set(array)]
        }
        return array
    }

    /**
     * Sort array
     * @param {array} array
     * @return {array} sorted array 
     */
    order(array) {
        if(this.sort === 'ASC') {
            array.sort((a, b) => a - b)
        } else {
            array.sort((a, b) => b - a)
        }
        return array
    }
}

//rule to compare min and max values
$.validator.addMethod(
    'compare', 
    (value, element) => {
        if($('#minValue').val() !== '' && $('#maxValue').val() !== '') {
            return parseFloat($('#minValue').val()) < parseFloat($('#maxValue').val())
        }
    	return true
    },
    'Max value should be greater than min value'
)

//rule to check if allowMinus is checked, at least min value to be negative
$.validator.addMethod(
    'checkValue', 
    (value, element) => {
    	return parseFloat($('#minValue').val()) < 0
    },
    'At least min value should be negative'
)

//rule to check if entered string is phone number format string
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

//rule to check if allowMinus is checked, at least min value to be negative
$.validator.addMethod(
    'checkRangeValue', 
    (value, element) => {
    	if ($('select[name="field"]').val() === 'numberValue'){
    		if (parseInt(value) > parseInt($('#personsList tbody tr:first').find('td:first').text()) && parseInt(value) < parseInt($('#personsList tbody tr:last').find('td:first').text())) {
    			return true
    		} else {
    			return false
    		}
    	} else {
    		return true
    	}
    	
    },
    'Please enter number corresponding first column in the table'
);

$(document).ready(function(){
	$('#myTab a').on('click', function (e) {
		$('#'+$(this).attr('aria-controls')).load('/templates/'+$(this).attr('alt')+'.html', function() {
			$.getScript( '/assets/js/'+$(this).attr('id')+'.js');
		});
		e.preventDefault();
		$(this).tab('show');
	});

    if(window.location.hash) {
        $('#myTab a[href="'+window.location.hash+'"]').click()
    }
})