using System.Text.Json.Serialization;

namespace ReactAuthorization.Data
{
    public class BookMark
    {
        
        public int Id { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }
        public int UserId { get; set; }
        public List<User>Users { get; set; }

    }
}