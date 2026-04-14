const toggleButton = document.getElementById("toggleButton");
const mobileBgBlur = document.getElementById("mobileBgBlur");
const mobileMenuModal = document.getElementById("mobileMenuModal");
toggleButton.addEventListener("click", () => {
  mobileBgBlur.classList.toggle("mobileBg--active");
  mobileMenuModal.classList.toggle("mobileMenu__modal--active");
});

// Funcionalidad deprecated pra obtener iconos de la web

// const getIcons = async () => {
//   const url = "https://api.svgl.app?search=css";
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Falló la conexión");
//   return res.json();
// };
// const Icon = await getIcons();
// console.log(Icon);
// const img = document.createElement("img");
// img.src = Icon[1].route;
// skillContainer.appendChild(img);

// Funcionalidad del Carrusel

const skillContainer_carrete = document.getElementById("skillTrack");

const URLsvg = [
  "assets/svg/html5.svg",
  "assets/svg/css.svg",
  "assets/svg/javascript.svg",
  "assets/svg/postman.svg",
];

/**
 * Renderiza una lista de imagenes en el contenedor del carrete
 * @param {Array} URLsvg - Array de URLs de las imágenes
 */
const newCarrete = (array) => {
  array.forEach((e, index) => {
    const div = document.createElement("div");
    div.id = `skill__div-${index}`;
    div.classList.add("skill__element");
    const img = document.createElement("img");
    img.id = `skil__img-${index}`;
    img.classList.add("carrete__img");
    img.src = array[index];

    div.appendChild(img);
    skillContainer_carrete.appendChild(div);
  });
};

window.addEventListener("load", () => {});
newCarrete(URLsvg);
//‼️Aqui hay un bug (Al cargar la funcion dentro de la arrow function esta no es visible desde el contexto global)
//invocamos la funcion al cargar la página

// Hacer que el carrusel se mueva infinitamente
const view = document.getElementById("skillWindow");
const ItemsCarreteCopy = skillContainer_carrete.cloneNode(true);
const carreteItems = skillContainer_carrete.childNodes;

const carreteItemWidth = carreteItems[0].offsetWidth; //Ancho del div de las imágenes

const carreteItemsArray = Array.from(carreteItems);

let positionIndex = 1;

/**
 * Controla el desaplazamiento del carrete de iconos
 */
const translate = () => {
  skillContainer_carrete.classList.add("skill__carrete--motion");
  const direction = -1; //negativos se mueven a la derecha positivos a la izquierda
  skillContainer_carrete.style.transform = `translateX(${positionIndex * (carreteItemWidth + 16) * direction}px)`;
  positionIndex++;
  if (positionIndex === carreteItemsArray.length + 2) {
    skillContainer_carrete.classList.remove("skill__carrete--motion");
    skillContainer_carrete.style.transform = `translateX(0px)`;
    positionIndex = 1;
  }
};

let itemsOnView = 3;
let itemsclonados = [];
/**
 * Chequea cuantos elementos caben dentro de la ventana actualmente en función a ese numero toma los
 * "n" elementos del array y los clona al final del array original para dar efecto infinito
 */
const howMany = () => {
  const viewidth = view.offsetWidth;
  let items = Math.ceil((viewidth + 16) / (carreteItemWidth + 16));
  if (items != itemsOnView) {
    itemsOnView = items;
    console.log("Ok ahora si es diferente " + items, itemsOnView);
    console.log(ItemsCarreteCopy);

    itemsclonados = [];
    for (let i = 0; i < carreteItems.length; i++) {
      const p = carreteItems[i];
      const elemento = p.cloneNode(true);

      elemento.id = "subindice";
      itemsclonados.push(elemento);

      if (i === itemsOnView) {
        break;
      }
    }
    console.log(itemsclonados);

    skillContainer_carrete.innerHTML = "";
    skillContainer_carrete.appendChild(ItemsCarreteCopy);
    itemsclonados.forEach((p) => {
      skillContainer_carrete.appendChild(p);
      console.log(p);
    });
  }
};
addEventListener("resize", howMany);

setInterval(translate, 1000);
