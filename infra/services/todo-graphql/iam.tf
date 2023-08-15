resource "google_service_account" "service_account" {
  account_id  = "${var.name}-sa"
  description = "${var.name} SA"
}
resource "google_project_iam_member" "secret_manager_binding" {
  project = var.project
  member  = "serviceAccount:${google_service_account.service_account.email}"
  role    = "roles/secretmanager.secretAccessor"
}
resource "google_project_iam_member" "cloud_sql_binding" {
  project = var.project
  member  = "serviceAccount:${google_service_account.service_account.email}"
  role    = "roles/cloudsql.client"
}
resource "null_resource" "iam_depends_on" {
  depends_on = [google_project_iam_member.secret_manager_binding, google_project_iam_member.cloud_sql_binding]
}
