output "api_secrets" {
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

output "web_secrets" {
  value = tolist([
    {
      name: "CLERK_PUBLISHABLE_KEY",
      value_from: module.clerk_publishable_key.secret
    },
    {
      name: "CLERK_SECRET_KEY",
      value_from: module.clerk_secret_key.secret
    }
  ])
}
