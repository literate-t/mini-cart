import getData from './api/getData.js';
import ProductList from './component/ProductList.js';
import CartList from './component/CartList.js';
import { getElem } from './util.js';

const $productCardGrid = getElem('#product-card-grid');
const $openCartBtn = getElem('#open-cart-btn');
const $closeCartBtn = getElem('#close-cart-btn');
const $shoppingCart = getElem('#shopping-cart');
const $backDrop = getElem('#backdrop');
const $cartList = getElem('#cart-list');

let productData = [];

const productList = new ProductList($productCardGrid, []);
const cartList = new CartList($cartList, []);

// translate-x-full: 장바구니 닫기 translate-x-0: 장바구니 열기
const toggleCartHandler = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backDrop.hidden = !$backDrop.hidden;
};

const backDropHandler = () => {
  toggleCartHandler();
};

const addItemToCart = (e) => {
  const el = e.target.closest('[data-productid]');
  if (el === null) {
    return;
  }

  const { productid } = el.dataset;
  const pickedItem = productData.find((product) => product.id == productid); // 둘이 타입이 다름
  cartList.addItem(pickedItem);

  toggleCartHandler();
};

const removeItemFromCart = (e) => {
  if ('remove-btn' === e.target.className) {
    const $item = e.target.closest('li[id]'); // e.target.closest('li').id
    cartList.removeItem($item.id);
  }
};

const fetchData = async () => {
  const result = await getData();
  productList.setState(result);
  productData = result;
};

fetchData();

$openCartBtn.addEventListener('click', toggleCartHandler);
$closeCartBtn.addEventListener('click', toggleCartHandler);
$backDrop.addEventListener('click', backDropHandler);
$productCardGrid.addEventListener('click', addItemToCart);
$cartList.addEventListener('click', removeItemFromCart);
