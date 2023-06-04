using System.Text.Json.Serialization;

namespace ReactAuthorization.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<BookMark> BookMarks { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }

    }
}