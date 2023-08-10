module "clerk_publishable_key" {
  source   = "../../modules/secret"
  secret_id = "clerk_publishable_key"
}
module "clerk_secret_key" {
  source   = "../../modules/secret"
  secret_id = "clerk_secret_key"
}
