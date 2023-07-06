output "DATABASE_URL" {
  value = "postgresql://${google_sql_user.users.name}:${urlencode(google_sql_user.users.password)}@localhost:5432/${google_sql_database_instance.postgres.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
  sensitive = true
}
output "CONNECTION_NAME" {
  value = google_sql_database_instance.postgres.connection_name
}
