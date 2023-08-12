module "clerk_issuer" {
  source   = "../../modules/secret"
  secret_id = "clerk_issuer"
}
module "clerk_jwsk_url" {
  source   = "../../modules/secret"
  secret_id = "clerk_jwsk_url"
}

