import { Controller, Get } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  @SetMetadata("allowUnauthorizedRequest", true)
  check() {
    return { status: "UP" };
  }
}
