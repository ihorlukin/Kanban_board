import { IsBoolean, IsOptional, IsString } from "class-validator"

export class updateBoardDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  favourite?: boolean
}