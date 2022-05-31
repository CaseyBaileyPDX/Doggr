FROM node:16

ENV MINIO_HOST=nginx
ENV MINIO_PORT=8000
ENV MINIO_USER=minioUser
ENV MINIO_PASS=minioPass
ENV PGUSER=doggr_user
ENV PGHOST=postgres
ENV PGPASSWORD=doggr_pass
ENV PGDATABASE=doggrdb
ENV PGPORT=5432

# sets the working directory to /app
WORKDIR /app
RUN apt-get update
# we can remove these once we're done tinkering
#RUN apt-get install -y nano

# Install EXACTLY the dependency versions, not latest
#COPY package.json package-lock.json ./

# If building for prod, we don't need dev deps, so can run
# > npm ci --only=prod
ENV TOKEN_SECRET=116A4857D1AC06E749417ED52EFDA0AECC534A35B5C6416A08DB355921BDF6CD

COPY --chown=node:node . .

RUN npm install
# We ignore the local .env, but need to use the docker one in its place
#RUN mv easyenv.docker .env
EXPOSE 9000

# Note you should be more extensive here if worried about deploying to Prod
# This doesn't work because the seed runs during image creation rather than container
#RUN npm run seed
RUN npm run build
CMD ["npm", "run", "docker"]

