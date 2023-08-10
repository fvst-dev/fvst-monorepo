module "service" {
  name     = var.name
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "us-docker.pkg.dev/${var.project}/registry/${var.name}:${var.docker_tag}"
  service_account_name = google_service_account.service_account.email
  env = [
    { name: "NEXT_PUBLIC_GRAPHQL_GATEWAY", value: var.graphql_gateway },
    { name: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", value_from:  module.clerk_publishable_key.secret },
    { name: "CLERK_SECRET_KEY", value_from:  module.clerk_secret_key.secret },
  ]
  allow_public_access = true
}
