
output "secret" {
  value = {
    name: google_secret_manager_secret.secret.secret_id,
    key: data.google_secret_manager_secret_version.secret_data.version
  }
}
