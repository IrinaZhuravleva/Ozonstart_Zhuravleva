// const checkbox = document.getElementById('discount-checkbox');

// checkbox.addEventListener('change', function() {
//     console.log(this.checked);
//     // if (this.checked === true) {
//     if (this.checked) {
//         this.nextElementSibling.classList.add('checked');
//     } else {
//         this.nextElementSibling.classList.remove('checked');
//     }
// });

// // checkbox.onchange = function() {
// //     console.log('hello');

// // };

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(function(element){
        element.addEventListener('change', function() {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}



// const checkbox = document.querySelector('#discount-checkbox');
// for(let i = 0; i < checkbox.length; i++) {
//     checkbox[i].addEventListener('change', function() {
//         if (this.checked) {
//             this.nextElementSibling.classList.add('checked');
//         } else {
//             this.nextElementSibling.classList.remove('checked');
//         }
//     });
// }

//cart
function toggleCart(){
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');


    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    btnClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

//end cart

//работа с корзиной
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    countGoods = document.querySelector('.counter');


    cards.forEach((card) => {
    const btn = card.querySelector('button');

    btn.addEventListener('click', () => {
        // console.log(card);
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        // cartEmpty.remove();
        showData();

        const removeBtn = cardClone.querySelector('.btn');
        removeBtn.textContent = 'Удалить из корзины';
        removeBtn.addEventListener('click', () =>{
            cardClone.remove();
            showData();
        });
    });
}); 
    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
            
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            // let sum = 0;
            let price = parseFloat(cardPrice.innerText);
            // console.log(price);
            sum += price;
            // console.log(sum);
            return sum;
        });
        cardTotal.textContent = sum;
        // cardTotal.innerText = sum;

        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
            // cartEmpty.remove();
        } else{
            cartEmpty.remove();
        }
    }
}


//end работа с корзиной

//фильтр и поиск
function actionPage() {
    //заново получаем все карточки, потому что это отдельный модуль
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),

    //получить инпуты фильтров
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    // search = document.getElementById('search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');
    
    discountCheckbox.addEventListener('click', () => {
        //перебираем все карточки на странице во время клика
        //эта функция принимает во время клика все элементы elem
        cards.forEach((elem) => {
            if(discountCheckbox.checked) {
                //есть ли у карточки класс, отвечающий за распродажу

                //если стоит checked на Акции, то цикл определяет нижеприведенной строкой, где тру а где фолс
                // console.log(new Boolean(elem.querySelector('.card-sale')));
                if (!elem.querySelector('.card-sale')) {
                    //обращаемся к родителю карточки через parentNode и скрываем его
                    // первый способ
                    // elem.parentNode.remove();

                    // // второй способ
                    elem.parentNode.style.display = 'none';
                }
            } else {
                // первый способ
                // document.querySelector('.goods').appendChild(elem.parentNode);

                // // второй способ
                elem.parentNode.style.display = '';
            }
        });
    });

    //фильтр по цене
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    //обработчики собыьий на инпуты макс и мин
    function filterPrice() {

        // перебор карточек для получения их цены
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');

            //отрезаем пробел,Р(рубль) или доллар от цифры цены посредством встроенной функции parseFloat
            const price = parseFloat(cardPrice.textContent);
            // console.log(price);
            // console.log(min.value);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.remove();
            } else {
                document.querySelector('.goods').appendChild(elem.parentNode);
            }
        });
    }

    //ДРУГОЙ ВАРИАНТ НАПИСАНИЯ ФИЛЬТРА 
    // function filter() {
    //     cards.forEach((card) => {
    //         const cardPrice = elem.querySelector('.card-price');

    //         //отрезаем пробел,Р(рубль) или доллар от цифры цены посредством встроенной функции parseFloat
    //         const price = parseFloat(cardPrice.textContent);
    //         const discount = document.querySelector('.card-sale');

    //         if ((min.value && price < min.value) || (max.value && price > max.value)) {
    //             card.parentNode.style.display = 'none';
    //         } else if (discountCheckbox.checked && !discount) {
    //             card.parentNode.style.display = 'none';
    //         } else {
    //          card.parentNode.style.display = '';
    //         }
    //     });
    // }

    //поиск
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        
        //перебираем карточки
        cards.forEach((elem) => {
            const title = elem.querySelector('.card-title');
            //метод test - возвращает булево значение 
            if(!searchText.test(title.textContent)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });
        //для очистки строки поиска
        search.value = '';
    });
    
}
//end фильтр и поиск


//получение данных с сервера - с помощью return не вызываем, 
//а возвращаем для того, чтобы в следующий then их передать, 
//а он получит их в коллбэк функции и прописываем его уже после вызова getData где-то 50 строчек ниже
function getData () {
    const goodsWrapper = document.querySelector('.goods');
    // fetch заменил httpx request  - get
    return fetch('../db/db.json')
        .then((response)=> {
            if (response.ok) {
                return response.json();
                console.log(response.json());
            } else {
                //создаем объект ошиьбки
                throw new Error('Данные не были получены, ошибка' + response.status);
            }
        })
        .then((data)  => {
            return data;
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color:red; font-size: 30px;" >Что-то пошло не так</div>';
        });
    // console.log(fetch('../db/db.json'));
}

//выводим карточки товара 
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    //перебираем товары
    data.goods.forEach((good)=>{
        const card = document.createElement('div');
        // console.log(good); - когда так выводим, то можем посмотреть свойства товара из объекта 
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color: red' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
      
        `;

        goodsWrapper.appendChild(card);
    });
//  console.log(data.goods);
}

function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    //создаем коллекцию (set -хранит только уникальные значения и map)
    const categories = new Set();

    cards.forEach((card)=> {
        //обращаемся к свойству, которое мы прописали в data attribut
        // console.dir(card.dataset.category);
        categories.add(card.dataset.category);
    });

    categories.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        console.log(event);

//         tagName: "LI"
// textContent: "Периферия для ПК"

        if (event.target.tagName === 'LI') {
            cards.forEach((card)=> {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        }
    });

    console.log(categories);
}

getData().then((data)=> {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});
