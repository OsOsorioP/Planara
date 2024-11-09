const Api = {

    URL: "http://localhost:5000",

    CREAR_USUARIO: "/api/publica/usuario/crear",
    INICIAR_SESION: "/api/publica/usuario/iniciar",

    USUARIOS_OBTENER: "/api/privada/usuario/todos",
    USUARIOS_CREAR: "/api/privada/usuario/crear",
    USUARIOS_ELIMINAR: "/api/privada/usuario/eliminar",
    USUARIOS_OBTENER_UNO: "/api/privada/usuario/uno",
    USUARIOS_ACTUALIZAR: "/api/privada/usuario/actualizar",

    PERFILES_OBTENER: "/api/privada/perfil/todos",
    PERFILES_CREAR: "/api/privada/perfil/crear",
    PERFILES_ELIMINAR: "/api/privada/perfil/eliminar",
    PERFILES_OBTENER_UNO: "/api/privada/perfil/uno",
    PERFILES_ACTUALIZAR: "/api/privada/perfil/actualizar",

    TAREAS_OBTENER: "/api/privada/tarea/todos",
    TAREAS_CREAR: "/api/privada/tarea/crear",
    TAREAS_ELIMINAR: "/api/privada/tarea/eliminar",
    TAREAS_OBTENER_UNO: "/api/privada/tarea/uno",
    TAREAS_ACTUALIZAR: "/api/privada/tarea/actualizar",
    
};
 
export default Api;