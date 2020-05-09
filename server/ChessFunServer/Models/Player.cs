using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Player
    {
        public Player(string userName, string connectionId)
        {
            ConnectionId = connectionId;
            UserName = userName;
            SecondsRemaining = 180;
        }

        public string ConnectionId { get; set; }
        public string UserName { get; set; }
        public int SecondsRemaining { get; set; }
    }
}
