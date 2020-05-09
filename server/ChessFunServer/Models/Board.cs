using ChessFunServer.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Models
{
    public class Board
    {
        public Board()
        {
            State = new Block[Constants.BOARD_ROWS][];
            Notations = new List<Notation>();
            InitializeBoardState();
        }

        public Block[][] State { get; set; }
        public List<Notation> Notations { get; set; }

        private void InitializeBoardState()
        {
            for(var row = 0; row < Constants.BOARD_ROWS; row++)
            {
                State[row] = new Block[Constants.BOARD_COLS];

                for(var col = 0; col < Constants.BOARD_COLS; col++)
                {
                    State[row][col] = new Block(row, col);
                }
            }        
        }

        public void AddMove(string source, string target)
        {
            if(IsMoveValid(source, target))
            {
                AddNotation(source, target);
                UpdateBoard(source, target);
            }
        }

        private void AddNotation(string source, string target)
        {
            var notation = Notations.Where(n => string.IsNullOrEmpty(n.BlockCoord)).FirstOrDefault();

            if (notation != null)
            {
                notation.BlockCoord = target;
            }
            else
            {
                var turn = Notations.Count() + 1;
                var newNotation = new Notation
                {
                    Turn = turn,
                    WhiteCoord = target
                };
                Notations.Add(newNotation);
            }
        }

        private void UpdateBoard(string source, string target)
        {
            var blockSource = State[GetRowCoord(source)][GetColCoord(source)];
            var targetSource = State[GetRowCoord(target)][GetColCoord(target)];
            
            if(blockSource.Piece != null)
            {
                targetSource.Piece = blockSource.Piece;
                blockSource.Piece = null;
            }
        }

        private bool IsMoveValid(string source, string target)
        {
            // TO DO
            return true;
        }

        private int GetColCoord(string coord)
        {
            char val = coord[0];
            return Constants.COORD_MAP.FirstOrDefault(x => x.Value.Equals(val)).Key;
        }

        private int GetRowCoord(string coord)
        {
            int val = int.Parse(coord[1].ToString());
            return Constants.BOARD_ROWS - val;
        }
    }
}
