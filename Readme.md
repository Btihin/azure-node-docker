# Aplikace pro nasazední docker image na azure

## Sestavení a otestování aplikace lokálně

Spuštění aplikace lokálně

```bash
node index.js
```

Aplikace bude dostupná na adrese [http://localhost:3000](http://localhost:3000)

## Vytvoření Docker image z aplikace

Pro vytvoření Docker image s tagem `helloworldregistr.azurecr.io/hello-world-applikace:v2` použijte následující příkaz:

```bash
docker build -t helloworldregistr.azurecr.io/hello-world-applikace:v2 .
```

## Nasazení image na Azure Container Registry

Pro přihlášení do Azure Container Registry použijte následující příkaz:

```bash
az acr login -n helloworldregistr
```

Poté můžete image nahrát pomocí následujícího příkazu:

```bash
docker push helloworldregistr.azurecr.io/hello-world-applikace:v2
```

## Přepnutí aplikace na nový container

Pro přepnutí aplikace na nový container použijte následující příkaz:

```bash
az webapp config container set -n hello-world -g hello-world-group --container-image-name helloworldregistr.azurecr.io/hello-world-applikace:v2
```

## Adresa aplikace

[hello-world.azurewebsites.net](https://hello-world-g9fya4d9fsasddch.centralus-01.azurewebsites.net/)
