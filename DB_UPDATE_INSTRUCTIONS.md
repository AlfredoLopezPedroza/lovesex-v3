# 📊 Instrucciones de Actualización de Base de Datos

## Paso 1: Obtener el Script de Actualización

El archivo `db_update_categories.sql` contiene:
- Las 9 categorías reales
- IDs correctos mapeados
- Instrucciones de actualización

## Paso 2: Aplicar en phpMyAdmin (Hostinger)

1. **Acceder a phpMyAdmin:**
   - Panel de control Hostinger
   - Gestor de bases de datos → phpMyAdmin

2. **Seleccionar la BD:**
   - Selecciona: `u280802741_lovesex_v3`

3. **Importar/Ejecutar SQL:**
   - Ve a la pestaña "SQL"
   - Copia el contenido de `db_update_categories.sql`
   - Pega en el editor
   - Click en "Ejecutar"

**O por archivo:**
1. Ve a "Importar"
2. Sube el archivo `db_update_categories.sql`
3. Click en "Importar"

## Paso 3: Verificar Cambios

Ejecuta esta consulta en phpMyAdmin:

```sql
SELECT * FROM categories;
```

Deberías ver 9 categorías:

| ID | Name | Slug |
|----|------|------|
| 1 | Anillos y Fundas | anillos-y-fundas |
| 2 | Arnés y Fetish | arnes-y-fetish |
| 3 | Cremas y Lubricantes | cremas-y-lubricantes |
| 4 | Masturbadores y Bombas | masturbadores-y-bombas |
| 5 | Retardantes | retardantes |
| 6 | Vibradores | vibradores |
| 7 | Vigorizantes Sexuales | vigorizantes-sexuales |
| 8 | Dildos | dildos |
| 9 | Juguetes Anales | juguetes-anales |

## Paso 4: Verificar Productos

Ejecuta:

```sql
SELECT id, name, category_id FROM products LIMIT 10;
```

Los productos deberían estar asignados a sus categorías correctas.

## Paso 5: Limpiar Cache (Opcional)

Si los cambios no aparecen inmediatamente en el frontend:

1. **En navegador:**
   - Presiona: `Ctrl + Shift + Delete` (borrar historial/cache)
   - O abre con: `Ctrl + Shift + K` (incógnito)

2. **En Hostinger:**
   - Si hay caché de aplicación, limpia en el panel

## Troubleshooting

**Problema:** No veo 9 categorías
- **Solución:** Verifica que ejecutaste el SQL correctamente

**Problema:** Los productos están en categoría 0
- **Solución:** Ejecuta nuevamente la parte de `UPDATE products`

**Problema:** El frontend no muestra filtros dinámicos
- **Solución:** 
  - Borra cache del navegador
  - Verifica que la API `/api/categories` devuelve las 9 categorías

## Rollback (Deshacer)

Si necesitas volver a la versión anterior:

```sql
-- Ejecutar ANTES de aplicar el update
CREATE TABLE categories_backup AS SELECT * FROM categories;
```

---

**Generado:** 01/01/2026
**Sistema:** Love&Sex V3 - Database Migration
