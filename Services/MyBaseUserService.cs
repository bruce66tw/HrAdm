using Base.Models;
using BaseWeb.Extensions;
using BaseWeb.Services;

namespace Base.Services
{
    public class MyBaseUserService : IBaseUserService
    {
        //get base user info
        public BaseUserDto GetData()
        {
            return _Web.GetSession().Get<BaseUserDto>(_Fun.BaseUser);   //extension method
        }
    }
}
