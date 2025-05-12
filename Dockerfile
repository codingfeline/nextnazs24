# FROM node:23.11-alpine

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 2025

# CMD ["node", "dev"]

# Step 1: Install dependencies
# FROM node:23-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm install

# # Step 2: Build the application
# FROM node:23-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# # Step 3: Run the app in production
# FROM node:23-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# CMD ["npm", "start"]



## Step 1: Install dependencies
# FROM node:23-alpine AS deps
# WORKDIR /app
# RUN apk add --no-cache openssl

# COPY package.json package-lock.json* ./
# RUN npm install

## Step 2: Build Prisma and the app
# FROM node:23-alpine AS builder
# WORKDIR /app
# RUN apk add --no-cache openssl

# COPY . .

## Copy installed deps
# COPY --from=deps /app/node_modules ./node_modules

## Generate Prisma client
# RUN npx prisma generate

## Build the Next.js app
# RUN npm run build

## Step 3: Production image
# FROM node:23-alpine AS runner
# WORKDIR /app
# RUN apk add --no-cache openssl

# ENV NODE_ENV=production

## Copy only necessary files
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/.env ./.env
# EXPOSE 2024
## Start the app
# CMD ["npm", "start"]


### OPTIMISED
# Install dependencies
FROM node:23-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl

# Install only prod deps, but keep lock files
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
RUN apk add --no-cache openssl

# Build the application
FROM node:23-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl

# Copy everything (excluding via .dockerignore)
COPY . .

# Copy prod dependencies
COPY --from=deps /app/node_modules ./node_modules

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Production image
FROM node:23-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Only bring in what's needed
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

# Start the app
CMD ["npm", "start"]


# FROM node:23.11-alpine
# WORKDIR /app
# COPY . .