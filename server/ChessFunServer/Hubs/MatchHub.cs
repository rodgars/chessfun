using ChessFunServer.Models;
using ChessFunServer.Service;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessFunServer.Hubs
{
    public class MatchHub : Hub
    {
        private readonly IMatchService _service;

        public MatchHub(IMatchService service)
        {
            _service = service;
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public async Task AddPlayer(string userName, string connectionId)
        {
            var match = _service.AddPlayerInRoom(userName, connectionId);
            
            if(match.PlayerBlack != null)
            {
                await Clients.Client(match.PlayerBlack.ConnectionId).SendAsync("AddPlayerReceived", match);
            }

            if (match.PlayerWhite != null)
            {
                await Clients.Client(match.PlayerWhite.ConnectionId).SendAsync("AddPlayerReceived", match);
            }
        }

        public async Task GetMatchByKey(string key)
        {
            var match = _service.GetMatchByKey(key);
            await Clients.Client(GetConnectionId()).SendAsync("GetMatchByKeyReceived", match);
        }

        public async Task AddMove(string key, string sourceMove, string targetMove)
        {
            var match = _service.AddMove(key, sourceMove, targetMove);

            var ids = match.Viewers.Select(v => v.ConnectionId).ToList();
            ids.Add(match.PlayerWhite.ConnectionId);
            ids.Add(match.PlayerBlack.ConnectionId);

            foreach(var id in ids)
            {
                await Clients.Client(id).SendAsync("AddMoveReceived", match);
            }
        }
    }
}
