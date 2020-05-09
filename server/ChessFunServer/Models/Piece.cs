using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Piece
    {
        public Piece(string type, bool isWhite)
        {
            IsWhite = isWhite;
            Type = type;
        }

        public bool IsWhite { get; set; }
        public string Type { get; set; } 

    }
}
