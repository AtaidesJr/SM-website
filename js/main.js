let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Camisa Burberry',
        tag: 'burberry',
        price: 50,
        inCart:0
    },
    {
        name: 'Camisa Gucci',
        tag: 'gucci',
        price: 45,
        inCart:0
    },
    {
        name: 'Camisa Balmain',
        tag: 'balmain',
        price: 40,
        inCart:0
    },
    {
        name: 'Camisa Lost',
        tag: 'lost',
        price: 35,
        inCart:0
    },
    {
        name: 'Camisa MCD',
        tag: 'MCD',
        price: 30,
        inCart:0
    },
    {
        name: 'Camisa Lost',
        tag: 'lost1',
        price: 55,
        inCart:0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers +1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 
        1;
    }
   
    setItems(product);
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else { 
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log("Meu cartCost é", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <h2>${item.name}</h2>
            </div>   
            <div class="price">$${item.price},00</div>
            <div class="quantity">
            <ion-icon name="chevron-back-circle-outline"></ion-icon>
            <h2>${item.inCart}</h2>
            <ion-icon name="chevron-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h1 class="basketTotalTitle">
                    Valor Total
                </h1>    
                <h1 class="basketTotal">
                    R$${cartCost},00
                </h1> 
            </div>      
        `;

    }
}

onLoadCartNumbers();
displayCart();