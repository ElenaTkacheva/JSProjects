const burger = document.querySelector('.humburger-menu');
const menuElem = document.querySelector('.menu');
const menuList = document.querySelector('.menu-list');

const toggleMenu = () => {
    menuElem.classList.toggle('menu-active');
    burger.classList.toggle('humburger-menu-active');
};

menuList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('menu-list__link')) {
        menuElem.classList.toggle("menu-active");
        burger.classList.toggle("humburger-menu-active");
    }
});

burger.addEventListener('click', () => toggleMenu());