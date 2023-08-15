resource "google_secret_manager_secret" "secret" {
  provider = google-beta
  secret_id = var.secret_id
  replication {
    automatic = true
  }
  provisioner "local-exec" {
    command = "sleep 3"
  }
}
# Creates the initial value
resource "google_secret_manager_secret_version" "secret_version" {
  provider = google-beta
  secret = google_secret_manager_secret.secret.id
  secret_data = "CHANGE-ME-IN-GCP-SECRETS-MANAGER"
  depends_on = [google_secret_manager_secret.secret]
}
# Reads the latest secret
data "google_secret_manager_secret_version" "secret_data" {
  provider = google-beta
  secret  = google_secret_manager_secret.secret.secret_id
  depends_on = [google_secret_manager_secret_version.secret_version]
}
