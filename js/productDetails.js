
import Products from './database/Products.js';

// Initializing the Products module
const products = new Products();
console.log(products);


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('pid');
//const id = 'pid3'

var product =products.getProductById(id);
console.log(product);
const imgs = product.images.split(',');
console.log(imgs[0]);
let currentQuantity=1;

// var bodyContent = 

const imgDiv=document.getElementById('imgsContainer');
let imgBlock='';
imgBlock+=`<div class="d-flex align-items-center mb-3 side ">
<div class="smallImg">
<a data-fslightbox="mygalley" class=" mx-1 rounded-2" target="_blank" data-type="image" href="" class="item-thumb">
  <img id="img1" class="rounded-2 img" src="${imgs[1]}" />
</a>
<a data-fslightbox="mygalley" class=" mx-1 rounded-2" target="_blank" data-type="image" href="" class="item-thumb">
  <img id="img2" class="rounded-2 img" src="${imgs[2]}" />
</a>
<a data-fslightbox="mygalley" class=" mx-1 rounded-2" target="_blank" data-type="image" href="" class="item-thumb">
  <img id="img3" class="rounded-2 img" src="${imgs[3]}" />
</a>
</div>
</div>
      <div class="">
        <div class=" rounded-4 mb-3 d-flex justify-content-center">
            <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image" href="">
              <img id="img0" style="max-width: 100%; max-height: 100vh; margin: auto;"
               class="rounded-4 fit" src="${imgs[0]}" />
            </a>
          </div>
      </div>`
imgDiv.innerHTML=imgBlock;
const productDiv = document.getElementById('product-details');

const productBlock =` <h1 id="productName" class="title text-dark header">${product.productName}</h1>
<div class="d-flex flex-row my-3">
  <div class="text-warning mb-1 me-2">
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    
    <!-- <i class="fas fa-star-half-alt"></i>
    <i class="fa-solid fa-star-half-stroke"></i>
    <i class="fa-regular fa-star-half-stroke"></i> -->
    <span class="ms-1 rate">
    ${product.rating}
    </span>
  </div>
 
</div>
<div class="mb-3">
  <span class=" price">$</span>
  <span id="newPrice" class=" price">${product.price}</span>
  <span class=" oldPrice">$300</span>
  <span class=" discount" >
  <span >-</span>
  <span id="discountVal" >${product.discount}</span>
  <span >%</span>
</span>
</div>

<p id="descriptionContent" class="description">
${product.details}
</p>
<hr/>`
productDiv.innerHTML=productBlock;


  
   const innerTxtQuantity = document.getElementById('quantityDisplay').textContent;
   currentQuantity = parseInt(innerTxtQuantity, 10);


// Function to decrease quantity
function decreaseQuantity() {
  if (currentQuantity != 0) {
    return currentQuantity--;
  }else
  {
    console.log("Cannot decrease beyond zero.");
    return 0; 
  }
}

// Function to increase quantity
function increaseQuantity() {
  return currentQuantity++;
 
}

// Update the quantity display on the HTML page
function updateQuantityDisplay() {
  document.getElementById('quantityDisplay').textContent = currentQuantity;
}

// Function to handle decrease button click
function decrease() {
  currentQuantity.innerText = decreaseQuantity();
  updateQuantityDisplay();
}

// Function to handle increase button click
function increase() {
  currentQuantity.innerHTML = increaseQuantity();
  updateQuantityDisplay();
}
//###########################################################

       
        document.addEventListener('DOMContentLoaded', function () {
          console.log(product.price);
           // Get elements
           const addToCartButton = document.getElementById('addToCartBtn');
           const sizeButtons = document.querySelectorAll('.option');
        

          sizeButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // Get the clicked size from the button's text content
                const selectedSize = button.textContent;

                // Store the selected size in local storage
                localStorage.setItem('selectedSize', selectedSize);

                
                 updateSelectedSizeUI(selectedSize);
                console.log(selectedSize);
            });
        });
        // Function to update the UI based on the selected size 
    function updateSelectedSizeUI(selectedSize) {
      // Remove any existing 'selected' class from all size buttons
      sizeButtons.forEach(function (button) {
          button.classList.remove('selected');
      });

      // Add the 'selected' class to the clicked size button
      const selectedButton = document.getElementById(`${selectedSize.toLowerCase()}`);
      if (selectedButton) {
          selectedButton.classList.add('selected');
      }
  }
      
          // Add event listener to the "Add to Cart" button
          addToCartButton.addEventListener('click', function () {
              // Get selected options
               // Default to Medium if no size selected
              const selectedSize = localStorage.getItem('selectedSize') || 'Medium'; 
          
      
              // Create an object to represent the product
              const choosenProduct = {
                 id:id,
                  name: product.productName,
                  size: selectedSize,
                  price: product.price,
                  quantity: currentQuantity
              };
      
              // Get existing cart items from local storage
              let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
              cartItems.push(choosenProduct)
             // Save the updated cart items to local storage
              localStorage.setItem('cart', JSON.stringify(cartItems));
      
              // Alert the user that the product has been added to the cart (you can replace this with a better UI)
              alert('Product added to cart!');
          });
      });