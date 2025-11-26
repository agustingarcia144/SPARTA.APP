# Reglas de Organización de Casos de Uso

## Estructura de Carpetas

Cada caso de uso debe seguir esta estructura estándar dentro de `src/feature/`:

```
src/feature/{caso_uso}/
├── service/          # Lógica de negocio y servicios
├── model/            # Modelos de datos y tipos
└── {caso_uso}.jsx    # Componente principal del caso de uso
```

## Ejemplo: Caso de Uso "Users"

```
src/feature/users/
├── service/
│   └── userService.js    # Servicios relacionados con usuarios
├── model/
│   └── userModel.js      # Modelos y tipos de usuario
└── user.jsx              # Componente principal de usuario
```

## Reglas Generales

1. **Nomenclatura de carpetas**: Usar nombres en plural y minúsculas (ej: `users`, `products`, `orders`)

2. **Estructura obligatoria**: Cada caso de uso DEBE tener:
   - Carpeta `service/` para la lógica de negocio
   - Carpeta `model/` para modelos y tipos
   - Archivo `{caso_uso}.jsx` como componente principal

3. **Ubicación**: Todos los casos de uso deben estar dentro de `src/feature/`

4. **Separación de responsabilidades**:
   - `service/`: Llamadas a APIs, transformación de datos, lógica de negocio
   - `model/`: Definiciones de tipos, interfaces, modelos de datos
   - `{caso_uso}.jsx`: Componente React principal del caso de uso

## Ejemplos de Casos de Uso

- `src/feature/users/` - Gestión de usuarios
- `src/feature/products/` - Gestión de productos
- `src/feature/orders/` - Gestión de pedidos
- `src/feature/auth/` - Autenticación

