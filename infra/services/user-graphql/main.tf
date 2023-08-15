module "service" {
  name     = var.name
  source   = "../../modules/cloud-run"
  location = var.location
  image    = "us-docker.pkg.dev/${var.project}/registry/${var.name}:${var.docker_tag}"
  service_account_name = google_service_account.service_account.email
  env = concat([
    { name: "NODE_ENV", value: "production" },
    { name: "DATABASE_URL", value: "postgresql://${google_sql_user.user.name}:${urlencode(google_sql_user.user.password)}@localhost:5432/${google_sql_database.database.name}?host=/cloudsql/${var.postgres_connection_name}" },
  ], var.clerk_api_secrets)
  annotations = {
    "run.googleapis.com/cloudsql-instances" = var.postgres_connection_name,
  }
  depends_on = [null_resource.iam_depends_on]
}
