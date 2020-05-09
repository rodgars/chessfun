using ChessFunServer.Models;
using System.Collections.Generic;

namespace ChessFunServer.Infra
{
    public interface ICacheManager
    {
        void CreateMatch(Match match);
        List<Match> GetAllMatches();
        Match GetMatchByKey(string key);
        void UpdateAllMatches(List<Match> matches);
        void UpdateMatchByKey(string key, Match match);
    }
}