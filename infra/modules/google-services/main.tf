resource "google_project_service" "containerregistry" {
  project = var.project
  service = "containerregistry.googleapis.com"
  disable_on_destroy = true
  disable_dependent_services = true
}

resource "google_project_service" "redis" {
  project = var.project
  service = "redis.googleapis.com"
}
