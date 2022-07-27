import getData from './api/getData.js';
import ProductList from './component/ProductList.js';
const $productCardGrid = document.getElementById('product-card-grid');
const productList = new ProductList($productCardGrid, []);

const fetchData = async () => {
  const result = await getData();
  productList.setState(result);
};

fetchData();
