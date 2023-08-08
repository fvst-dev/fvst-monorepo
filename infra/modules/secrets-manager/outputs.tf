output "shared_secrets_service_account" {
  value = google_service_account.shared-secrets.email
}
output "CLERK_ISSUER" {
  value = {
    name: google_secret_manager_secret.CLERK_ISSUER.secret_id,
    key: data.google_secret_manager_secret_version.CLERK_ISSUER.version
  }
}
output "CLERK_JWSK_URL" {
  value = {
    name: google_secret_manager_secret.CLERK_JWSK_URL.secret_id,
    key: data.google_secret_manager_secret_version.CLERK_JWSK_URL.version
  }
}

output "SHARED_SECRETS" {
  value = tolist([
    {
      name: "CLERK_ISSUER",
      value_from: {
        name: google_secret_manager_secret.CLERK_ISSUER.secret_id,
        key: data.google_secret_manager_secret_version.CLERK_ISSUER.version
      }
    },
    {
      name: "CLERK_JWSK_URL",
      value_from: {
        name: google_secret_manager_secret.CLERK_JWSK_URL.secret_id,
        key: data.google_secret_manager_secret_version.CLERK_JWSK_URL.version
      }
    }
  ])
}
