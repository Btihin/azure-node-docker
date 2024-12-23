# Aplikace pro nasazední docker image na azure

## Připojení do azure

nutno stáhnout az cli

   [azure cli](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

Přihlaste se:

```bash
az login
```

Nastavte předplatné (pokud máte více předplatných):

```bash
az account set --subscription "YOUR_SUBSCRIPTION_NAME"
```

## Vytvoření prostředků v azure

webová aplikace potřebuje mít nějakou skupinu prostředků, plán, aplikaci(webapp) a registr.

### Skupina

Skupina bude složka pro všechny veci související s daným projektem.

```bash
az group create --name test-group --location centralUS
```

### Kontejnery

pro uložení image do azure je potřeba vytvořit registr pro ukládání image.

#### Vytvoření registru

```bash
az acr create --resource-group test-group --name testregistr --sku basic --location centralus
```

#### Získání adresy úložiště

```bash
az acr show --name testregistr --resource-group test-group --query "loginServer" -o tsv
```

#### Vytvoření image

nejlépe rovnou s názvem image a tagem

```bash
docker build -t testregistr.azurecr.io/testovaci-aplikace:v1 .
```

#### Vložení image

Přihlásit se

```bash
az acr login --name testregistr
```

a vložit

```bash
docker push testregistr.azurecr.io/testovaci-aplikace_v:v1
```

### Základ pro web app

#### Plán

```bash
az appservice plan create --name test-plan  --resource-group test-group  --is-linux  --sku F1  --location centralus
```

#### Vytvořit službu web app

Bug

```bash
#az webapp create -n test-app-name --resource-group test-group --plan test-plan --deployment-container-image-name "testregistr.azurecr.io/testovaci-aplikace_v:v1"
```

## Aktualizace aplikace

### Sestavení a otestování aplikace lokálně

Spuštění aplikace lokálně

```bash
node index.js
```

Aplikace bude dostupná na adrese [http://localhost:3000](http://localhost:3000)

### Vytvoření Docker image z aplikace

Pro vytvoření Docker image s tagem `helloworldregistr.azurecr.io/hello-world-applikace:v2` použijte následující příkaz:

```bash
docker build -t helloworldregistr.azurecr.io/hello-world-applikace:v2 .
```

### Nasazení image na Azure Container Registry

Pro přihlášení do Azure Container Registry použijte následující příkaz:

```bash
az acr login -n helloworldregistr
```

Poté můžete image nahrát pomocí následujícího příkazu:

```bash
docker push helloworldregistr.azurecr.io/hello-world-applikace:v2
```

### Přepnutí aplikace na nový container

Pro přepnutí aplikace na nový container použijte následující příkaz:

```bash
az webapp config container set -n hello-world -g hello-world-group --container-image-name helloworldregistr.azurecr.io/hello-world-applikace:v2
```

### Adresa aplikace

[hello-world.azurewebsites.net](https://hello-world-g9fya4d9fsasddch.centralus-01.azurewebsites.net/)