
# Creates the secret
resource "google_secret_manager_secret" "CLERK_ISSUER" {
  provider = google-beta
  secret_id = "clerk_issuer"
  replication {
    automatic = true
  }
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
