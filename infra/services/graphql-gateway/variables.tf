variable name {
  type = string
  description = "Google cloud run name as well as docker container name"
}

variable project {
  type = string
  description = "Project id"
}

variable location {
  type = string
  description = "location"
}

variable "docker_tag" {
  type = string
}

variable env {
  type = list(object({
    name = string
    value = optional(string)
  }))
  default = []
  description = "Environment variables to inject into container instances."
}

variable "services" {
  type = map(object({
    location = string
    project = string
    service_name = string
  }))
}
