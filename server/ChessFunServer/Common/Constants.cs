using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Common
{
    public static class Constants
    {
        public static readonly int BOARD_ROWS = 8;
        public static readonly int BOARD_COLS = 8;
        public static readonly Dictionary<int, char> COORD_MAP = new Dictionary<int, char> {
            { 0, 'h' },
            { 1, 'g' },
            { 2, 'f' },
            { 3, 'e' },
            { 4, 'd' },
            { 5, 'c' },
            { 6, 'b' },
            { 7, 'a' }
        };
    }
}
