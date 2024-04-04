const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItensContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCounter = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');


let cart = [];

function abrirCarrinho() {
    cartModal.style.display = 'flex';
}

function fecharCarrinho() {
    cartModal.style.display = 'none';
}

//abrir carrinho de compras
cartBtn.addEventListener('click', abrirCarrinho);

//fechar o carrinho de compras clicando fora 
cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        fecharCarrinho();
    }
})
//fechar o carrinho de compras clicando no btn fechar
closeModalBtn.addEventListener('click', fecharCarrinho);

menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.add-to-cart-btn');
    if (parentButton) {
        const name = parentButton.getAttribute('data-name');
        const price = parentButton.getAttribute('data-price');
        addToCart(name, price);
    }
})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal();
}

function updateCartModal() {
    cartItensContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <div>
                <div>
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                    <p>${item.quantity}</p>
                </div>

                <div>
                    <button>
                        Remover
                    </button>
                </div>
            </div>
        `;
        cartItensContainer.appendChild(cartItemElement);
    })
}