using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Notation
    {
        public int Turn { get; set; }
        public string WhiteCoord { get; set; }
        public string BlockCoord { get; set; }
    }
}
