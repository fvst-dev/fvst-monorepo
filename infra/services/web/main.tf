module "service" {
  name     = var.name
  source   = "../../modules/cloud-run"
  location = var.location
  image    = "us-docker.pkg.dev/${var.project}/registry/${var.name}:${var.docker_tag}"
  service_account_name = google_service_account.service_account.email
  env = concat([
    { name: "GRAPHQL_GATEWAY", value: var.graphql_gateway },
  ], var.clerk_web_secrets)
  allow_public_access = true
  depends_on = [null_resource.iam_depends_on]
}
