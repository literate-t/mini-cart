import getData from './api/getData.js';
import ProductList from './component/ProductList.js';
import { getElem } from './util.js';

const $productCardGrid = getElem('#product-card-grid');
const $openCartBtn = getElem('#open-cart-btn');
const $closeCartBtn = getElem('#close-cart-btn');
const $shoppingCart = getElem('#shopping-cart');
const $backDrop = getElem('#backdrop');

const productList = new ProductList($productCardGrid, []);

// translate-x-full: 장바구니 닫기 translate-x-0: 장바구니 열기
const openCartHandler = () => {
  $shoppingCart.classList.remove('translate-x-full');
  $shoppingCart.classList.add('translate-x-0');
  //$backDrop.hidden = !$backDrop.hidden;
  $backDrop.removeAttribute('hidden');
};

const closeCartHandler = () => {
  $shoppingCart.classList.remove('translate-x-0');
  $shoppingCart.classList.add('translate-x-full');
  //$backDrop.hidden = !$backDrop.hidden;
  $backDrop.setAttribute('hidden', '');
};

const backDropHandler = () => {
  closeCartHandler();
};

// const productCardGridHandler = (e) => {
//   const el = e.target.closest('[data-productid]');
//   if (!el) {
//     return;
//   }
//   openCartHandler();
// };

const fetchData = async () => {
  const result = await getData();
  productList.setState(result);
};

fetchData();

$openCartBtn.addEventListener('click', openCartHandler);
$closeCartBtn.addEventListener('click', closeCartHandler);
$backDrop.addEventListener('click', backDropHandler);
$productCardGrid.addEventListener('click', openCartHandler);
