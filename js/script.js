require("regenerator-runtime/runtime");
require("core-js/stable");

function ImageLoader() {
  // @param leftSideGalleryContainer tage where images will be loaded.
  // Ex: document.querySelector('.gallery')
  this.loadLeftSide = async function(leftSideGalleryContainer) {
    let leftSideImages = await fetch('https://picsum.photos/v2/list');
    let leftSideImagesParsed = await leftSideImages.json();

    leftSideImagesParsed.forEach(image => {
      let galleryImage = document.createElement('img');
      let imgSrc = 'https://picsum.photos/id/' + image.id + '/200';
      galleryImage.setAttribute('src', imgSrc);
      leftSideGalleryContainer.append(galleryImage);
    });
  };
}
// https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
// https://ccoenraets.github.io/es6-tutorial/setup-babel/

let loadImages = new ImageLoader();
loadImages.loadLeftSide(document.querySelector('.gallery'));

const enlargedImage = document.querySelector('.enlarged-image img');

const images = document.querySelectorAll('.gallery img').forEach(image => {
  image.addEventListener('click', () => {
    addInfoAndImage(image);
  });
});

async function addInfoAndImage(clickedImage) {
  let leftSideImages = await fetch('https://picsum.photos/v2/list');
  let leftSideImagesParsed = await leftSideImages.json();
  leftSideImagesParsed.forEach(image => {
    console.log(image);
  });

  let divWidth = document.querySelector('.right-side').offsetWidth;
  let divHeight = document.querySelector('.right-side').offsetHeight;

  let selectedImage = clickedImage.src;
  let stringArray = selectedImage.split('/');
  let urlInfo = 'https://picsum.photos/id/' + stringArray[4] + '/info';

  // getting data and adding above image
  let test = await fetch(urlInfo);
  let result = await test.json();
  
  let finalHeight, finalWidth;

  if (result.width > result.height) {
    if (result.width > divWidth) {
      finalHeight = Math.floor((result.height * divWidth) / result.width);
      finalWidth = divWidth;
    }
  } else {
    if (result.height > divHeight) {
      finalWidth = Math.floor((result.width * divHeight) / result.height);
      finalHeight = divHeight;
    }
  }

  // stringArray[4] === id
  enlargedImage.src =
    'https://picsum.photos/id/' +
    stringArray[4] +
    '/' +
    finalWidth +
    '/' +
    finalHeight;
  enlargedImage.alt = 'enlarged image';
}
