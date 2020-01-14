function ImageLoader() {
  // @param leftSideGalleryContainer tage where images will be loaded.
  // Ex: document.querySelector('.gallery')
  this.loadLeftSide = async function(leftSideGalleryContainer) {
    let leftSideImages = await fetch('https://picsum.photos/v2/list');
    let leftSideImagesParsed = await leftSideImages.json();

    leftSideImagesParsed.forEach(image => {
      let galleryImage = document.createElement('img');
      let bodyWidth = document.querySelector('body').offsetWidth
      let imgSrc

      bodyWidth > 500 
      ? imgSrc = 'https://picsum.photos/id/' + image.id + '/200'
      : imgSrc = 'https://picsum.photos/id/' + image.id + '/100'

      galleryImage.setAttribute('src', imgSrc);
      galleryImage.setAttribute('alt', 'gallery image')
      leftSideGalleryContainer.append(galleryImage);
    });
  };
}

// adds event without any action
function AddEvent () {}

// adds event action
function EventActions () {}

// creating event action
EventActions.prototype.enlargeImage = async function (selectedImage, imageContainer, selectedEmptyImg) {
  // check container size
  let divWidth = imageContainer.offsetWidth;
  let divHeight = imageContainer.offsetHeight;

  // getting selected image src
  let selectedImageSrc = selectedImage.src;
  let stringArray = selectedImageSrc.split('/');

  let urlInfo = 'https://picsum.photos/id/' + stringArray[4] + '/info';

  // getting data and adding above image
  let urlData = await fetch(urlInfo);
  let result = await urlData.json();
  
  // resizing image according to image from API
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

  selectedEmptyImg.src = 'https://picsum.photos/id/' + stringArray[4] + '/' + finalWidth + '/' + finalHeight;
  selectedEmptyImg.alt = 'enlarged image';
}

// end of event creating

AddEvent.prototype = Object.create(EventActions.prototype)

// creating event for selected elements (images)
// document.querySelectorAll('.enlarged-image img');
AddEvent.prototype.eventForImages = async function (selectedElements) {

  selectedElements.forEach(element => {
  element.addEventListener('click', () => {
    // @param element - image
    // @param .right-side - container for image scaling
    // selecting event from EventActions
    this.enlargeImage(element, document.querySelector('.right-side'), document.querySelector('.enlarged-image img'))
    })
  }
)}

ImageLoader.prototype = Object.create(AddEvent.prototype)

async function runAll () {
  let loadImages = new ImageLoader();
  await loadImages.loadLeftSide(document.querySelector('.gallery'));
  loadImages.eventForImages([...document.querySelectorAll('.gallery img')])
}

runAll()
