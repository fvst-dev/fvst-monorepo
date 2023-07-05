output "DATABASE_URL" {
  // TODO: this does not work:
  value = "postgres://${google_sql_user.users.name}@${google_sql_database_instance.postgres.public_ip_address}:5432/${google_sql_database_instance.postgres.name}"
  sensitive = true
}
