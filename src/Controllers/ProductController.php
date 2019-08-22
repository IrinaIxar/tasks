<?php
require '../src/Repository/ProductRepository.php';
require '../src/Repository/CategoryRepository.php';

class ProductController extends Controller {
	/**
     * Products list
     *
     * @param string $sort object field is sorted
     * @param string $order asc/desc sort
     * @return string
     */ 
	public function list($page='1', $countPerPage='10', $sort='price', $order='ASC') {
		$productRepository = new ProductRepository();
		echo json_encode([	'products'=>$productRepository->findBy([], $page, $countPerPage, $sort, $order), 
							'productsCount' => count($productRepository->findAll()),
							'sort' => $sort,
							'order' => $order]);
	}

	/**
     * Create product
     *
     * @return mixed string|view 
     */ 
	public function add() {
		$categoryRepository = new CategoryRepository();

		if(isset($_POST['category_id'])) {
			$category = $categoryRepository->findById($_POST['category_id']);
			$product = new Product();
			$product->setName($_POST['name']);
			$product->setPrice((float)$_POST['price']);
			$product->setCategory($category);
			$product->setCount((int)$_POST['count']);

			$productRepository = new ProductRepository();
			$result = $productRepository->add($product);
			echo json_encode(['result' => $result]);
		} else {
			$categories = $categoryRepository->findAll();
			return $this->render('Product/add.html', ['categories' => $categories], false);
		}		
	}

	/**
     * Product by id
     *
     * @param integer $id product identifier
     * @return view of update page
     */ 
	public function update($id) {
		$productRepository = new ProductRepository();
		$product = $productRepository->findById($id);
		$categoryRepository = new CategoryRepository();

		if(!empty($_POST) && isset($product)){
			$_POST['id'] = $id;
			$productRepository->update($_POST);
		} else {
			$categories = $categoryRepository->findAll();
		}

		return $this->render('Product/update.html', ['product' => $product, 'categories' => $categories], false);
	}

	/**
     * Removes product
     *
     * @param integer $id
     * @return string
     */ 
	public function delete($id) {
		$productRepository = new ProductRepository();
		$result = $productRepository->remove($id);

		echo json_encode(['result' => $result]);
	}
}