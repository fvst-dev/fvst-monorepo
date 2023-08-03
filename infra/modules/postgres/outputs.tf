output "DATABASE_URL_BLOG" {
  value = "postgresql://${google_sql_user.users.name}:${urlencode(google_sql_user.users.password)}@localhost:5432/${google_sql_database.blog.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
  sensitive = true
}
output "DATABASE_URL_TODO" {
  value = "postgresql://${google_sql_user.users.name}:${urlencode(google_sql_user.users.password)}@localhost:5432/${google_sql_database.todo.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
  sensitive = true
}
output "DATABASE_URL_USER" {
  value = "postgresql://${google_sql_user.users.name}:${urlencode(google_sql_user.users.password)}@localhost:5432/${google_sql_database.user.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
  sensitive = true
}
output "CONNECTION_NAME" {
  value = google_sql_database_instance.postgres.connection_name
}
