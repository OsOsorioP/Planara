const opcionesAdmin = [
    { nombre: "Acerca de", icono: "fa-solid fa-address-card", ruta: "/dashboard/about", hijos: [], },
    {
        nombre: "Perfiles", icono: "fa-regular fa-clipboard", ruta: "/dashboard", hijos: [
            { nombre: "Listado", icono: "fa-solid fa-table", ruta: "/dashboard/listprofiles", },
            { nombre: "Nuevo", icono: "fa-solid fa-plus", ruta: "/dashboard/addprofile", },
            { nombre: "Administración", icono: "fa-solid fa-hammer", ruta: "/dashboard/admprofile", },
        ],
    },
    {
        nombre: "Usuarios", icono: "fa-regular fa-clipboard", ruta: "/dashboard", hijos: [
            { nombre: "Listado", icono: "fa-solid fa-table", ruta: "/dashboard/listuser", },
            { nombre: "Nuevo", icono: "fa-solid fa-plus", ruta: "/dashboard/adduser", },
            { nombre: "Administración", icono: "fa-solid fa-hammer", ruta: "/dashboard/admuser", },
        ],
    },
]

const opcionesUsuario = [
    { nombre: "Panel", icono: "fa-solid fa-address-card", ruta: "/dashboard", hijos: [], },
    {nombre: "Tareas", icono: "fa-regular fa-clipboard", ruta: "/dashboard/listtask", hijos: [],},
    { nombre: "Ayuda y Soporte", icono: "fa-solid fa-circle-question", ruta: "/dashboard/about", hijos: [], }
]

export { opcionesAdmin, opcionesUsuario }