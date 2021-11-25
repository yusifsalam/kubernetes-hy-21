FROM denoland/deno:1.16.3

WORKDIR /app

# Prefer not to run as root.
USER deno

COPY index.ts .

CMD ["run", "--allow-net", "--allow-env", "index.ts"]

