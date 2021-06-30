import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('.dinoIpsum').submit(e => {
    e.preventDefault();
    const numPar = parseInt($('#numPar').val());
    const numWordsPar = parseInt($('#wordPar').val());

    let promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const url = `http://dinoipsum.herokuapp.com/api/?format=json`;

      request.onload = () => {
        if (this) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open('GET', url, true);
      request.send();
    });

    promise.then(response => {
      const dinoResponse = JSON.parse(response);
      let ipsum = [];
      let parArr = [];

      let dinoAll = dinoResponse.flat();
      console.log('dinoAll', dinoAll);


      for (let i = 1; i <= numPar; i++) {
        let par = [];
        parArr.push(par);
      }
      console.log('parArr', parArr);

      for(let i = 0; i < parArr.length; i++) {
        for (let j = 0; j <= numWordsPar; j++) {
          let dinoIdx = Math.floor(Math.random()* 299);
          console.log('dino idx', dinoIdx);
          console.log('dinoall idx', dinoAll[dinoIdx]);
          parArr[i].push(dinoAll[dinoIdx]);
        }
        
      }
      console.log('after pushing words', parArr);

      let dinoStr ='';
      for (let par of parArr) {
        let str = par.join(' ');
        dinoStr += `<p>${str}.</p>`;
      }
      console.log('dinoStr', dinoStr);
      console.log('ipsum', ipsum);
      console.log('dinoResponse', dinoResponse);
      console.log('numPar', numPar);
      console.log('numWordsPar', numWordsPar);
      $('.output').html(`${dinoStr}`);
    });
  });
});