### Requirements

1. Create a billing account on gcp - https://cloud.google.com/billing/docs/how-to/create-billing-account

- You can get the billing account ID by running `gcloud beta billing accounts list`

2. Setup google cloud sdk on mac: https://jansutris10.medium.com/install-google-cloud-sdk-using-homebrew-on-mac-2952c9c7b5a1
3. Install required dependencies

```shell
brew install jq gh
```

N.B! Make sure you are logged into gh by running

```shell
gh auth status
```

Run the script that sets up environments and github action secrets

```shell
./scripts/init.sh -r "europe-west1" -p "PROJECT PREFIX HERE" -b "BILLING_ACCOUNT_ID"
```