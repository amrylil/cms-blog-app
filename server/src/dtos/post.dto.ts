import { IsString, IsNotEmpty, MinLength, IsMongoId, IsArray, IsOptional } from 'class-validator';

/**
 * DTO untuk memvalidasi data yang masuk saat MEMBUAT post baru.
 * Semua field wajib, kecuali 'tags'.
 */
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
  
  // Admin akan memilih author dari daftar user, jadi kita butuh ID-nya.
  @IsMongoId({ message: 'Invalid Author ID format' })
  @IsNotEmpty({ message: 'Author is required' })
  author!: string;

  // Client akan mengirim ID Kategori dalam bentuk string.
  @IsMongoId({ message: 'Invalid Category ID format' })
  @IsNotEmpty({ message: 'Category is required' })
  category!: string;

  // Tags bersifat opsional. Jika dikirim, harus berupa array berisi MongoID.
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true, message: 'Each tag must be a valid Mongo ID' })
  tags?: string[];
}

/**
 * DTO untuk memvalidasi data yang masuk saat MENGUPDATE post.
 * Semua field bersifat opsional.
 */
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
  
  // Admin juga bisa mengubah author saat melakukan update.
  @IsOptional()
  @IsMongoId({ message: 'Invalid Author ID format' })
  author?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid Category ID format' })
  category?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true, message: 'Each tag must be a valid Mongo ID' })
  tags?: string[];
}
