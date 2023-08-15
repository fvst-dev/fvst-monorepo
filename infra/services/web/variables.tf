variable name {
  type = string
  description = "Google cloud run name as well as docker container name"
}

variable location {
  type = string
  description = "Region/location"
}

variable "docker_tag" {
  type = string
}

variable project {
  type = string
  description = "Project id"
}

variable graphql_gateway {
  type = string
  description = "graphql gateway url"
}
variable "clerk_web_secrets" {
  type = list(object({
    name = string
    value_from = object({
      name = string
      key = string
    })
  }))
  description = "Shared secrets"
}
