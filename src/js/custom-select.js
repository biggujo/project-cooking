export class CustomSelect {
    static EL = 'itc-select';
    static EL_SHOW = 'itc-select_show';
    static EL_OPTION = 'itc-select__option';
    static EL_OPTION_SELECTED = 'itc-select__option_selected';
    static DATA = '[data-select]';
    static DATA_TOGGLE = '[data-select="toggle"]';
    static INPUT = '.dropdown__input-hidden';
  
    static hideOpenSelect() {
      document.addEventListener('click', (e) => {
        if (!e.target.closest(`.${this.EL}`)) {
          const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
          elsActive.forEach((el) => {
            el.classList.remove(this.EL_SHOW);
          });
        }
      });
    }
    static create(target, params) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      if (this._el) {
        return new this(target, params);
      }
      return null;
    }
    constructor(target, params) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      this._params = params || {};
      this._onClickFn = this._onClick.bind(this);
      if (this._params.options) {
        this._el.innerHTML = this.constructor.template(this._params);
        this._el.classList.add(this.constructor.EL);
      }
      this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
      this._el.addEventListener('click', this._onClickFn);
    }
  
    _onClick(e) {
      const { target } = e;
      const type = target.closest(this.constructor.DATA).dataset.select;
      if (type === 'toggle') {
        this.toggle();
      } else if (type === 'option') {
        this._changeValue(target);
      }
    }
  
    _updateOption(el) {
      const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
      const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
      const elInput = this._el.querySelector(this.constructor.INPUT);
      if (elOptionSel) {
        elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }
      elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
      this._elToggle.textContent = elOption.textContent;
      this._elToggle.style.color = '#050505';
      elInput.value=this._elToggle.textContent;
      this._elToggle.value = elOption.dataset.value;
      this._elToggle.dataset.index = elOption.dataset.index;
      this._el.dispatchEvent(new CustomEvent('itc.select.change'));
      this._params.onSelected ? this._params.onSelected(this, elOption) : null;
      return elOption.dataset.value;
    }
  
    _reset() {
      const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
      if (selected) {
        selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }
      this._elToggle.textContent = 'Выберите из списка';
      this._elToggle.value = '';
      this._elToggle.dataset.index = '-1';
      this._el.dispatchEvent(new CustomEvent('itc.select.change'));
      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return '';
    }
  
    _changeValue(el) {
      if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
        return;
      }
      this._updateOption(el);
      this.hide();
      console.log(this._elToggle.textContent);
    }
    show() {
      document.querySelectorAll(this.constructor.EL_SHOW)
        .forEach((el) => {
          el.classList.remove(this.constructor.EL_SHOW);
        });
      this._el.classList.add(`${this.constructor.EL_SHOW}`);
    }
  
    hide() {
      this._el.classList.remove(this.constructor.EL_SHOW);
    }
  
    toggle() {
      this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
    }
  
    dispose() {
      this._el.removeEventListener('click', this._onClickFn);
    }
  
    get value() {
      return this._elToggle.value;
    }
  
    set value(value) {
      let isExists = false;
      this._el.querySelectorAll('.select__option')
        .forEach((option) => {
          if (option.dataset.value === value) {
            isExists = true;
            this._updateOption(option);
          }
        });
      if (!isExists) {
        this._reset();
      }
    }
  
    get selectedIndex() {
      return this._elToggle.dataset.index;
    }
  
    set selectedIndex(index) {
      const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
      if (option) {
        this._updateOption(option);
      }
      this._reset();
    }
  }
  
  CustomSelect.hideOpenSelect();
  