# Creación de package.json
- npm init

# Librerias usadas
- npm i cors = Permitir o bloquear acceso a backend
- npm i morgan = Para ver logs
- npm i express = Aplicación js en backend
- npm i mongoose = Permite conexión a mongoDB
- npm i bcryptjs = Encriptar o desencriptar contraseñas
- npm i jsonwebtoken = Token a nuestro frontend y analizar cuando nos lo envien
- 

# Instalar extensión DotENV en vscode (opcional)

# Extensiones para desarrolladores (opcional)
- npm i dotenv --save-dev
- npm i nodemon --save-dev

# Librerias para facilitar el desarrollo (opcional)
- npm i @types/cors --save-dev
- npm i @types/morgan --save-dev
- npm i @types/express --save-dev
- npm i @types/jsonwebtoken --save-dev
- npm i @types/bcryptjs --save-dev

# Agregar TypeScript
- tsc --init

# Quitar comentario en el tsconfig.json
- "outDir": "./build",

# Agregar dos scrypts en el package.json
- "dev": "nodemon build/server.js"
- "build": "tsc -w"

# Vamos a crear el cascaron de las carpetas
- src
    - config
    - controllers
    - dao
    - entity
    - middleware
    - routes
    - schemas