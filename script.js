
import { addDragEventToCard } from "./cart.js";

// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");
const productList = document.getElementById("productList");

// Lista estática de productos
//JSON de productos


import { getTasks, postTasks, deleteTask, saveTask } from "./apiservice.js";
let productos = getTasks();

  //Función para crear las cartas de los productos.

  /*
    assignedTo: "Rodrigo Lujambio",-
    comments: [],-
    description: "Description for Task 1",-
    endDate: "31/12/2024",-
    id: "1",-
    priority: "Low",
    startDate: "01/01/2024",-
    status: "To Do",-
    title: "Task 1"-
  */


    const createCard = (e) => {
      const card = document.createElement('div');
      card.className = 'card product-card';
  
      // Añadir contenido editable a la tarjeta
      card.innerHTML = `
          <div class="media-content">
            <input class="input titulo_task" value="${e.title}" disabled />
            <input class="input assingedTo" value="${e.assignedTo}" disabled />
            <input class="input status" value="${e.status}" disabled />
            <input class="input priority" value="${e.priority}" disabled />
            <input class="input description" value="${e.description}" disabled />
            <input class="input startDate" value="${e.startDate}" disabled />
            <input class="input endDate" value="${e.endDate}" disabled />
            <p class="id">${e.id}</p>
            <button class="button is-danger delete-task-btn" data-id="${e.id}">Eliminar</button>
            <button class="button is-warning edit-task-btn" data-id="${e.id}">Editar</button>
            <button class="button is-success save-task-btn" data-id="${e.id}" style="display: none;">Guardar</button>
        </div>
      `;
      
      document.getElementById('productList').appendChild(card);
  
      // Botón de editar
      const editButton = card.getElementsByClassName('edit-task-btn')[0];
      const saveButton = card.getElementsByClassName('save-task-btn')[0];
      
      editButton.addEventListener("click", () => {
          const inputs = card.getElementsByClassName('input'); 
          for (let input of inputs) {
              input.disabled = false;  
          }
          saveButton.style.display = 'block';  
          editButton.style.display = 'none';  
      });
  
      saveButton.addEventListener("click", () => saveTask(e.id, card));
  
      // Evento de eliminar
      const deleteButton = card.getElementsByClassName('delete-task-btn')[0];
      deleteButton.addEventListener("click", () => deleteTask(e.id));
  };




// Guardar los productos en el LocalStorage para que no se pierdan al hacer refresh en la página
const saveProductsOnLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(dynamicProducts));
}

const create_product_button = document.getElementById("button_crear_producto");
const nombre_producto = document.getElementById("input_nombre");
const precioProducto = document.getElementById("input_precio");
const descripcion_producto = document.getElementById("descripcion_input");
const categoria = document.getElementById("input_categoria");




const crearURLDinamica = (file, callback) => {
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", () => {
    callback(fr.result);
  });
}

let category = [];

// Crear producto al darle click al botón guardar
const createProduct = async () => {
    const nuevoProducto = {
    'assignedTo': document.getElementById('assignedTo').value,
    'comments':document.getElementById('comments').value,
    'description': document.getElementById('description').value,
    'endDate': document.getElementById('endDate').value,
    'priority': document.getElementById('priority').value,
    'startDate':document.getElementById('startDate').value,
    'status':document.getElementById('status').value ,
    'title': document.getElementById('title').value


    };
    console.log(nuevoProducto);
    const newTask = await postTasks(nuevoProducto);
 
}

create_product_button.addEventListener("click", createProduct);


// Función para limpiar el array de productos y el array de categorías del Local Storage
const cleanProductsAndCategoryArray = () => {
  dynamicProducts = [];
  saveProductsOnLocalStorage();
  cleanProductList();

  products = [...staticProducts]; // Reinicia la lista a los productos estáticos
  products.forEach(createCard); // Vuelve a mostrar los productos estáticos

  category = [];
  createDropdownItemsCategory(category);
};

// Modal
const openModalButton = document.getElementById("open_Modal_Button");
const closeModalButton = document.getElementById("close_Modal_Button");
const cancelModalButton = document.getElementById("cancel_Modal_Button");
const productModal = document.getElementById("product_Modal");

openModalButton.addEventListener("click", () => {
  productModal.classList.add("is-active")
});

cancelModalButton.addEventListener("click", () => {
  productModal.classList.remove("is-active");
});
create_product_button.addEventListener("click", () => {
  productModal.classList.remove("is-active");
});

const cleanProductList = () => {
  productList.innerHTML = "";
}

const noProductosMessage = () => {
  productList.innerHTML = "No se encontraron productos";
}

document.addEventListener("DOMContentLoaded", async () => {
  const tasks = await getTasks();
  console.log(tasks);
  tasks.forEach((e) => {
    if (!category.includes(e.priority)) {
      category.push(e.priority);
    }
    createCard(e);
  });

  createDropdownItemsCategory(category);
});

const filterProducts = () => {
  const valorInput = input.value.toLowerCase();

  // Primero filtramos los productos que coinciden con el valor del input
  const productosFiltrados = products.filter((e) => {
    const tituloProducto = e.nombre.toLowerCase();
    return tituloProducto.includes(valorInput);
  });

  if (productosFiltrados.length > 0) {
    cleanProductList();
    productosFiltrados.forEach((e) => {
      createCard(e);
    });
  } else {
    noProductosMessage();
  }
};

input.addEventListener("input", filterProducts);

// Dropdown de filtros.
const dropdown_button = document.getElementById("dropdown_button");
const dropdownMenu = document.getElementsByClassName("dropdown")[0];

dropdown_button.addEventListener("click", () => {
  dropdownMenu.classList.toggle('is-active');
});

// Filtrado Default
const buttonDefault = document.getElementById("boton_default");

const productosFiltradosDefault = () => {
  cleanProductList();

  products.forEach((f) => {
    createCard(f);
  });
}

buttonDefault.addEventListener("click", productosFiltradosDefault);

// Filtrado MenorPrecio
const buttonMenorPrecio = document.getElementById("boton_menor_precio");

const productosFiltradosMenorPrecio = () => {
  cleanProductList();

  // Slice para no modificar el array original.
  const sortedProducts = products.slice().sort((a, b) => a.precio - b.precio);

  sortedProducts.forEach((e) => {
    createCard(e);
  });
}

buttonMenorPrecio.addEventListener("click", productosFiltradosMenorPrecio);

// Filtrado mayorPrecio
const buttonMayorPrecio = document.getElementById("boton_mayor_precio");

const filtradoMayorPrecio = () => {
  cleanProductList();

  // Slice para no modificar el array original.
  const sortedProducts = products.slice().sort((a, b) => b.precio - a.precio);

  sortedProducts.forEach((e) => {
    createCard(e);
  });
}

buttonMayorPrecio.addEventListener("click", filtradoMayorPrecio);

// Dropdown categorías dinámico.
const dropdown_button_category = document.getElementById("dropdown_button_category");
const dropdownMenuCategory = document.getElementsByClassName("dropdown")[1];

const createDropdownItemsCategory = (categories) => {
  const dropdownContentCat = document.getElementById('dropdown-content-category');
  dropdownContentCat.innerHTML = '';

  categories.forEach(categoria => {


    dropdownContentCat.appendChild(a);
  });
}

dropdown_button_category.addEventListener("click", () => {
  dropdownMenuCategory.classList.toggle('is-active');
  category.forEach(categoria => {
    createAction(`categoria_${categoria.toLowerCase()}`);
  });
});

// Función para crear la acción de los items del dropdown de categorías.
const createAction = (dropdownId) => {
    const dropdownItem = document.getElementById(dropdownId);
    
    dropdownItem.addEventListener('click', () => {
        const category = dropdownItem.textContent;
        productList.innerHTML = '';
        const filteredProducts = products.filter((product) => product.categoria === category);
        filteredProducts.forEach((product) => {
            createCard(product);
        });
    });
}

//Modal de productos
document.addEventListener('DOMContentLoaded', () => {
  const productModal = document.getElementById('productModal'); 
  const modalCloseButtons = document.querySelectorAll('.modal .delete, #modal-close-button');

  // Función para abrir el modal y mostrar la información del producto
  const openModal = (product) => {
    document.getElementById('modal-product-name').textContent = product.nombre;
    document.getElementById('modal-product-description').textContent = product.descripcion;
    document.getElementById('modal-product-price').textContent = `$${product.precio}`;
    document.getElementById('modal-product-image').src = product.imagen;

    // Mostrar el modal
    productModal.classList.add('is-active');
  };

  // Función para cerrar el modal
  const closeModal = () => {
    productModal.classList.remove('is-active');
  };

  // Agregar evento a los botones de cierre del modal
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  // Capturar el clic en las tarjetas de productos
  const productList = document.getElementById('productList');

  productList.addEventListener('click', (event) => {
    const card = event.target.closest('.product-card'); 
    if (card) {   
       const product = {
        nombre: card.querySelector('.titulo_producto').textContent, 
        descripcion: card.querySelector('.content').textContent, 
        precio: card.querySelector('.subtitle').textContent.replace('$', ''), 
        imagen: card.querySelector('img').src,
      };
      openModal(product);
    }
  });
});

// Funcion para traer devuelta las tarjetas del backend

const refreshTasks =  async () => {
  cleanProductList();

  const tasks = await getTasks();

  tasks.forEach((e) => {
    createCard(e);
  });
};



