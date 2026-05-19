/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;

function recalcularTotal() {
  total = carrito.reduce((acc, producto) => {
    return acc + Number(producto.precio) * Number(producto.cantidad);
  }, 0);
}

function guardarCarrito() {
  recalcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  try {
    const data = localStorage.getItem("carrito");
    carrito = data ? JSON.parse(data) : [];

    if (!Array.isArray(carrito)) {
      carrito = [];
    }

    carrito = carrito
      .filter(producto => producto && producto.nombre && Number(producto.precio) > 0)
      .map(producto => ({
        nombre: producto.nombre,
        precio: Number(producto.precio),
        imagen: producto.imagen || "",
        cantidad: Math.max(1, Number(producto.cantidad) || 1)
      }));

    recalcularTotal();
  } catch (error) {
    carrito = [];
    total = 0;
    localStorage.removeItem("carrito");
  }
}

function formatearPrecio(valor) {
  return `$${Number(valor).toLocaleString("es-CL")}`;
}

function agregarAlCarrito(nombre, precio, imagen = "") {
  const precioNumerico = Number(precio);

  if (!nombre || !precioNumerico) return;

  const existente = carrito.find(producto => producto.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      nombre,
      precio: precioNumerico,
      imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarCarrito();
  abrirCarrito();
  mostrarMensajeCarrito("Producto agregado ✨");
}

function mostrarMensajeCarrito(texto) {
  let toast = document.getElementById("toastCarrito");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastCarrito";
    toast.className = "toast-carrito";
    document.body.appendChild(toast);
  }

  toast.textContent = texto;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function actualizarCarrito() {
  const lista = document.getElementById("cartItems");
  const totalElemento = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!lista || !totalElemento) return;

  recalcularTotal();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
  } else {
    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "cart-item";

      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="item-img" loading="lazy">

        <div class="cart-item-info">
          <div class="item-name">${producto.nombre}</div>
          <div class="item-price">${formatearPrecio(producto.precio)}</div>

          <div class="item-cantidad" aria-label="Cantidad">
            <button type="button" onclick="cambiarCantidad(${index}, -1)" aria-label="Restar una unidad">−</button>
            <span>${producto.cantidad}</span>
            <button type="button" onclick="cambiarCantidad(${index}, 1)" aria-label="Sumar una unidad">+</button>
          </div>
        </div>

        <button type="button" class="item-remove" onclick="eliminarProducto(${index})" aria-label="Eliminar ${producto.nombre}">×</button>
      `;

      lista.appendChild(item);
    });
  }

  totalElemento.textContent = formatearPrecio(total);

  if (cartCount) {
    cartCount.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  }
}

function cambiarCantidad(index, cambio) {
  const producto = carrito[index];
  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito();
  actualizarCarrito();
}

function eliminarProducto(index) {
  if (!carrito[index]) return;

  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

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

function seguirComprando() {
  cerrarCarrito();

  const productos = document.getElementById("productos");
  if (productos) {
    productos.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  recalcularTotal();

  let mensaje = "Hola! 💫 Quiero comprar:\n\n";

  carrito.forEach(producto => {
    mensaje += `• ${producto.nombre}\n`;
    mensaje += `Cantidad: ${producto.cantidad}\n`;
    mensaje += `Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}\n\n`;
  });

  mensaje += `✨ Total: ${formatearPrecio(total)}\n\n`;
  mensaje += "¿Me confirmas disponibilidad y formas de entrega?";

  const numero = "56923770543";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function enviardia(dia) {
  const numero = "56998920489";
  const mensaje = `Hola! Quiero agendar una perforación para el día ${dia}. ¿Está disponible?`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function enviarconsulta(perforaciones) {
  const numero = "56998920489";
  const mensaje = `Hola! Quiero consultar por tipos de ${perforaciones}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================
   CAMBIO DE IMAGEN PRODUCTO
========================= */

function cambiarImagen(boton, direccion) {
  const img = boton.parentElement.querySelector(".producto-img");

  if (!img || !img.dataset.images) return;

  const imagenes = img.dataset.images.split(",");
  let index = parseInt(img.dataset.index || 0, 10);

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

  const cartToggle = document.getElementById("cartToggle");
  const cerrarBtn = document.getElementById("cerrarCarrito");
  const seguirBtn = document.getElementById("seguirComprando");
  const overlay = document.getElementById("cartOverlay");
  const btnWhatsapp = document.getElementById("btnWhatsapp");

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

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
      imagen.alt = contenido.frase;

      window.setTimeout(() => {
        imagen.classList.add("visible");
      }, 100);
    }

    if (frase) frase.textContent = contenido.frase;
    if (descripcion) descripcion.textContent = contenido.descripcion;
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

  if (cartToggle) {
    cartToggle.addEventListener("click", event => {
      event.stopPropagation();
      abrirCarrito();
    });
  }

  if (cerrarBtn) cerrarBtn.addEventListener("click", cerrarCarrito);
  if (seguirBtn) seguirBtn.addEventListener("click", seguirComprando);
  if (overlay) overlay.addEventListener("click", cerrarCarrito);
  if (btnWhatsapp) btnWhatsapp.addEventListener("click", enviarWhatsApp);

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const abierto = navMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(abierto));
      menuToggle.textContent = abierto ? "×" : "☰";
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      cerrarCarrito();

      if (navMenu && menuToggle) {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    }
  });

  cargarCarrito();
  actualizarCarrito();
  actualizarContenidoCategoria();
  aplicarFiltros();
  actualizarBotonesLimpiar();
});
