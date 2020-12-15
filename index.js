// ここから書いてください。
class Products {
    constructor(name, price, picUrl) {
        this.name = name;
        this.price = price;
        this.picUrl = picUrl;
    }
}

class Display {
    static setButtons = () => {
        let buttons =
            `
        <div class="row justify-content-center">
        `;
        for (let i = 0; i < products.length; i++) {
            let button =
                `
            <button type="button" class="btn btn-primary m-1 col-3 choseItems">
                <h3>${i + 1}</h3>
            </button>
            `;
            buttons += button;
        }
        buttons +=
            `</div>`;
        return buttons;
    }

    static showProductInfo = () => {
        let showInfo = document.getElementById("displayInfo");
        let choseItems = document.querySelectorAll(".choseItems");
        for (let i = 0; i < choseItems.length; i++) {
            let currBtn = choseItems.item(i);
            currBtn.addEventListener("click", () => {
                showInfo.innerHTML =
                    `
                <div style="height: 90px;" class="row mt-2 font-weight-bold">
                    <div id="picked" class="mt-3">
                        <h1><span class="p-3 bg-success">${i + 1}</span></h1>
                    </div>
                    <div class="flex-column ml-3">
                        <h3>${products[i].name}</h3>
                        <h3>$${products[i].price}</h3>
                    </div>
                </div>
                `;
            });
        }
    }

    static sliderShow = () => {
        const imgItem = document.getElementById("imgItem");

        //default
        if (imgItem.childNodes[0].src === defaultPic.picUrl) {
            imgItem.childNodes[0].remove();

            let sliders = document.createElement("div");
            let main = document.createElement("img");
            let extra = document.createElement("img");
            sliders.classList.add("col", "d-flex", "flex-nowrap");
            main.classList.add("full-width", "main");
            extra.classList.add("full-width", "extra");

            let pickedNum = parseInt(document.getElementById("picked").innerText) - 1;
            main.src = picArr[pickedNum];

            sliders.append(main);
            sliders.append(extra);
            imgItem.append(sliders);

            main.setAttribute("data-index", "0");

            Display.slideJump(main, extra);
        } else {
            let main = document.querySelector(".main");
            let extra = document.querySelector(".extra");
            Display.slideJump(main, extra);
        }
    }

    static slideJump = (main, extra) => {
        let index = parseInt(main.getAttribute("data-index"));
        let currentPic = picArr[index];

        let pickedIndex = parseInt(document.getElementById("picked").innerText) - 1;
        if (index > pickedIndex) {
            index = index - (index - pickedIndex);
            if (index < 0) index = picArr.length - 1 + index;
        } else {
            index = index + pickedIndex - index;
            if (index > picArr.length - 1) index = 0 + index;
        }

        let nextPic = picArr[index];
        main.setAttribute("data-index", index.toString());

        Display.animation(currentPic, nextPic, main, extra);
    }

    static animation = (currentPic, nextPic, main, extra) => {
        let sliders = document.getElementById("imgItem")
        main.innerHTML = "";
        main.src = nextPic;

        extra.innerHTML = "";
        extra.src = currentPic;
        main.classList.add("expand-animation");
        extra.classList.add("deplete-animation");

        if (picArr[nextPic] > picArr[currentPic]) {
            sliders.innerHTML = "";
            sliders.append(main);
            sliders.append(extra);
        } else {
            sliders.innerHTML = "";
            sliders.append(extra);
            sliders.append(main);
        }
    }
}


const products = [
    new Products("Chips", 4, "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Hotdog", 12, "https://images.unsplash.com/photo-1566626106394-c123b6af51ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Chocolate", 22, "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"),
    new Products("Ice cream", 14, "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Fried Chicken", 10, "https://images.unsplash.com/photo-1594254916028-742dedb72062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Dim Sum", 16, "https://images.unsplash.com/photo-1518983546435-91f8b87fe561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Sandwich", 8, "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Cookies", 12, "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"),
    new Products("Candy", 5, "https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzh8fGNhbmR5fGVufDB8fDB8&auto=format&fit=crop&w=800&q=60"),
];
const defaultPic = new Products("", 0, "https://images.pexels.com/photos/3184180/pexels-photo-3184180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");

let picArr = [];
for (let i = 0; i < products.length; i++) {
    picArr.push(products[i].picUrl);
}
// default
document.getElementById("imgItem").innerHTML = `<img class="full-width" src="${defaultPic.picUrl}">`;
document.getElementById("buttons").innerHTML = Display.setButtons();
Display.showProductInfo();

document.getElementById("pushBtn").addEventListener("click", Display.sliderShow)
