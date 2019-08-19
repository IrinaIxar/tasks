<?php
require '../../Repository/CategoryRepository.php';

$categoryRepository = new CategoryRepository();
$categories = $categoryRepository->findAllProductCount($_GET['sort'], $_GET['order']);

echo "
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		"; 
include('../../../templates/includes/header.html'); 
echo " 
		<title>Category list</title>
	</head>
	<body>
		<div class='container'>
			<nav aria-label='breadcrumb'>
				<ol class='breadcrumb'>
					<li class='breadcrumb-item'><a href='/'>Home</a></li>
					<li class='breadcrumb-item'><a href='/#task6'>Product list</a></li>
					<li class='breadcrumb-item active' aria-current='page'>Category list</li>
				</ol>
			</nav>
			<table class='table table-bordered w-50' id='categories'>
				<thead>
					<tr>
						<th class='align-middle' id='name' abbr='".($_GET['sort'] === 'name' ? ($_GET['order'] === 'asc' ? 'desc' : 'asc') : 'asc')."'>Category name <i class='fa fa-fw fa-sort'></i></th>
						<th class='text-center' width='25%' id='count' abbr='".($_GET['sort'] === 'count' ? ($_GET['order'] === 'asc' ? 'desc' : 'asc') : 'asc')."'>Products count <i class='fa fa-fw fa-sort'></i></th>
					</tr>
				</thead>
				<tbody>";
					if(!empty($categories)) {
						foreach ($categories as $category) {
							echo "
						<tr>
							<td>".$category['name']."</td>
							<td class='text-center' width='25%'>".$category['count']."</td>
						</tr>";
						}
					}
		echo "	</tbody>
			</table>
		</div>
	</body>
</html>
<script src='/assets/js/Category/list.js'></script>
";

?>