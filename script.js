// ===== CAPTURA DE ELEMENTOS DEL DOM =====
const form = document.getElementById('registroForm');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputTelefono = document.getElementById('telefono');
const inputPassword = document.getElementById('password');
const confirmacion = document.getElementById('confirmacion');
const listaUsuarios = document.getElementById('listaUsuarios');

// Array para almacenar los usuarios registrados
const usuarios = [];

// ===== FUNCIÓN DE VALIDACIÓN =====
function validarCampos() {
  let valido = true;

  // Limpiar errores anteriores
  limpiarErrores();

  // Validar nombre
  if (inputNombre.value.trim() === '') {
    mostrarError('errorNombre', 'El nombre es obligatorio.', inputNombre);
    valido = false;
  }

  // Validar correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (inputCorreo.value.trim() === '') {
    mostrarError('errorCorreo', 'El correo es obligatorio.', inputCorreo);
    valido = false;
  } else if (!regexCorreo.test(inputCorreo.value.trim())) {
    mostrarError('errorCorreo', 'Ingresa un correo válido.', inputCorreo);
    valido = false;
  }

  // Validar teléfono
  if (inputTelefono.value.trim() === '') {
    mostrarError('errorTelefono', 'El teléfono es obligatorio.', inputTelefono);
    valido = false;
  }

  // Validar contraseña
  if (inputPassword.value.trim() === '') {
    mostrarError('errorPassword', 'La contraseña es obligatoria.', inputPassword);
    valido = false;
  } else if (inputPassword.value.trim().length < 6) {
    mostrarError('errorPassword', 'La contraseña debe tener al menos 6 caracteres.', inputPassword);
    valido = false;
  }

  return valido;
}

// ===== MOSTRAR MENSAJE DE ERROR =====
function mostrarError(idSpan, mensaje, inputElement) {
  document.getElementById(idSpan).textContent = mensaje;
  inputElement.classList.add('invalido');
}

// ===== LIMPIAR ERRORES =====
function limpiarErrores() {
  document.getElementById('errorNombre').textContent = '';
  document.getElementById('errorCorreo').textContent = '';
  document.getElementById('errorTelefono').textContent = '';
  document.getElementById('errorPassword').textContent = '';

  inputNombre.classList.remove('invalido');
  inputCorreo.classList.remove('invalido');
  inputTelefono.classList.remove('invalido');
  inputPassword.classList.remove('invalido');

  confirmacion.className = 'confirmacion';
  confirmacion.textContent = '';
}

// ===== INSERTAR USUARIO EN EL DOM =====
function mostrarUsuarios() {
  listaUsuarios.innerHTML = '';

  if (usuarios.length === 0) return;

  const titulo = document.createElement('h2');
  titulo.textContent = 'Usuarios registrados';
  listaUsuarios.appendChild(titulo);

  usuarios.forEach(function (usuario) {
    const card = document.createElement('div');
    card.classList.add('usuario-card');
    card.innerHTML = `
      <strong>Nombre:</strong> ${usuario.nombre}<br>
      <strong>Correo:</strong> ${usuario.correo}<br>
      <strong>Teléfono:</strong> ${usuario.telefono}
    `;
    listaUsuarios.appendChild(card);
  });
}

// ===== EVENTO DE ENVÍO DEL FORMULARIO =====
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validarCampos()) {
    // Capturar datos del formulario
    const nuevoUsuario = {
      nombre: inputNombre.value.trim(),
      correo: inputCorreo.value.trim(),
      telefono: inputTelefono.value.trim()
    };

    // Guardar en el array
    usuarios.push(nuevoUsuario);

    // Mostrar mensaje de confirmación
    confirmacion.textContent = '✅ ¡Registro exitoso! Bienvenido, ' + nuevoUsuario.nombre + '.';
    confirmacion.classList.add('exito');

    // Insertar datos en pantalla mediante DOM
    mostrarUsuarios();

    // Limpiar el formulario
    form.reset();
  }
});
