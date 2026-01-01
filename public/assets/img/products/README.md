# 📁 Estructura de Imágenes - Love&Sex V3

## Organización de Carpetas

Las imágenes de productos están organizadas por categoría en la siguiente estructura:

```
public/assets/img/products/
├── anillos-y-fundas/          (ID: 1)
├── arnes-y-fetish/             (ID: 2)
├── cremas-y-lubricantes/       (ID: 3)
├── masturbadores-y-bombas/     (ID: 4)
├── retardantes/                (ID: 5)
├── vibradores/                 (ID: 6)
├── vigorizantes-sexuales/      (ID: 7)
├── dildos/                      (ID: 8)
└── juguetes-anales/            (ID: 9)
```

## Nomenclatura de Archivos

Los archivos de imagen deben nombrarse con el **SKU del producto en minúsculas** con extensión `.jpg`:

**Ejemplo:**
- SKU: `DP-CRISTAL3` → Archivo: `dp-cristal3.jpg`
- SKU: `VV-MARTILLO` → Archivo: `vv-martillo.jpg`
- SKU: `PS-GOLD` → Archivo: `ps-gold.jpg`

## Ruta de Imagen Dinámica

El frontend genera automáticamente la ruta de imagen basada en:
1. **Categoría slug** (extraído de `category.name`)
2. **SKU del producto** (en minúsculas)

**Ejemplo:**
- Categoría: "Dildos" → slug: "dildos"
- SKU: "DP-CRISTAL3" → sku en minúsculas: "dp-cristal3"
- Ruta final: `/assets/img/products/dildos/dp-cristal3.jpg`

## Procedimiento de Carga

### 1. Preparar las Imágenes
- Garantizar que sean formato JPG
- Renombrar según SKU en minúsculas
- Optimizar para web (300x300px mínimo)

### 2. Cargar en Hostinger
- Acceder a Gestor de Archivos en panel de control
- Navegar a: `public/assets/img/products/`
- Crear subcarpeta de categoría si no existe
- Subir archivo JPG con nombre correcto

### 3. Alternativa: FTP/SFTP
```bash
ftp> cd public/assets/img/products/dildos/
ftp> put dp-cristal3.jpg
ftp> put vv-martillo.jpg
```

### 4. Verificar en el Frontend
- Acceder a: https://lightgreen-dog-830375.hostingersite.com/
- Las imágenes deberían aparecer automáticamente
- Si no, verifica:
  - Nombre del archivo coincide con SKU en minúsculas
  - Categoría slug es correcto
  - Archivo está en la carpeta correcta

## Placeholder Automático

Si una imagen no se encuentra, el sistema muestra automáticamente:
```
https://via.placeholder.com/300x300?text=NOMBRE_PRODUCTO
```

Esto permite trabajar sin todas las imágenes listas, completándolas progresivamente.

## Mapeo de Categorías

| ID | Nombre | Slug | Carpeta |
|----|--------|------|---------|
| 1 | Anillos y Fundas | anillos-y-fundas | anillos-y-fundas |
| 2 | Arnés y Fetish | arnes-y-fetish | arnes-y-fetish |
| 3 | Cremas y Lubricantes | cremas-y-lubricantes | cremas-y-lubricantes |
| 4 | Masturbadores y Bombas | masturbadores-y-bombas | masturbadores-y-bombas |
| 5 | Retardantes | retardantes | retardantes |
| 6 | Vibradores | vibradores | vibradores |
| 7 | Vigorizantes Sexuales | vigorizantes-sexuales | vigorizantes-sexuales |
| 8 | Dildos | dildos | dildos |
| 9 | Juguetes Anales | juguetes-anales | juguetes-anales |

## Ejemplo Práctico

**Producto en BD:**
```
SKU: DP-CRISTAL3
Nombre: DILDO JUMBO DE CRISTAL
Categoría ID: 8 (Dildos)
```

**Imagen necesaria:**
```
Ruta: /assets/img/products/dildos/dp-cristal3.jpg
Nombre: dp-cristal3.jpg
```

**URL en Frontend:**
```html
<img src="/assets/img/products/dildos/dp-cristal3.jpg" />
```

---

**Creado:** 01/01/2026
**Sistema:** Love&Sex V3 - Frontend Dinámico
