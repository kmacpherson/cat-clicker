/* jshint esversion:6 */
(function() {
  'use strict';

  var model = {
    currentCat:  null,
    catCompendium: [
      { name: 'Audrey',
        img:  'img/audrey.jpeg',
        clicks: 0
      },
      {
        name: 'Blossom',
        img:  'img/blossom.jpeg',
        clicks: 0
      },
      {
        name: 'Daisie',
        img:  'img/daisie.jpeg',
        clicks: 0
      },
      {
        name: 'Findlay',
        img:  'img/findlay.jpeg',
        clicks: 0
      },
      {
        name: 'Pauly',
        img:  'img/pauly.jpeg',
        clicks: 0
      }
    ]
  };

  let octopus = {
    init: function() {
      model.currentCat = model.catCompendium[0];
      viewMenu.init();
      viewCat.init();
    },
    getCurrentCat: function() {
      return model.currentCat;
    },
    getAllCats: function() {
      return model.catCompendium;
    },
    setCurrentCat: function(cat) {
      model.currentCat = cat;
    },
    incrementCatCounter: function() {
      model.currentCat.clicks++;
      viewCat.render();
    }
  };

  let viewMenu = {
    init: function() {
      this.menuArea = document.querySelector('.menu');
      this.render();
    },
    render: function() {
      let allCats = octopus.getAllCats();
      this.menuArea.innerHTML = '';
      for (let i = 0; i < allCats.length; i++) {
        let cat = this.buildCatItem(allCats[i]);
      }
    },
    buildCatItem: function(cat) {
      let frag = document.createDocumentFragment();
      let menuDiv = document.createElement('div');
      let catImg = document.createElement('img');
      catImg.src = cat.img;
      catImg.alt = cat.name;
      menuDiv.appendChild(catImg);
      catImg.addEventListener('click', (function(cat){
        return function() {
          octopus.setCurrentCat(cat);
          viewCat.render();
        };
      })(cat));
      frag.appendChild(menuDiv);
      this.menuArea.appendChild(frag);
    }
  };

  let viewCat = {
    init: function() {
      this.catView = document.querySelector('.catCarrier');
      this.render();
      this.catView.addEventListener('click', function(evt) {
        octopus.incrementCatCounter();
      });
    },
    render: function() {
      this.catView.innerHTML = '';
      this.buildCatView();
    },
    buildCatView: function() {
      let currentCat = octopus.getCurrentCat();
      let frag = document.createDocumentFragment();
      let catTitle = document.createElement('h1');
      catTitle.textContent = currentCat.name;
      frag.append(catTitle);
      let catClicks = document.createElement('h2');
      catClicks.textContent = 'Clicks: ' + currentCat.clicks;
      frag.append(catClicks);
      let catImg = document.createElement('img');
      catImg.src = currentCat.img;
      catImg.alt = currentCat.name;
      frag.append(catImg);
      this.catView.append(frag);
    }

  };

  octopus.init();

})();
