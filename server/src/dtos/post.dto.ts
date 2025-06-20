import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

// DTO untuk data yang masuk saat membuat post baru
export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;
}

export class UpdatePostDto {
  @IsOptional() // Tandai sebagai opsional
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title?: string; // Tipe juga dibuat opsional dengan '?'

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  author?: string;
}


export class PostResponseDto {
  id!: string;
  title!: string;
  slug!: string;
  content!: string;
  author!: string;
  createdAt!: Date;
}