using ChessFunServer.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Infra
{
    public class CacheManager : ICacheManager
    {
        private readonly IMemoryCache _cache;

        public CacheManager(IMemoryCache cache)
        {
            _cache = cache;
        }

        public List<Match> GetAllMatches()
        {
            var matches = _cache.Get<List<Match>>("matches");

            if (matches == null) return new List<Match>();

            return matches;
        }

        public void UpdateAllMatches(List<Match> matches)
        {
            var cacheEntryoption = new MemoryCacheEntryOptions().SetAbsoluteExpiration(DateTimeOffset.Now.AddMinutes(6));
            _cache.Set("matches", matches, cacheEntryoption);
        }

        public Match GetMatchByKey(string key)
        {
            return _cache.Get<Match>(key);
        }

        public void UpdateMatchByKey(string key, Match match)
        {
            var cacheEntryoption = new MemoryCacheEntryOptions().SetAbsoluteExpiration(DateTimeOffset.Now.AddMinutes(6));
            _cache.Set(key, match, cacheEntryoption);
        }

        public void CreateMatch(Match match)
        {
            var key = $"{match.PlayerWhite.ConnectionId}_{match.PlayerBlack.ConnectionId}";
            var cacheEntryoption = new MemoryCacheEntryOptions().SetAbsoluteExpiration(DateTimeOffset.Now.AddMinutes(6));
            _cache.Set(key, match, cacheEntryoption);
        }
    }
}
