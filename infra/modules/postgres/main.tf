resource "google_sql_database_instance" "postgres" {
  name             = "postgres"
  database_version = "POSTGRES_14"
  region           = var.region

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = var.tier
  }
}

resource "random_password" "user_password" {
  length = 16
}

resource "google_sql_user" "users" {
  instance = google_sql_database_instance.postgres.name
  name     = "user"
  password = random_password.user_password.result
}
