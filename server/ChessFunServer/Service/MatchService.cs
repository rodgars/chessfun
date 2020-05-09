using ChessFunServer.Infra;
using ChessFunServer.Dtos;
using ChessFunServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace ChessFunServer.Service
{
    public class MatchService : IMatchService
    {
        private readonly ICacheManager _cache;
        private readonly IMapper _mapper;

        public MatchService(ICacheManager cache, IMapper mapper)
        {
            _cache = cache;
            _mapper = mapper;
        }

        public MatchDto AddPlayerInRoom(string userName, string connectionId)
        {
            var matches = _cache.GetAllMatches();
            var matchAvailable = matches.Where(m => m.PlayerBlack == null).FirstOrDefault();

            if (matchAvailable != null)
            {
                matchAvailable.SetPlayerBlack(userName, connectionId);
                _cache.CreateMatch(matchAvailable);
            }
            else
            {
                matchAvailable = new Match(userName, connectionId);
                matches.Add(matchAvailable);
            }
            _cache.UpdateAllMatches(matches);

            return _mapper.Map<MatchDto>(matchAvailable);
        }

        public MatchDto GetMatchByKey(string key)
        {
            var match = _cache.GetMatchByKey(key);
            return _mapper.Map<MatchDto>(match);
        }

        public MatchDto AddMove(string key, string sourceMove, string targetMove)
        {
            var match = _cache.GetMatchByKey(key);

            match.Board.AddMove(sourceMove, targetMove);

            match.ChangeTurn();

            _cache.UpdateMatchByKey(key, match);

            return _mapper.Map<MatchDto>(match);
        }
    }
}
