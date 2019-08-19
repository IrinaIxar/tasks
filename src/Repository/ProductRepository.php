<?php
require_once '../../Entity/DoctrineEM.php';
require '../../Entity/Product.php';

class ProductRepository {
	protected $em;
	protected $productRepository;

	public function __construct() {
		$this->em = DoctrineEM::getInstance();
		$this->productRepository = $this->em->getRepository('Product');
	}

	/**
     * Products list
     *
     * @param string $field object field is sorted
     * @param string $order asc/desc sort
     * @return array products
     */ 
	public function findAll($field='price', $order='ASC') {
		return $this->productRepository->findBy(['deleted' => 0], [$field => $order]);
	}

	/**
     * Products list by criteria per page
     *
     * @param array $params params for search
     * @param string $page page number
     * @param string $countPerPage how many objects to show on single SQL request
     * @param string $field object property by which is sorted result array
     * @param string $order asc/desc order
     * @return array products
     */ 
	public function findBy($params=array(), $page='1', $countPerPage = '10', $field='price', $order='ASC') {
		$params['deleted'] = 0;
		return $this->productRepository->findBy($params, [$field => $order], $countPerPage, ($countPerPage*($page-1)));
	}

	/**
     * Product by id
     *
     * @param integer $id product identifier
     * @return Product
     */ 
	public function findById($id) {
		return $this->productRepository->findOneBy(['id' => $id]);
	}

	/**
     * Adds new product
     *
     * @param Product $product
     * @return string
     */ 
	public function add($product) {
		$this->em->persist($product);
		$this->em->flush();

		return $this->em->contains($product);
	}

	/**
     * Removes product by id
     *
     * @param integer $id
     * @return string
     */ 
	public function remove($id) {
		$product = $this->productRepository->findOneBy(['id' => $id]);
		if (!empty($product)) {
			$product->setDeleted(1);
			$this->em->flush();
			$result='deleted';
		} else {
			$result = 'Product was not found';
		}
		return $result;
	}

	/**
     * Updates product
     *
     * @param array $form
     */ 
	public function update($form) {
		$categoryRepository = $this->em->getRepository('Category');
		$category = $categoryRepository->find($form['category_id']);
		$product = $this->productRepository->findOneBy(['id' => $form['id']]);

		$product->setName($form['name']);
		$product->setPrice((float)$form['price']);
		$product->setCategory($category);
		$product->setCount((int)$form['count']);

		$this->em->flush();
	}
}