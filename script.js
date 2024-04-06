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
        existingItem.totalPrice = existingItem.quantity * price;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
            totalPrice: price,
        });
    }
    updateCartModal();
}

function updateCartModal() {
    cartItensContainer.innerHTML = '';
    let total = 0;
    let quantidade = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${parseFloat(item.totalPrice).toFixed(2)}</p>
            </div>
        
            <button class="remove-from-cart-btn" data-name='${item.name}'>
                Remover
            </button>
        </div>
        `;
        quantidade += item.quantity;
        total += item.price * item.quantity;
        cartItensContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    cartCounter.innerHTML = quantidade;
}


//removendo itens do carrinho
cartItensContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('remove-from-cart-btn')){
        //pegando o nome do elemento
        const name = event.target.getAttribute('data-name');

        removeItemCart(name);
    }

})

function removeItemCart(name) {
    //pegando o index do elemento 
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        console.log('Clique', item);
        if(item.quantity > 1){
            item.quantity -= 1;
            item.totalPrice -= item.price;
            updateCartModal();
            return;
        }
        //removendo o item da lista 
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener('input', function(event){
    let inputValue = event.target.value;
    if(inputValue !== ''){
        addressWarn.classList.add('hidden');
        addressInput.classList.remove('border-red-500');
    }
})


checkoutBtn.addEventListener('click', function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        //biblioteca para exibir o alerta personalizado
        Toastify({
            text: "Restaurante Fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#FF5555",
            },
          }).showToast();
        return;
    }

    if(cart.length === 0) return;

    if(addressInput.value === ''){
        addressWarn.classList.remove('hidden');
        addressInput.classList.add('border-red-500');
        return;
    }
    //integrando com api do whats
    const cartItems = cart.map((item) => {
        return (
            `${item.name} \n Quantidade: (${item.quantity}) \n Preço: ${parseFloat(item.totalPrice).toFixed(2)}  \n\n`
        )
    }).join("");
    
    const mensagem = encodeURIComponent(cartItems);
    const numeroTelefone = '5535997366585';
    window.open(`https://wa.me/${numeroTelefone}?text=${mensagem} Endereço: ${addressInput.value}`);


    cart = [];
    addressInput.value = '';
    updateCartModal();
})

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
}

const spanItem = document.getElementById('date-span');
const isOpen = checkRestaurantOpen();

if(isOpen) {
    spanItem.classList.remove('bg-red-500');
    spanItem.classList.add('bg-green-600');
} else {
    spanItem.classList.add('bg-red-500');
    spanItem.classList.remove('bg-green-600');
}