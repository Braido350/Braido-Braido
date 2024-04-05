(function (DOM, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  function app() {
    var ajax = new XMLHttpRequest();
    var $companyName = new DOM('[data-js="company-name"]');
    var $companyPhone = new DOM('[data-js="company-phone"]');
    var $formRegister = new DOM('[data-js="from-register"]');
    var phoneElement = document.createElement('p');
    var nameElement = document.createElement('p');
    $formRegister.on('submit', newForm);

    function calJSON() {
      ajax.open('GET', 'company.json', true);
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange() {
      if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
        var response = JSON.parse(ajax.responseText);
        displayData(response);
      }
    }

    function displayData(dados) {
      nameElement.textContent = dados.name;
      phoneElement.textContent = dados.phone;
      $companyName.get()[0].appendChild(nameElement);
      $companyPhone.get()[0].appendChild(phoneElement);
    }

    function newForm(event) {
      event.preventDefault();
      var formData = getFormData();
      appendRowToTable(formData);
    }

    function getFormData() {
      return {
        imgCar: new DOM('[data-js="imgCar"]').get()[0].value,
        marca: new DOM('[data-js="marca"]').get()[0].value,
        ano: new DOM('[data-js="ano"]').get()[0].value,
        placa: new DOM('[data-js="placa"]').get()[0].value,
        cor: new DOM('[data-js="cor"]').get()[0].value
      };
    }

    function appendRowToTable(formData) {
      var newRow = createTableRow(formData);
      var tableBody = document.querySelector('table tbody');
      tableBody.appendChild(newRow);
    }

    function isImageURL(url) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = function() {
          resolve(true);
        };
        img.onerror = function() {
          resolve(false);
        };
        img.src = url;
      });
    }


    function createImageElement(url) {
      var img = document.createElement('img');
      img.src = url;
      img.alt = 'Imagem do carro';
      return img;
    }

    async function addImageOrText(cell, value) {
      var isImage = await isImageURL(value);
      if (isImage) {
        var imgElement = createImageElement(value);
        cell.appendChild(imgElement);
      } else {
        cell.textContent = value;
      }
    }

    function createTableRow(formData) {
      var newRow = document.createElement('tr');
      var imgCell = document.createElement('td');
      addImageOrText(imgCell, formData.imgCar);
      newRow.appendChild(imgCell);
      appendCellToRow(newRow, formData.marca);
      appendCellToRow(newRow, formData.ano);
      appendCellToRow(newRow, formData.placa);
      appendCellToRow(newRow, formData.cor);
      return newRow;
    }

    function appendCellToRow(row, value) {
      var cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    }

    calJSON();
}

document.addEventListener('DOMContentLoaded', function () {
  app();
});


})(window.DOM, document);
