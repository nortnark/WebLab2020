using System;

namespace CookBook.Models
{
    public class Recipe
    {
        // ID рецепта
        public int Id { get; set; }
        // название рецепта
        public string Title { get; set; }
        // автор рецепта
        public string Author { set; get; }
        // аннотация к рецепту
        public string RecipeDesc { get; set; }
        // изображение
        public string Img { get; set; }
        // текст рецепта
        public string Content { get; set; }
        // категория
        public virtual Category Category { set; get; }
        // дата загрузки
        public DateTime Date { get; set; }
    }
}