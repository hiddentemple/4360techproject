import {Controller, Get} from '@nestjs/common';

export interface HealthResponse {
  health: "200 OK" // type is the literal string "okay", not a value definition
}

@Controller()
export class AppController {

  @Get("health")
  getHealth(): HealthResponse {
    return { health: "200 OK" };
  }
}
