variable name {
  type = string
  description = "Google cloud run name as well as docker container name"
}

variable region {
  type = string
  description = "Region"
}

variable "docker_tag" {
  type = string
  default = "latest"
}

variable project {
  type = string
  description = "Project id"
}

variable postgres_instance_name {
  type = string
  description = "postgres_instance_name"
}

variable postgres_connection_name {
  type = string
  description = "postgres_connection_name"
}

variable "shared_secrets" {
  type = list(object({
    name = string
    value_from = object({
      name = string
      key = string
    })
  }))
  description = "Shared secrets"
}
