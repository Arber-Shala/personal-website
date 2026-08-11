
# ---- Base image ----
# Using a small, current LTS Node image. Alpine keeps the final image tiny.
FROM node:20-alpine
 
# ---- App directory ----
WORKDIR /app
 
# ---- Install dependencies ----
# Copying just the manifests first means Docker only re-runs npm install
# when package.json/package-lock.json change, not on every source edit.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
 
# ---- Copy the rest of the project ----
# Expected layout (matches index.js's routing logic):
#   /app/index.js
#   /app/templates/index.html
#   /app/templates/contact.html
#   /app/templates/resume.html
#   /app/static/css/style.css
#   /app/static/css/contact.css
#   /app/static/images/*.jpg
#   /app/static/resources/Resume.pdf
COPY . .
 
# ---- Run as a non-root user for better security ----
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
 
# ---- Network ----
ENV PORT=3000
EXPOSE 3000
 
# ---- Start the server ----
CMD ["node", "index.js"]