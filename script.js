/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  actualizarCarrito();
  abrirCarrito();
}
function mostrarMensajeCarrito(texto) {
    let toast = document.getElementById("toastCarrito");

    // si no existe, lo crea
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastCarrito";
        toast.className = "toast-carrito";
        document.body.appendChild(toast);
    }

    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function actualizarCarrito() {
  const lista = document.getElementById("cartItems");
  const totalElemento = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!lista || !totalElemento) return;

  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = `<li><span>Tu carrito está vacío.</span></li>`;
  } else {
    carrito.forEach((producto, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${producto.nombre} - $${producto.precio.toLocaleString("es-CL")}</span>
        <button type="button" onclick="eliminarProducto(${index})">×</button>
      `;

      lista.appendChild(li);
    });
  }

  totalElemento.textContent = `$${total.toLocaleString("es-CL")}`;

  if (cartCount) {
    cartCount.textContent = carrito.length;
  }
}



function seguirComprando() {
    const cartDropdown = document.getElementById("cartDropdown");
    if (cartDropdown) {
        cartDropdown.classList.remove("open");
    }

    const productos = document.getElementById("productos");
    if (productos) {
        productos.scrollIntoView({ behavior: "smooth" });
    }
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



/* =========================
   FILTROS + FRASE + IMAGEN + TIPO
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const filtrosCategoria = document.querySelectorAll(".filtro");
    const filtrosTipo = document.querySelectorAll(".filtro-tipo");
    const limpiarCategoria = document.querySelector(".limpiar-categoria");
    const limpiarTipo = document.querySelector(".limpiar-tipo");

    const cards = document.querySelectorAll(".card");
    const frase = document.getElementById("fraseCategoria");
    const imagen = document.getElementById("imagenCategoria");
    const descripcion = document.getElementById("descripcionCategoria");

    let categoriaActiva = "todos";
    let tipoActivo = "todos";

    const contenidoCategoria = {
        todos: {
            frase: "Cada símbolo guarda una historia",
            imagen: "cat-todos.png",
            descripcion: "Juana de Arco no pidió permiso: eligió su voz y el fuego la volvió eterna."
        },
        conviccion: {
            frase: "La fuerza de quien conoce su camino",
            imagen: "cat-conviccion.png",
            descripcion: "Cuando el mundo duda, queda lo único que no se negocia: tu verdad."
        },
        transformacion: {
            frase: "Todo cambio deja una nueva forma de brillar",
            imagen: "cat-transformacion.png",
            descripcion: "Transformarse no es perderse: es ser más fiel que nunca a ti."
        },
        templanza: {
            frase: "La calma también puede ser fuego",
            imagen: "cat-templanza.png",
            descripcion: "Templanza no es quietud: es sostener tu centro incluso en medio del ruido."
        }
    };

    function actualizarContenidoCategoria() {
        const contenido = contenidoCategoria[categoriaActiva];

        if (!contenido) return;

        if (imagen) {
            imagen.classList.remove("visible");
            imagen.src = contenido.imagen;

            setTimeout(() => {
                imagen.classList.add("visible");
            }, 100);
        }

        if (frase) {
            frase.textContent = contenido.frase;
        }

        if (descripcion) {
            descripcion.textContent = contenido.descripcion;
        }
    }

    function aplicarFiltros() {
        cards.forEach(card => {
            const categoriaCard = card.dataset.categoria;
            const tipoCard = card.dataset.tipo;

            const coincideCategoria =
                categoriaActiva === "todos" || categoriaCard === categoriaActiva;

            const coincideTipo =
                tipoActivo === "todos" || tipoCard === tipoActivo;

            card.style.display = coincideCategoria && coincideTipo ? "flex" : "none";
        });
    }

    function actualizarBotonesLimpiar() {
        if (limpiarCategoria) {
            limpiarCategoria.classList.toggle("oculto", categoriaActiva === "todos");
        }

        if (limpiarTipo) {
            limpiarTipo.classList.toggle("oculto", tipoActivo === "todos");
        }
    }

    filtrosCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            filtrosCategoria.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            categoriaActiva = boton.dataset.categoria || "todos";

            actualizarContenidoCategoria();
            aplicarFiltros();
            actualizarBotonesLimpiar();
        });
    });

    filtrosTipo.forEach(boton => {
        boton.addEventListener("click", () => {
            filtrosTipo.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            tipoActivo = boton.dataset.tipo || "todos";

            aplicarFiltros();
            actualizarBotonesLimpiar();
        });
    });

    if (limpiarCategoria) {
        limpiarCategoria.addEventListener("click", () => {
            categoriaActiva = "todos";

            filtrosCategoria.forEach(b => b.classList.remove("active"));

            actualizarContenidoCategoria();
            aplicarFiltros();
            actualizarBotonesLimpiar();
        });
    }

    if (limpiarTipo) {
        limpiarTipo.addEventListener("click", () => {
            tipoActivo = "todos";

            filtrosTipo.forEach(b => b.classList.remove("active"));

            aplicarFiltros();
            actualizarBotonesLimpiar();
        });
    }

    actualizarContenidoCategoria();
    aplicarFiltros();
    actualizarBotonesLimpiar();
});

function abrirCarrito() {
  const cartDropdown = document.getElementById("cartDropdown");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartDropdown) cartDropdown.classList.add("open");
  if (cartOverlay) cartOverlay.classList.add("open");
}

function cerrarCarrito() {
  const cartDropdown = document.getElementById("cartDropdown");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartDropdown) cartDropdown.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const cartToggle = document.getElementById("cartToggle");
  const cerrarBtn = document.getElementById("cerrarCarrito");
  const seguirBtn = document.getElementById("seguirComprando");
  const overlay = document.getElementById("cartOverlay");
  const btnWhatsapp = document.getElementById("btnWhatsapp");

  if (cartToggle) {
    cartToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirCarrito();
    });
  }

  if (cerrarBtn) cerrarBtn.addEventListener("click", cerrarCarrito);
  if (seguirBtn) seguirBtn.addEventListener("click", cerrarCarrito);
  if (overlay) overlay.addEventListener("click", cerrarCarrito);

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", enviarWhatsApp);
  }

  actualizarCarrito();
});