output "CLERK_ISSUER" {
  value = jsondecode(data.google_secret_manager_secret_version.clerk-backend.secret_data).CLERK_ISSUER
  sensitive = true
}
output "CLERK_JWSK_URL" {
  value = jsondecode(data.google_secret_manager_secret_version.clerk-backend.secret_data).CLERK_JWSK_URL
  sensitive = true
}
