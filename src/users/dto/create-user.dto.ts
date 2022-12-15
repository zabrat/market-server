import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'zasdf@mail.ru', description: 'email' })
  readonly email: string;

  @ApiProperty({ example: '5333', description: 'password' })
  readonly password: string;
}
