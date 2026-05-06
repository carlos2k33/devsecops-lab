# DevSecOps Lab

Repositorio de laboratorio para práctica de DevSecOps — pipeline de seguridad completo sobre una app Node.js + Express dockerizada.

## Stack tecnológico

- Node.js 20
- Express 5
- Docker (Alpine Linux)

## Pipeline de seguridad (DevSecOps)

Pipeline automatizado que corre en cada push y pull request hacia `main`.

### Herramientas configuradas

| Herramienta | Tipo | Qué hace |
|-------------|------|----------|
| Dependabot | SCA | Escanea dependencias con CVEs semanalmente y abre PRs automáticos |
| GitLeaks | Secrets scanning | Escanea el historial de git buscando credenciales o API keys expuestas |
| Semgrep | SAST | Análisis estático del código con reglas OWASP Top 10 |
| Trivy | Container scanning | Escanea la imagen Docker buscando CVEs en el SO base y dependencias |

### Flujo del pipeline

Push / Pull Request hacia main
1. GitLeaks — detecta secretos en el historial completo
2. Semgrep — analiza el código con reglas OWASP Top 10
3. Docker build — construye la imagen del contenedor
4. Trivy — escanea la imagen buscando CVEs en Alpine Linux y node_modules
5. npm install — instala dependencias
6. Verificación de arranque

### Capas escaneadas por Trivy

Trivy analiza todas las capas de la imagen Docker:

- Sistema operativo base (Alpine Linux 3.23)
- Runtime de Node.js 20
- Dependencias npm del proyecto

### Decisiones de seguridad documentadas

CVEs listados en `.trivyignore` — dependencias transitivas de Express 5 sin fix compatible disponible a Mayo 2026. Riesgo aceptado para entorno de laboratorio. Se revisará cuando Express publique versiones con dependencias actualizadas.

| CVE | Paquete | Tipo |
|-----|---------|------|
| CVE-2024-21538 | cross-spawn | ReDoS |
| CVE-2025-64756 | glob | Command Injection |
| CVE-2026-26996 | minimatch | DoS |
| CVE-2026-27903 | minimatch | DoS |
| CVE-2026-27904 | minimatch | DoS |
| CVE-2026-23745 | tar | Path Traversal |
| CVE-2026-23950 | tar | File Overwrite |
| CVE-2026-24842 | tar | Path Traversal |
| CVE-2026-26960 | tar | File Read/Write |
| CVE-2026-29786 | tar | Path Traversal |
| CVE-2026-31802 | tar | File Overwrite |

## Correr localmente

Construir la imagen:

docker build -t devsecops-lab:latest .

Correr el contenedor:

docker run -p 3000:3000 devsecops-lab:latest

Verificar que responde:

curl http://localhost:3000