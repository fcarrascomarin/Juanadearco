/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;


function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  const totalGuardado = localStorage.getItem("total");

  if (data) carrito = JSON.parse(data);
  if (totalGuardado) total = parseInt(totalGuardado);
}



function agregarAlCarrito(nombre, precio, imagen = "") {

  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  total += precio;

  guardarCarrito();
  actualizarCarrito();
  abrirCarrito();
  mostrarMensajeCarrito("Producto agregado ✨");
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
    lista.innerHTML = `<p>Tu carrito está vacío.</p>`;
  } else {
    carrito.forEach((producto, index) => {
      const div = document.createElement("div");
      div.className = "modal-item";

      div.innerHTML = `
        <img src="${producto.imagen}" class="item-img"/>
        
        <div style="flex:1">
          <div class="item-name">${producto.nombre}</div>
          <div class="item-price">$${producto.precio.toLocaleString("es-CL")}</div>

          <div class="item-cantidad">
            <button onclick="cambiarCantidad(${index}, -1)">−</button>
            <span>${producto.cantidad}</span>
            <button onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>
        </div>

        <button onclick="eliminarProducto(${index})">×</button>
      `;

      lista.appendChild(div);
    });
  }

  totalElemento.textContent = `$${total.toLocaleString("es-CL")}`;

  if (cartCount) {
    cartCount.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  }

  guardarCarrito();
}

function cambiarCantidad(index, cambio) {
  const producto = carrito[index];
  if (!producto) return;

  producto.cantidad += cambio;
  total += producto.precio * cambio;

  if (producto.cantidad <= 0) {
    eliminarProducto(index);
    return;
  }

  actualizarCarrito();
}
function eliminarProducto(index) {
  if (!carrito[index]) return;

  total -= carrito[index].precio * carrito[index].cantidad;
  carrito.splice(index, 1);

  actualizarCarrito();
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

    let mensaje = "Hola! 💫 Quiero comprar:\n\n";

    carrito.forEach(producto => {
        mensaje += `• ${producto.nombre}\n`;
        mensaje += `Cantidad: ${producto.cantidad}\n`;
        mensaje += `Subtotal: $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}\n\n`;
    });

    mensaje += `✨ Total: $${total.toLocaleString("es-CL")}\n\n`;
    mensaje += `¿Me confirmas disponibilidad y formas de entrega?`;

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
    cargarCarrito();
    actualizarCarrito();
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