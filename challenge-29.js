(function (DOM, document) {
  'use strict';

  /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.

  Ao clicar nesse botão, a linha da tabela deve ser removida.

  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.

  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
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
      buttonRemoveCar(newRow)
      return newRow;
    }

    function appendCellToRow(row, value) {
      var cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    }

    function buttonRemoveCar(row){
      var remove = document.createElement('button')
      remove.textContent = 'remove';
      remove.addEventListener('click', function() {
        row.remove();
      });
      row.appendChild(remove);
    } 
   

    calJSON();
}

document.addEventListener('DOMContentLoaded', function () {
  app();
});


})(window.DOM, document);
