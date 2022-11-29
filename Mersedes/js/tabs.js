const tabsHandlerElems = document.querySelectorAll('[data-tabs-handler]');
const tabsContentElems = document.querySelectorAll('[data-tabs-field]');
const designTitle = document.querySelectorAll('.design__title');

for (let btn of tabsHandlerElems) {
    btn.addEventListener('click', () => {
        tabsHandlerElems.forEach(item => item.classList.remove('design-list__item_active'));

        btn.classList.add('design-list__item_active');

        tabsContentElems.forEach(content => {
            if(content.dataset.tabsField === btn.dataset.tabsHandler) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });

        designTitle.forEach((title) => title.classList.toggle('hidden'));
    });
}
