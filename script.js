let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
        if(products.length > 0)
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;  //dataset set custom data attribute called id on the newProduct
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })

const addToCart = (product_id) => {
    let positionProductCart = cart.findIndex(item => item.product_id == product_id);
    if (positionProductCart === -1) {
        cart.push({ product_id, quantity: 1 });
    } else {
        cart[positionProductCart].quantity++;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}


listCartHTML.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('minus') || target.classList.contains('plus')) {
        const productId = target.parentElement.parentElement.dataset.id;
        const type = target.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(productId, type);
    }
});

function changeQuantityCart(productId, type) {
    const index = cart.findIndex(item => item.product_id == productId);
    if (index >= 0) {
        switch (type) {
            case 'plus':
                cart[index].quantity++;
                break;
            default:
                const changeQuantity = cart[index].quantity - 1;
                if (changeQuantity > 0) {
                    cart[index].quantity = changeQuantity;
                } else {
                    cart.splice(index, 1);
                }
                break;
        }
        addCartToHTML();
        addCartToMemory();
    }
}

// Function to calculate total price of the cart
const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
        let product = products.find(p => p.id === item.product_id);
        if (product) {
            totalPrice += product.price * item.quantity;
        }
    });
    return totalPrice;
}

// Function to update the total price on the webpage
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector('.totalPrice'); // Assuming you have an element with class 'totalPrice' to display the total price
    if (totalPriceElement) {
        const totalPrice = calculateTotalPrice();
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Display total price with two decimal places
    }
}

// Call the updateTotalPrice function initially and whenever cart changes
updateTotalPrice();



const getData = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
getData();