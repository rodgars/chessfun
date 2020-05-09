using AutoMapper;
using ChessFunServer.Dtos;
using ChessFunServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Infra
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Player, PlayerDto>(MemberList.Source);
            CreateMap<Piece, PieceDto>(MemberList.Source);
            CreateMap<Notation, NotationDto>(MemberList.Source);
            CreateMap<Match, MatchDto>(MemberList.Source);
            CreateMap<Board, BoardDto>(MemberList.Source);
            CreateMap<Block, BlockDto>(MemberList.Source);
        }
    }
}
