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
const cardapioHamburguers = [
    {
        name: "Salada-Duplo",
        price: 22.00,
        imageSrc: "./assets/hamb-1.png",
        description: "Pão leve com fermentação natural. Hamburguer duplo de 180g, queijo muçarela, queijo cheddar, alface e cebola."
    },
    {
        name: "Bacon-Duplo",
        price: 30.00,
        imageSrc: "./assets/hamb-2.png",
        description: "Pão leve com fermentação natural. Hamburguer duplo de 180g, queijo cheddar e tomate."
    },
    {
        name: "Duplo-cheddar",
        price: 25.00,
        imageSrc: "./assets/hamb-3.png",
        description: "Pão leve com fermentação natural. Hamburguer duplo de 120g, queijo cheddar e maionese da casa."
    },
    {
        name: "Picles",
        price: 18.90,
        imageSrc: "./assets/hamb-4.png",
        description: "Pão leve com fermentação natural. Hamburguer de 180g, alface, tomate, cebola roxa e picles."
    },
    {
        name: "Salada-Duplo",
        price: 25.00,
        imageSrc: "./assets/hamb-5.png",
        description: "Pão leve com fermentação natural. Hamburguer duplo de 90g, queijo muçarela, alface e tomate."
    },
    {
        name: "Costela",
        price: 35.00,
        imageSrc: "./assets/hamb-6.png",
        description: "Pão leve com fermentação natural. Hamburguer 180g de costela, cebola roxa, alface, tomate e maionese da casa."
    },
    {
        name: "Duplo-sabor",
        price: 38.90,
        imageSrc: "./assets/hamb-7.png",
        description: "Pão leve com fermentação natural. Hamburguer de 180g, onion rings e molho barbecue."
    },
    {
        name: "Vegano",
        price: 30.00,
        imageSrc: "./assets/hamb-8.png",
        description: "Pão de batata, hamburguer de brocolis, alface, cenoura, tomate e deliciosa rucula que vai dar um sabor diferenciado."
    },
];

const bebidas = [
    {
        name: 'Coca-Cola',
        price: 5.00,
        imageSrc: './assets/refri-1.png',
        description: 'Coca-cola lata 350ml'
    },
    {
        name: 'Guarana',
        price: 5.00,
        imageSrc: './assets/refri-2.png',
        description: 'Guarana lata 350ml'
    },
    {
        name: 'Guarana-Jesus',
        price: 5.00,
        imageSrc: './assets/gjesus.webp',
        description: 'Guarana Jesus lata 350ml'
    },
    {
        name: 'Pepsi-Black',
        price: 5.00,
        imageSrc: './assets/pepsi.png',
        description: 'Pepsi lata 350ml'
    },
    {
        name: 'Monster',
        price: 9.00,
        imageSrc: './assets/monster.webp',
        description: 'Energético Monster lata 473ml'
    },
    {
        name: 'Coca-Cola',
        price: 12.00,
        imageSrc: './assets/coca-cola-2l.png',
        description: 'Coca-Cola 2 Litros'
    },

];

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
            price: parseFloat(price.replace('R$ ', '').replace(',', '.')),
            quantity: 1,
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
                <p class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        
            <button class="remove-from-cart-btn" data-name='${item.name}'>
                Remover
            </button>
        </div>
        `;
        quantidade += item.quantity;
        total += item.price * item.quantity;
        item.totalPrice = item.price * item.quantity;
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
    const numeroTelefone = '#';
    window.open(`https://wa.me/${numeroTelefone}?text=${mensagem} Endereço: ${addressInput.value}`);


    cart = [];
    addressInput.value = '';
    updateCartModal();
})

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 14 && hora < 22;
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

function adicionarItensCardapio(lista, idlista){
    const novaLista = document.getElementById(idlista);

    lista.forEach((elemento) => {
        const novoElemento = `
        
        <div class="flex gap-2 w-full relative">
            <img src=${elemento.imageSrc} alt=${elemento.name} class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300">
            <div class="w-full">
                <p class="font-bold">
                    ${elemento.name}
                </p>
                <p class="font-bold">
                    ${elemento.description}
                </p>
                <div class="flex items-center gap-2 justify-between mt-3">
                    <p class="font-bold text-lg">
                        R$ ${elemento.price.toFixed(2)}
                    </p>
                    <button class="bg-gray-900 px-5 rounded add-to-cart-btn" data-name=${elemento.name} 
                    data-price=${elemento.price.toFixed(2)}>
                        <i class="fa fa-cart-plus text-lg text-white"></i>
                    </button>
                </div>
            </div>
            
        </div>


        `;
        novaLista.innerHTML += novoElemento;
    })
}

adicionarItensCardapio(cardapioHamburguers, 'listaHamb');
adicionarItensCardapio(bebidas, 'listaBebidas');











