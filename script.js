/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();

    const carritoEl = document.getElementById("carrito");
    if (carritoEl) {
        carritoEl.scrollIntoView({ behavior: "smooth" });
    }
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
    if (!carrito[index]) return;

    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero comprar:\n";

    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    mensaje += `\nTotal: $${total}`;

    const numero = "56923770543";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

function enviardia(dia) {
    const numero = "56998920489";
    const mensaje = `Hola! Quiero agendar una perforación para el día ${dia}. ¿Está disponible?`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

function enviarconsulta(perforaciones) {
    const numero = "56998920489";
    const mensaje = `Hola! Quiero consultar por tipos de ${perforaciones}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

/* =========================
   CAMBIO DE IMAGEN PRODUCTO
========================= */

function cambiarImagen(boton, direccion) {
    const img = boton.parentElement.querySelector(".producto-img");

    if (!img || !img.dataset.images) return;

    const imagenes = img.dataset.images.split(",");
    let index = parseInt(img.dataset.index || 0);

    index += direccion;

    if (index < 0) index = imagenes.length - 1;
    if (index >= imagenes.length) index = 0;

    img.src = imagenes[index];
    img.dataset.index = index;
}

function seguirComprando() {
    const productos = document.getElementById("productos");
    if (productos) {
        productos.scrollIntoView({ behavior: "smooth" });
    }
}

/* =========================
   FILTROS + FRASE + IMAGEN
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const filtros = document.querySelectorAll(".filtro");
    const cards = document.querySelectorAll(".card");
    const frase = document.getElementById("fraseCategoria");
    const seccionProductos = document.getElementById("productos");
    const imagen = document.getElementById("imagenCategoria");

    const contenidoCategoria = {
        todos: {
            frase: "Joyas que representan historias",
            imagen: "todos.jpg"
        },
        conviccion: {
            frase: "La fuerza que te sostiene",
            imagen: "conviccion.jpg"
        },
        transformacion: {
            frase: "El cambio que te define",
            imagen: "transformacion.jpg"
        },
        origen: {
            frase: "Un símbolo para cada historia",
            imagen: "origen.jpg"
        }
    };

    filtros.forEach(boton => {
        boton.addEventListener("click", () => {

            filtros.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const categoria = boton.dataset.categoria;
            const contenido = contenidoCategoria[categoria];

            // Fondo
            if (seccionProductos) {
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
            }

            // Frase + imagen
            if (frase && imagen) {
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
                    }
                }, 100);
            }

            // Filtro productos
            cards.forEach(card => {
                if (categoria === "todos" || card.dataset.categoria === categoria) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

        });
    });

    // Estado inicial (muy importante)
    const filtroInicial = document.querySelector(".filtro[data-categoria='todos']");
    if (filtroInicial) {
        filtroInicial.click();
    }
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
});