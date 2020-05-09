using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Dtos
{
    public class PlayerDto
    {
        public string ConnectionId { get; set; }
        public string UserName { get; set; }
        public int SecondsRemaining { get; set; }
    }

    public class PieceDto
    {
        public bool IsWhite { get; set; }
        public string Type { get; set; }
    }

    public class NotationDto
    {
        public int Turn { get; set; }
        public string WhiteCoord { get; set; }
        public string BlackCoord { get; set; }
    }

    public class BlockDto
    {
        public PieceDto Piece { get; set; }
        public string Coord { get; set; }
    }

    public class BoardDto
    {
        public BlockDto[][] State { get; set; }
        public List<NotationDto> Notations { get; set; }
    }

    public class MatchDto
    {
        public PlayerDto PlayerWhite { get; set; }
        public PlayerDto PlayerBlack { get; set; }
        public List<PlayerDto> Viewers { get; set; }
        public BoardDto Board { get; set; }
        public bool IsWhiteTurn { get; set; }
    }
}
