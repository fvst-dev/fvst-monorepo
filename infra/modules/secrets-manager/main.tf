resource "google_service_account" "shared-secrets" {
  account_id  = "shared-secrets-service-account"
  description = "A Service Account for accessing shared secrets"
}
resource "google_project_iam_member" "shared_secrets_sa_secret_binding" {
  project = var.project_id
  member  = "serviceAccount:${google_service_account.shared-secrets.email}"
  role    = "roles/secretmanager.secretAccessor"
}

# Creates the secret
resource "google_secret_manager_secret" "CLERK_ISSUER" {
  provider = google-beta
  secret_id = "clerk_issuer"
  replication {
    automatic = true
  }
}
# Allows everyone access
resource "google_secret_manager_secret_iam_binding" "clerk_issuer_secret_binding" {
  project   = var.project_id
  secret_id = google_secret_manager_secret.CLERK_ISSUER.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members   = [
    "serviceAccount:${google_service_account.shared-secrets.email}",
  ]
}
# Creates the initial value
resource "google_secret_manager_secret_version" "CLERK_ISSUER" {
  provider = google-beta
  secret = google_secret_manager_secret.CLERK_ISSUER.id
  secret_data = "CHANGE-ME-IN-GCP-SECRETS-MANAGER"
}
# Reads the latest secret
data "google_secret_manager_secret_version" "CLERK_ISSUER" {
  provider = google-beta
  secret  = google_secret_manager_secret.CLERK_ISSUER.secret_id
}
# Creates the secret
resource "google_secret_manager_secret" "CLERK_JWSK_URL" {
  provider = google-beta
  secret_id = "clerk_jwsk_url"
  replication {
    automatic = true
  }
}
# Allows everyone access
resource "google_secret_manager_secret_iam_binding" "clerk_jwsk_url_secret_binding" {
  project   = var.project_id
  secret_id = google_secret_manager_secret.CLERK_JWSK_URL.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members   = [
    "serviceAccount:${google_service_account.shared-secrets.email}",
  ]
}
# Creates the initial value
resource "google_secret_manager_secret_version" "CLERK_JWSK_URL" {
  secret = google_secret_manager_secret.CLERK_JWSK_URL.id
  secret_data = "CHANGE-ME-IN-GCP-SECRETS-MANAGER"
}
# Reads the latest secret
data "google_secret_manager_secret_version" "CLERK_JWSK_URL" {
  provider = google-beta
  secret  = google_secret_manager_secret.CLERK_JWSK_URL.secret_id
}
