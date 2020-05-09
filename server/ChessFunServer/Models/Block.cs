using ChessFunServer.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Block
    {
        public Block(int row, int col)
        {
            Piece = GetPiece(row, col);
            Coord = GetCoord(row, col);
        }

        public Piece Piece { get; set; }
        public string Coord { get; set; }


        private Piece GetPiece(int row, int col)
        {
            if(row == 0 || row == 1 || row == 6 || row == 7)
            {
                var isWhite = (row == 6 || row == 7) ? true : false;

                var type = "P";

                if (row == 0 || row == 7)
                {
                    if (col == 0 || col == 7) type = "R";
                    else if (col == 1 || col == 6) type = "N";
                    else if (col == 2 || col == 5) type = "B";
                    else if (col == 3) type = "Q";
                    else type = "K";
                }

                return new Piece(type, isWhite);
            }

            return null;
        }

        private string GetCoord(int row, int col)
        {
            return $"{Constants.COORD_MAP[col]}{(Constants.BOARD_ROWS - row)}"; 
        }
    }
}
