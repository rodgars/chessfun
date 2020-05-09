using ChessFunServer.Dtos;

namespace ChessFunServer.Service
{
    public interface IMatchService
    {
        MatchDto AddMove(string key, string sourceMove, string targetMove);
        MatchDto AddPlayerInRoom(string userName, string connectionId);
        MatchDto GetMatchByKey(string key);
    }
}