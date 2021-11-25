FROM denoland/deno:1.16.3

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY index.ts .

CMD ["run", "--allow-net", "--allow-env", "index.ts"]

