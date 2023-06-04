using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactAuthorization.Data;
using ReactAuthorization.Web.Models;

namespace ReactAuthorization.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private string _connectionString;

        public AuthController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(BookMark bm)
        {
            var repo = new AuthRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            bm.UserId = user.Id;
            repo.AddBookmark(bm);
        }
        [HttpGet]
        [Route("getMyBookmarks")]
        public List<BookMark> GetMyBookmarks()
        {
            var repo = new AuthRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return repo.GetMyBookmarks(user.Id);
        }
        [HttpPost]
        [Route("deleteBookmark")]
        public void Delete(BookMark bookmark)
        {
            var repo = new AuthRepository(_connectionString);
            repo.DeleteBookmarks(bookmark.Id);
        }
        [HttpPost]
        [Route("updateBookmark")]
        public void Update(BookmarkViewModel vm)
        {
            var repo = new AuthRepository(_connectionString);
            repo.UpdateBookmark(vm.Id, vm.Title);
        }
        [HttpGet]
        [Route("getTopfive")]
        public List<Object> getBookmarks()
        {
            var repo = new AuthRepository(_connectionString);
            var bookmarks = repo.GetTop5URLsWithUserCount();
            return bookmarks;
        }

    }

}
