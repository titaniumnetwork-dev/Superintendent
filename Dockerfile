FROM oven/bun:debian

WORKDIR /app

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    curl wget build-essential

COPY package.json /app/package.json
COPY bun.lock /app/bun.lock

RUN bun install

COPY . /app

CMD ["bun", "run", "start"]