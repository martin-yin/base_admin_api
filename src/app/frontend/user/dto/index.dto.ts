import { IsNumber, IsString } from "class-validator";

export class FavoriteDto {
    @IsString({
        message: '类型不能为空',
    })
    type: string;

    @IsNumber()
    id: number
}
