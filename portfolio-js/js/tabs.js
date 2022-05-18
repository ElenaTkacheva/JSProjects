const tabButtons = document.querySelectorAll('.design-list__item');
const tabDescriptions = document.querySelectorAll('.design__descr');
const tabImages = document.querySelectorAll('.design-images');
const leftBlock = document.querySelectorAll(".design-block__img");
const title = document.querySelectorAll(".design__title");

const changeContent = (array, value) => {
    array.forEach((elem) => {
      if (elem.dataset.tabsField === value) {
        elem.classList.remove("hidden");
      } else {
        elem.classList.add("hidden");
      }
    });
}

tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener('click', (event) => {
      const dataValue = tabButton.dataset.tabsHandler;

      title.forEach((view, indexView) => {
        if (index === indexView) {
          view.classList.remove("hidden");
          document.title = view.innerText; 
        } else {
          view.classList.add("hidden");
        }
      });

      changeContent(tabImages, dataValue);
      changeContent(tabDescriptions, dataValue);
      changeContent(leftBlock, dataValue);

      tabButtons.forEach((btn) => {
        if (btn === event.target) {
          btn.classList.add("design-list__item_active");
        } else {
          btn.classList.remove("design-list__item_active");
        }
      });
    })
});