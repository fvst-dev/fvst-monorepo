output "INSTANCE_NAME" {
  value = google_sql_database_instance.postgres.name
}
output "CONNECTION_NAME" {
  value = google_sql_database_instance.postgres.connection_name
}
