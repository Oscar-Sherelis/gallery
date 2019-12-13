const enlargedImage = document.querySelector(".enlarged-image img");

const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
    addInfoAndImage(image);
  });
});

async function addInfoAndImage(clickedImage) {
    let divWidth = document.querySelector(".right-side").offsetWidth;
    let divHeight = document.querySelector(".right-side").offsetHeight;

    let selectedImage = clickedImage.src;
    let stringArray = selectedImage.split("/");
    urlInfo = "https://picsum.photos/id/" + stringArray[4] + "/info";

  // getting data and adding above image
  let test = await fetch(urlInfo);
  let result = await test.json();
  
  const info = document.querySelector("#info");
  info.innerHTML = "Author: " + result.author + " height: " + result.height + " width: " + result.width;
  textHeight = info.offsetHeight;

  // to leave enought space for text with any font-size
  result.height > result.width ? (divWidth = Math.floor(divHeight / 1.5), divHeight = divHeight - textHeight) : (divHeight = (Math.floor(divWidth / 1.5), divHeight = divHeight - textHeight))
  
  // stringArray[4] === id
  enlargedImage.src = "https://picsum.photos/id/" + stringArray[4] + "/" + divWidth + '/' + divHeight
  enlargedImage.alt = 'enlarged image'
}