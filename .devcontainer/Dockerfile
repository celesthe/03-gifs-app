FROM node:20-bullseye

# Instalar Claude Code como root
USER root
RUN npm install -g @anthropic-ai/claude-code

# Volver al usuario node
USER node
WORKDIR /home/node/app

EXPOSE 5173