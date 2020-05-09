import { PieceDto } from './piece';

export interface BlockDto {
    piece: PieceDto;
    coord: string;
    isSelected: boolean;
}