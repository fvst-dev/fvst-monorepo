resource "google_secret_manager_secret" "clerk-backend" {
  provider = google-beta
  secret_id = "clerk-backend"

  labels = {
    label = "clerk-backend"
  }

  replication {
    automatic = true
  }
}
resource "google_secret_manager_secret_version" "clerk-backend" {
  secret = google_secret_manager_secret.clerk-backend.id
  secret_data = jsonencode({
    CLERK_ISSUER: "CHANGE-ME-IN-GCP-SECRETS-MANAGER",
    CLERK_JWSK_URL: "CHANGE-ME-IN-GCP-SECRETS-MANAGER"
  })
}

data "google_secret_manager_secret_version" "clerk-backend" {
  provider = google-beta
  secret   = google_secret_manager_secret.clerk-backend.secret_id
  depends_on = [google_secret_manager_secret_version.clerk-backend]
}
