using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Match
    {
        public Match(string userName, string connectionId)
        {
            PlayerWhite = new Player(userName, connectionId);
            Viewers = new List<Player>();
            Board = new Board();
            IsWhiteTurn = true;
        }

        public Player PlayerWhite { get; set; }
        public Player PlayerBlack { get; set; }
        public List<Player> Viewers { get; set; }
        public Board Board { get; set; }
        public DateTime LastMove { get; set; }
        public bool IsWhiteTurn { get; set; }

        public void SetPlayerBlack(string userName, string connectionId)
        {
            PlayerBlack = new Player(userName, connectionId);
            LastMove = DateTime.Now;
        }

        public void ChangeTurn()
        {
            var now = DateTime.Now;
            var diff = (now - LastMove).Seconds;

            if (IsWhiteTurn)
            {
                PlayerWhite.SecondsRemaining -= diff;
            }
            else
            {
                PlayerBlack.SecondsRemaining -= diff;
            }

            LastMove = now;
            IsWhiteTurn = !IsWhiteTurn;
        }
    }
}
