output "SHARED_SECRETS" {
  value = tolist([
    {
      name: "CLERK_ISSUER",
      value_from: module.clerk_issuer.secret
    },
    {
      name: "CLERK_JWSK_URL",
      value_from: module.clerk_jwsk_url.secret
    }
  ])
}
