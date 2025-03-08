# Minesweeper Web

Minesweeper for the Web.
Basically, porting this for the third time since the new version of Windows
no longer ships with the old version and the new version from the Microsoft
Store is a pile of garbage (hangs for 10 seconds at a time while waiting for
ads to load).

## Local Setup

Install the latest version of NVS (node version switcher).

```PowerShell
& choco install -y nvs --install-arguments="ALLUSERS=1"
```

## Local Development

Run the following to do local development:

```PowerShell
& nvs use
& corepack enable
& yarn install
& yarn run start
```

This will switch to the correct version of node, install yarn dependencies,
and then start watching the client files and serving traffic on port 8099.

- **Local URL** - http://localhost:8099/

## Prettier

If your editor is not able to load JsPrettier from the zero-installs files
you will need to install it globally:

```PowerShell
npm add -g prettier@^3.3.3
```

## Deployment

Please install the following dependencies to deploy this project:

```PowerShell
choco install -y terraform
choco install -y awscli
```

Configure your AWS CLI credentials for `deployment` IAM user.
Retrieve ID/Key from BitWarden.

```PowerShell
& aws configure
AWS Access Key ID [None]: ...ID...
AWS Secret Access Key [None]: ...Key...
Default region name [None]: us-east-1
Default output format [None]:
```

Run the following script to deploy a new version of the website to AWS.

```PowerShell
. ./Deploy.ps1
```
