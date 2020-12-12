using System.Collections.Generic;

namespace CookBook.Models
{
    public class Author
    {
        // ID автора
        public int Id { get; set; }
        // имя автора
        public string AuthorName { get; set; }
        // список рецептов автора
        public List<Recipe> RecipesList { set; get; }
    }
}