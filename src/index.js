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
const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backDrop.hidden = !$backDrop.hidden;
};

const addItemToCart = (e) => {
  const el = e.target.closest('[data-productid]');
  if (el === null) {
    return;
  }

  const { productid } = el.dataset;
  const pickedItem = productData.find((product) => product.id == productid); // 둘이 타입이 다름
  cartList.addItem(pickedItem);

  toggleCart();
};

const modifyCart = (e) => {
  const id = parseInt(e.target.closest('li[id]').id); // e.target.closest('li').id
  switch (e.target.className) {
    case 'remove-btn':
      cartList.removeItem(id);
      return;
    case 'increase-btn':
      cartList.increaseItemCount(id);
      return;
    case 'decrease-btn':
      cartList.decreaseItemCount(id);
      return;
    default:
      return;
  }
  // if ('remove-btn' === e.target.className) {
  //   cartList.removeItem(id);
  // } else if ('increase-btn' === e.target.className) {
  //   cartList.increaseItemCount(id);
  // } else if ('decrease-btn' === e.target.className) {
  //   cartList.decreaseItemCount(id);
  // }
};

const fetchData = async () => {
  const result = await getData();
  productList.setState(result);
  productData = result;
};

fetchData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backDrop.addEventListener('click', toggleCart);
$productCardGrid.addEventListener('click', addItemToCart);
$cartList.addEventListener('click', modifyCart);
