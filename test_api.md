# Pruebas básicas para la API

Puedes validar los endpoints usando PowerShell, Postman o cualquier cliente HTTP. Aquí tienes ejemplos para cada endpoint:

## SELECT
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/select" -Method Post -Body '{"sql":"SELECT columna1, columna2 FROM NombreTabla WHERE columna3 = ''valor''"}' -ContentType "application/json"
```

## INSERT
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/insert" -Method Post -Body '{"table":"NombreTabla","data":{"columna1":"valor1","columna2":"valor2"}}' -ContentType "application/json"
```

## UPDATE
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/update" -Method Post -Body '{"table":"NombreTabla","data":{"columna1":"nuevoValor"},"where":"columna2 = 'valor2'"}' -ContentType "application/json"
```

## Notas
- Cambia `NombreTabla` y los campos por los reales de tu base de datos.
- Si usas Vercel, reemplaza `localhost:3000` por la URL pública de tu API.
- Verifica que la respuesta sea JSON y que los datos sean correctos.
- Si hay errores, revisa el mensaje de error y los logs del servidor.

---

¿Quieres agregar pruebas automáticas con Jest o algún otro framework?