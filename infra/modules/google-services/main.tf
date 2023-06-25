resource "google_project_service" "sqladmin" {
  service = "sqladmin.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "containerregistry" {
  service = "containerregistry.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "redis" {
  service = "redis.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "secrets_manager" {
  service = "secretmanager.googleapis.com"
  disable_on_destroy = true
}
