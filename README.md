# Cj_API

API REST en Node.js + Express para integración con SQL Server.

## Características
- Conexión a SQL Server usando el paquete `mssql`.
- Endpoints para SELECT, INSERT y UPDATE en diferentes tablas.
- Configuración lista para despliegue en Vercel.

## Estructura básica
- `/api` - Endpoints principales
- `/db` - Configuración y utilidades de base de datos
- `vercel.json` - Configuración para Vercel

## Despliegue
1. Clona el repositorio desde GitHub: https://github.com/Amaya2711/Cj_API
2. Instala dependencias: `npm install`
3. Configura variables de entorno en Vercel para las credenciales de SQL Server.
4. Despliega directamente desde Vercel conectado a GitHub.

## Variables de entorno sugeridas
```
DB_SERVER=161.132.48.29,8966
DB_DATABASE=JC_Db
DB_USER=sa
DB_PASSWORD=@3IS0@ejwU4A7VOHba990
DB_POOL_MIN=0
DB_POOL_MAX=100
DB_TRUST_CERT=true
DB_TIMEOUT=30
```


## Uso
Puedes enviar una sentencia SQL personalizada en los endpoints:

- `/api/select` (POST):
	```json
	{
		"sql": "SELECT * FROM constante WHERE campo = 'estado_log'"
	}
	```

- `/api/insert` (POST):
	```json
	{
		"sql": "INSERT INTO constante VALUES ('PE01','MAESTRO','ESTADO_LOG',55,'PRUEBA','PRUEBA API','','')"
	}
	```

- `/api/update` (POST):
	```json
	{
		"sql": "UPDATE constante SET ValorIni = 'NUEVO' WHERE Correlativo = 55"
	}
	```

También puedes seguir usando los parámetros estándar `table`, `data`, `where` si lo prefieres.

### Ejemplo con PowerShell
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/select" -Method Post -Body '{"table":"NombreTabla"}' -ContentType "application/json"
```

### Seguridad
- No expongas credenciales en el código fuente.
- Usa variables de entorno en Vercel para las credenciales.
- Valida y sanitiza los parámetros recibidos para evitar inyecciones SQL.

---

## Configuración de variables de entorno en Vercel
En el dashboard de Vercel, ve a tu proyecto > Settings > Environment Variables y agrega:

- `DB_SERVER=161.132.48.29,8966`
- `DB_DATABASE=JC_Db`
- `DB_USER=sa`
- `DB_PASSWORD=@3IS0@ejwU4A7VOHba990`
- `DB_POOL_MIN=0`
- `DB_POOL_MAX=100`
- `DB_TRUST_CERT=true`
- `DB_TIMEOUT=30`

Guarda y despliega el proyecto. Nunca publiques credenciales sensibles en el repositorio.
