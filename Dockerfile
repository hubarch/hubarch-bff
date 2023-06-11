FROM mhart/alpine-node

ARG ENV

COPY . .

RUN npm install
RUN npm run build --env=$ENV

ENV NODE_ENV=$ENV
ENV PATH /node_modules/.bin:$PATH

ENTRYPOINT ["node", "dist/index.js"]