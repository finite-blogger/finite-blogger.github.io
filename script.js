const List = document.getElementById('itemsList');
const searchBar = document.getElementById('searchBar');
const clearBtn = document.getElementById("clearBtn");
let items = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = items.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchString) ||
            item.desc.toLowerCase().includes(searchString)
        );
    });
    displayItems(filteredItems);
    
});

const loadItems = async () => {
    try {
        const res = await fetch('list.json');
        items = await res.json();
        displayItems(items);
    } catch (err) {
        console.error(err);
    }
};
const displayItems = (items) => {
    const htmlString = items
        .map((item) => {
            return `
            <li class="post">
                <h2>${item.title}</h2>
                <p class="desc">${item.desc}</p>
          <p>${item.explanation}</p>
          <button class="btn"><a href="${item.link}">Read</a></button>
            </li>
        `;
        })
        .join('');

    List.innerHTML = htmlString;
};

loadItems();
clearBtn.addEventListener('click',() =>{
    searchBar.value = "";
    const htmlString = items
        .map((item) => {
            return `
            <li class="post">
                <h2>${item.title}</h2>
                <p class="desc">${item.desc}</p>
          <p>${item.explanation}</p>
          <button class="btn"><a href="${item.link}">Read</a></button>
            </li>
        `;
        })
        .join('');
    List.innerHTML = htmlString;
})