import { creatElem, getElem } from '../util.js';

export default class CartList {
  constructor($target, initialData) {
    this.$target = $target;
    this.state = initialData;

    this.$container = creatElem('ul');
    this.$container.className = 'divide-y divide-gray-200';
    this.$totalCount = getElem('#total-count');
    this.totalCount = 0;

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

  addItem(item) {
    const newState = [...this.state, { ...item, count: 1 }];

    this.setState(newState);
  }

  render() {
    this.$totalCount.textContent = this.totalCount + '원';
    this.$container.innerHTML = this.state
      .map(
        (item) => `<li class="flex py-6" id="4">
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
                    <p class="ml-4">${item.price.toLocaleString()}원</p>
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
