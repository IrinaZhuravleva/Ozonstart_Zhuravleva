export default function getData() {
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