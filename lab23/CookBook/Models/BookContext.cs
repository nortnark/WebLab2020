using System.Data.Entity;

namespace CookBook.Models
{
    public class BookContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Author> Authors { get; set; }
    }
}