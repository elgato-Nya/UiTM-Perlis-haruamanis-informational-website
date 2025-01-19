function displayCurrentDateTime() {
    new Date();
}

function updateClock() {
    const now = new Date();
    const secondsRatio = now.getSeconds() / 60;
    const minutesRatio = (secondsRatio + now.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + now.getHours()) / 12;

    setRotation(document.querySelector('[data-second-hand]'), secondsRatio);
    setRotation(document.querySelector('[data-minute-hand]'), minutesRatio);
    setRotation(document.querySelector('[data-hour-hand]'), hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.transform = `translateX(-50%) rotate(${rotationRatio * 360}deg)`;
}

const products = [
    {
        id: 1,
        name: "Harumanis Mango Juice",
        price: 20,
        image: "public/Harumanis-juice.png"
    },
    {
        id: 2,
        name: "Harumanis Mango",
        price: 40,
        image: "public/Harumanis.png"
    },
    {
        id: 3,
        name: "Harumanis Mango with Glutinous Rice",
        price: 25,
        image: "public/pulut-harumanis.png"
    }
];

const cart = [];

function addToCart(product) {
    cart.push(product);
    console.log(`${product.name} added to cart`);
    console.log('Current cart:', cart);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemName = document.createElement('p');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `RM${item.price}`;

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItemsContainer.appendChild(cartItem);

        total += item.price;
    });

    const grandTotal = document.getElementById('cart-total');
    grandTotal.textContent = `Total: RM${total}`;
}

function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.classList.toggle('hidden');
}

let currentIndex = 0;

function createShopSection() {
    const shopSection = document.getElementById('shop');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = `product-${product.id}`;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `RM${product.price}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';

        // JUST IN CASE THE CART DOESN'T WORK AGAIN. HERE'S THE REASON AND IDK WHY IT KEEP RESET
        addToCartButton.onclick = () => {
            const product = products[currentIndex];
            addToCart(product)
        };

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartButton);

        shopSection.appendChild(productCard);
    });

    const leftButton = document.createElement('button');
    leftButton.className = 'shop-button left';
    leftButton.textContent = '<';
    leftButton.onclick = () => slideShop(-1);

    const rightButton = document.createElement('button');
    rightButton.className = 'shop-button right';
    rightButton.textContent = '>';
    rightButton.onclick = () => slideShop(1);

    shopSection.appendChild(leftButton);
    shopSection.appendChild(rightButton);

    showProduct(currentIndex);
}


function showProduct(index) {
    products.forEach((product, i) => {
        const productCard = document.getElementById(`product-${product.id}`);
        if (i === index) {
            productCard.classList.add('show'); // Show current product
        } else {
            productCard.classList.remove('show'); // Hide other products
        }
    });
}

function slideShop(direction) {
    const currentProduct = document.querySelector('.product-card.show');
    currentProduct.classList.remove('show');
    
    if (direction === 1) {
        currentProduct.style.transform = 'translateX(-100%)';
    } else {
        currentProduct.style.transform = 'translateX(100%)';
    }

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = products.length - 1;
    if (currentIndex >= products.length) currentIndex = 0;

    const nextProduct = document.getElementById(`product-${products[currentIndex].id}`);
    nextProduct.classList.add('show');
    if (direction === 1) {
        nextProduct.style.transform = 'translateX(1000%)';
    } else {
        nextProduct.style.transform = 'translateX(-1000%)';
    }

    setTimeout(() => {
        nextProduct.style.transition = 'transform 750ms';
        nextProduct.style.transform = 'translateX(0%)';
    }, 50); // Small delay to ensure the transform is applied

    setTimeout(() => {
        currentProduct.style.transform = ''; // Reset transform
        nextProduct.style.transition = ''; // Reset transition
    }, 550); // Wait for the transition to complete
}

document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDateTime();
    setInterval(displayCurrentDateTime, 1000);
    setInterval(updateClock, 1000);
    updateClock();
    createShopSection();
    showProduct(0); // Ensure the first product is visible

    document.getElementById('cartButton').onclick = toggleCart;
    document.getElementById('closeCartButton').onclick = toggleCart;
});
