using System.Collections.Generic;

namespace CookBook.Models
{
    public class Category
    {
        // ID категории
        public int Id { get; set; }
        // название категории
        public string Name { get; set; }
        // описание категории
        public string Desc { get; set; }
        // список рецептов из категории
        public List<Recipe> RecipesList { set; get; }
    }
}