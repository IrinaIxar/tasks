<?php
require '../../vendor/doctrine/bootstrap.php';

$qb = $entityManager->createQueryBuilder();
$qb->from('Product', 'p')
	->select('c.name')
	->where('p.deleted = 0')
	->andWhere('c.deleted = 0')
	->addSelect('count(p.id) as count')
	->leftJoin('p.category', 'c')
	->groupby('c.id');

$categories = $qb->getQuery()->execute();

echo "
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		"; 
include('../../templates/includes/header.html'); 
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
			<table class='table table-bordered w-50'>
				<thead>
					<tr>
						<th class='align-middle'>Category name</th>
						<th class='text-center' width='25%'>Products count</th>
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

";

?>