$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Deploying Minesweeper"

	$stackName = $MyInvocation.MyCommand.Name
	Write-Host "[$(Get-Date)] Ensuring current directory is the project directory"
	Push-Location $PSScriptRoot -StackName $stackName

	Write-Host "[$(Get-Date)] Using NVS to switch to correct node version"
	& nvs use
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Checking if yarn is installed"
	$yarn = Get-Command yarn -ErrorAction SilentlyContinue
	if ($yarn -eq $null) {
		Write-Host "[$(Get-Date)] Installing yarn via corepack"
		& corepack enable
		if ($lastexitcode -ne 0) {
			exit $lastexitcode
		}
	} else {
		Write-Host "[$(Get-Date)] Yarn already installed: $($yarn.Source)"
	}

	Write-Host "[$(Get-Date)] Installing node modules via yarn"
	& yarn install
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Running yarn build-prod"
	& yarn run build-prod
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Setting terraform environment variables"
	$Env:TF_INPUT = 0
	$Env:TF_IN_AUTOMATION = 1

	Write-Host "[$(Get-Date)] Switching to terraform directory"
	Push-Location terraform

	Write-Host "[$(Get-Date)] Initializing terraform"
	& terraform init
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Applying terraform"
	& terraform apply -auto-approve -var "release_version=`"$(Get-Date)`""
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Done!"
	exit 0
} catch {
	Write-Host "[$(Get-Date)] Error"
	Write-Host $_ -ForegroundColor Red
	exit 1
} finally {
	Pop-Location -StackName $stackName
}
