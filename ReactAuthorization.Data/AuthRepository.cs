using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Numerics;
using System;

namespace ReactAuthorization.Data
{
    public class AuthRepository
    {
        public string _connectionString { get; set; }

        public AuthRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(BookMark bm)
        {
            using var context = new AuthDemoDataContext(_connectionString);
            context.BookMarks.Add(bm);
            context.SaveChanges();
        }
        public User GetByEmail(string email)
        {
            using var context = new AuthDemoDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public List<BookMark> GetMyBookmarks(int userId)
        {
            using var context = new AuthDemoDataContext(_connectionString);
            return context.BookMarks.Where(b => b.UserId == userId).ToList();
        }
        public void DeleteBookmarks(int bookmarkId)
        {
            using var context = new AuthDemoDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from BookMarks where Id = {bookmarkId}");
        }
        public void UpdateBookmark(int id, string title)
        {
            using var context = new AuthDemoDataContext(_connectionString);
            var bookmark = context.BookMarks.FirstOrDefault(b => b.Id == id);
            bookmark.Title = title;
            context.BookMarks.Update(bookmark);
            context.SaveChanges();
        }
        public List<object> GetTop5URLsWithUserCount()
        {
            using (var context = new AuthDemoDataContext(_connectionString))
            {
                var top5URLsWithUserCount = context.BookMarks
                    .GroupBy(b => b.URL)
                    .OrderByDescending(g => g.Count()) 
                    .Take(5)
                    .Select(g => new { URL = g.Key, UserCount = g.Count() })
                    .ToList();

                return top5URLsWithUserCount.Cast<object>().ToList();
            }
        }
  
    }
}


