(function(win, document ){
  'use strict';

  function DOM(elements){
    this.element = document.querySelectorAll(elements);
  };

  DOM.isArray = function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  DOM.isObject = function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  DOM.isFunction = function isFunction(obj){
    return Object.prototype.toString.call(obj) === '[object Function]'
  }

  DOM.isNumber = function isNumber(obj){
    return Object.prototype.toString.call(obj) === '[object Number]'
  }

  DOM.isString = function isString(obj){
    return Object.prototype.toString.call(obj) === '[object String]'
  }

  DOM.isBoolean = function isBoolean(obj){
    return Object.prototype.toString.call(obj) === '[object Boolean]'
  }

  DOM.isNull = function isNull(obj){
    return Object.prototype.toString.call(obj) === '[object Null]' || Object.prototype.toString.call(obj) === '[object Undefined]'
  };

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.element, function (element) {
      element.addEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, function (element) {
      element.removeEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.get = function get(){
    return this.element;
  };

  DOM.prototype.forEach = function forEach(){
    return Array.prototype.forEach.apply(this.element, arguments)
  };

  DOM.prototype.map = function map(){
    return Array.prototype.map.apply(this.element, arguments)
  };

  DOM.prototype.filter = function filter(){
    return Array.prototype.filter.apply(this.element, arguments)
  };

  DOM.prototype.reduce = function reduce(){
    return Array.prototype.reduce.apply(this.element, arguments)
  };

  DOM.prototype.reduceRight = function reduceRight(){
    return Array.prototyp.reduceRight.apply(this.element, arguments)
  };

  DOM.prototype.every = function every(){
    return Array.prototype.every.apply(this.element, arguments)
  };

  DOM.prototype.some = function some(){
    return Array.prototype.some.apply(this.element, arguments)
  };


  win.DOM = DOM;
}(window, document));
