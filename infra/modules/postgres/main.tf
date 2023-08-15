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
