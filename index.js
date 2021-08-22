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
            <button id=${"btn" + i+1} type="button" class="btn btn-primary m-1 col-3 choseItems">
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

                // main pic change
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

            main.setAttribute("data-index", String(pickedNum));

            Display.slideJump(main, extra);
        } else {
            let main = document.querySelector(".main");
            let extra = document.querySelector(".extra");
            Display.slideJump(main, extra);
        }
    }

    static slideJump = (main, extra) => {
        const index = parseInt(main.getAttribute("data-index"));
        const currentPic = picArr[index];

        let pickedIndex = parseInt(document.getElementById("picked").innerText) - 1;
        if (index > pickedIndex) {
            index = index - (index - pickedIndex);
            if (index < 0) index = picArr.length - 1 + index;
        } else {
            index = index + pickedIndex - index;
            if (index > picArr.length - 1) index = 0 + index;
        }

        let nextPic = picArr[index];
        main.setAttribute("data-index", String(index));

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
    new Products("Chips", 4, "./pics/potato.jpeg"),
    new Products("Hotdog", 12, "./pics/hotdog.jpeg"),
    new Products("Chocolate", 22, "./pics/chocolate.jpeg"),
    new Products("Ice cream", 14, "./pics/ice.jpeg"),
    new Products("Fried Chicken", 10, "./pics/friedChicken.jpeg"),
    new Products("Dim Sum", 16, "./pics/dimSam.jpeg"),
    new Products("Sandwich", 8, "./pics/sandwich.jpeg"),
    new Products("Cookies", 12, "./pics/cookies.jpeg"),
    new Products("Candy", 5, "./pics/candy.jpeg"),
];
const defaultPic = new Products("", 0, "./pics/default.jpeg");

let picArr = [];
for (let i = 0; i < products.length; i++) {
    picArr.push(products[i].picUrl);
}
// default
document.getElementById("imgItem").innerHTML = `<img class="full-width" src=${defaultPic.picUrl}>`;
document.getElementById("buttons").innerHTML = Display.setButtons();
Display.showProductInfo();
for (let i = 0; i < products.length; i++){
    document.querySelector(`#btn${i+1}`).addEventListener("change", Display.sliderShow)
}
document.getElementById("pushBtn").addEventListener("click", Display.sliderShow)
