/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    // 🔥 SCROLL AL CARRITO
    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button onclick="eliminarProducto(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    totalElemento.textContent = total;
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero comprar:%0A";

    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} ($${producto.precio})%0A`;
    });

    mensaje += `%0ATotal: $${total}`;

    const numero = "56923770543"; // SIN +
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
}

function enviardia(dia) {
  const numero = "56998920489"; // 🔥 CAMBIÁ ESTO POR TU NÚMERO
  const mensaje = `Hola! Quiero agendar una perforación para el día ${dia}. ¿Está disponible?`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
function enviarconsulta(perforaciones) {
  const numero = "56998920489"; // 🔥 CAMBIÁ ESTO POR TU NÚMERO
  const mensaje = `Hola! Quiero consultar por tipos de ${perforaciones}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}


function cambiarImagen(boton, direccion) {

    const img = boton.parentElement.querySelector(".producto-img");
    const imagenes = img.dataset.images.split(",");
    let index = parseInt(img.dataset.index);

    index += direccion;

    if (index < 0) index = imagenes.length - 1;
    if (index >= imagenes.length) index = 0;

    img.src = imagenes[index];
    img.dataset.index = index;
}

function seguirComprando() {
    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
}
document.addEventListener("DOMContentLoaded", function () {

    const filtros = document.querySelectorAll(".filtro");
    const cards = document.querySelectorAll(".card");
    const frase = document.getElementById("fraseCategoria");
    const seccionProductos = document.getElementById("productos");
    const imagen = document.getElementById("imagenCategoria");

    const contenidoCategoria = {
        todos: {
            frase: "Joyas que representan historias",
            imagen: "img/todos.jpg"
        },
        conviccion: {
            frase: "La fuerza que te sostiene",
            imagen: "img/conviccion.jpg"
        },
        transformacion: {
            frase: "El cambio que te define",
            imagen: "img/transformacion.jpg"
        },
        origen: {
            frase: "Un simbolo para cada historia",
            imagen: "img/origen.jpg"
        }
    );

    filtros.forEach(boton => {
        boton.addEventListener("click", () => {

            filtros.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const categoria = boton.dataset.categoria;
            const contenido = contenidoCategoria[categoria];

            // Fondo
            seccionProductos.classList.remove("promesa-bg", "llama-bg", "camino-bg");

            if (categoria === "conviccion") {
                seccionProductos.classList.add("promesa-bg");
            }
            if (categoria === "transformacion") {
                seccionProductos.classList.add("llama-bg");
            }
            if (categoria === "origen") {
                seccionProductos.classList.add("camino-bg");
            }

            // Frase + imagen
            frase.classList.remove("visible");
            imagen.classList.remove("visible");

            if (contenido) {
                frase.textContent = contenido.frase;
                imagen.src = contenido.imagen;
            }

            setTimeout(() => {
                if (contenido) {
                    frase.classList.add("visible");
                    imagen.classList.add("visible");
                }, 100;);

            // Filtro de productos
            cards.forEach(card => {
                if (categoria === "todos" || card.dataset.categoria === categoria) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

        });
    });

});


/* =========================
   MENU HAMBURGUESA
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navMenu");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
);