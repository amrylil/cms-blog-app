import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty({ message: 'Tag name cannot be empty' })
  name!: string;
}

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Tag name cannot be empty' })
  name?: string;
}