(function (DOM, document) {
  'use strict';

  /*
  Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
  salvando-os temporariamente na memória de um servidor.

  Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
  que possamos utilizar para salvar as informações dos nossos carros.

  Para utilizá-lo, você vai precisar fazer o seguinte:

  - Via terminal, acesse o diretório `server`;
  - execute o comando `npm install` para instalar as dependências;
  - execute `node app.js` para iniciar o servidor.

  Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
  `http://localhost:3000`

  O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
  As mudanças que você irá precisar fazer no seu projeto são:

  - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
  `http://localhost:3000/car`
  - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
  os seguintes campos:
    - `image` com a URL da imagem do carro;
    - `brandModel`, com a marca e modelo do carro;
    - `year`, com o ano do carro;
    - `plate`, com a placa do carro;
    - `color`, com a cor do carro.

  Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

  Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
  do pull request.
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
