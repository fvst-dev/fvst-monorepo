
resource "google_sql_database" "database" {
  name     = var.name
  instance = var.postgres_instance_name
}

resource "random_password" "database_password" {
  length = 16
}

resource "google_sql_user" "user" {
  name     = var.name
  password = random_password.database_password.result
  instance = var.postgres_instance_name
}
