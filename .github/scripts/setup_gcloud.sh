
gcloud projects create fvst-staging1 --name "FVST Staging1"
gcloud config set project fvst-staging1


gcloud components install alpha 
gcloud components install beta 

gcloud services enable cloudbilling.googleapis.com

gcloud alpha billing projects link fvst-staging1 --billing-account 01AEBE-A2F4CA-DC0648

gcloud services enable cloudresourcemanager.googleapis.com compute.googleapis.com sqladmin.googleapis.com run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com servicenetworking.googleapis.com vpcaccess.googleapis.com


gcloud sql instances create quickstart-instance --database-version=POSTGRES_14 --cpu=1 --memory=4GB --region=europe-north1 --root-password=fvst

gcloud sql databases create fvst --instance=quickstart-instance

gcloud sql users create fvst --instance=quickstart-instance --password=fvst

gcloud run deploy auth-service --image gcr.io/decent-cable-377207/fvst-monorepo-auth:latest1 --add-cloudsql-instances quickstart-instance --region europe-north1 --set-env-vars DATABASE_URL="postgresql://fvst:fvst@localhost/fvst?host=/cloudsql/decent-cable-377207:europe-north1:quickstart-instance" --set-env-vars NODE_ENV=development --allow-unauthenticated
 
 
 