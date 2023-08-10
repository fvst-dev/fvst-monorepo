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
