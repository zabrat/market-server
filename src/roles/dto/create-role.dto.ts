import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'zasdf@mail.ru', description: 'email' })
  readonly value: string;

  @ApiProperty({ example: '5333', description: 'password' })
  readonly description: string;
}
