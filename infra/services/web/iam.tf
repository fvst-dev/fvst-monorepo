resource "google_service_account" "service_account" {
  account_id  = "${var.name}-sa"
  description = "${var.name} SA"
}
resource "google_project_iam_member" "secret_manager_binding" {
  project = var.project
  member  = "serviceAccount:${google_service_account.service_account.email}"
  role    = "roles/secretmanager.secretAccessor"
}
