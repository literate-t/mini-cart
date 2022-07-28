import { creatElem, getElem } from '../util.js';

const MAX_COUNT = 10;
const MIN_COUNT = 10;

export default class CartList {
  constructor($target, initialData) {
    this.$target = $target;
    this.state = initialData;

    this.$container = creatElem('ul');
    this.$container.className = 'divide-y divide-gray-200';
    this.$totalCount = getElem('#total-count');
    this.totalCount = 0;
    this.maxCount = 10;
    this.minCount = 1;

    this.$target.append(this.$container);

    this.render();
  }

  calculateTotalPrice() {
    this.totalCount = this.state
      .reduce((acc, cur) => acc + cur.price * cur.count, 0)
      .toLocaleString();
  }

  setState(newState) {
    this.state = newState;

    this.calculateTotalPrice();

    this.render();
  }

  addItem(newItem) {
    let newState;

    const index = this.isDupicated(newItem);

    if (index === -1) {
      newState = [...this.state, { ...newItem, count: 1 }];
    } else {
      newState = [...this.state];
      newState[index].count += 1;
    }

    this.setState(newState);
  }

  isDupicated(newItem) {
    const index = this.state.findIndex((item) => item.id === newItem.id);

    return index;
  }

  removeItem(id) {
    const newState = this.state.filter((item) => item.id !== id);

    this.setState(newState);
  }

  increaseItemCount(id) {
    const newState = [...this.state];

    const selectedIndex = this.state.findIndex((item) => item.id === id);

    if (newState[selectedIndex].count < MAX_COUNT) {
      newState[selectedIndex].count += 1;
    } else {
      alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
    }

    this.setState(newState);
  }

  decreaseItemCount(id) {
    const newState = [...this.state];

    const selectedIndex = this.state.findIndex((item) => item.id === id);

    if (MIN_COUNT < newState[selectedIndex].count) {
      newState[selectedIndex].count -= 1;
    } else {
      alert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
    }

    this.setState(newState);
  }

  render() {
    this.$totalCount.textContent = this.totalCount + '원';
    this.$container.innerHTML = this.state
      .map(
        (item) => `<li class="flex py-6" id=${item.id}>
              <div
                class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
              >
                <img
                  src=${item.imgSrc}
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div
                    class="flex justify-between text-base font-medium text-gray-900"
                  >
                    <h3>${item.name}</h3>
                    <p class="ml-4">${(
                      item.count * item.price
                    ).toLocaleString()}원</p>
                  </div>
                </div>
                <div class="flex flex-1 items-end justify-between">
                  <div class="flex text-gray-500">
                    <button class="decrease-btn">-</button>
                    <div class="mx-2 font-bold">${item.count}개</div>
                    <button class="increase-btn">+</button>
                  </div>
                  <button
                    type="button"
                    class="font-medium text-sky-400 hover:text-sky-500"
                  >
                    <p class="remove-btn">삭제하기</p>
                  </button>
                </div>
              </div>
            </li>`
      )
      .join('');
  }
}
