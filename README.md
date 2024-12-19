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
& yarn install
& yarn run start
```

This will switch to the correct version of node, install yarn dependencies,
and then start watching the client files and serving traffic on port TODO.

## Deployment

Run the following script to deploy a new version of the website to AWS.

```PowerShell
# TODO: Setup AWS secrets and write the following script
. ./Release.ps1
```