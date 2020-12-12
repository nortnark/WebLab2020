using CookBook.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
//using System.Web.Mvc;


namespace CookBook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeApiController : ControllerBase
    {
        BookContext db = new BookContext();
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> Get()
        {
            return await db.Recipes.ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> Get(int id)
        {
            Recipe recipe = await db.Recipes.FirstOrDefaultAsync(x => x.Id == id);
            if (recipe == null)
                return NotFound();
            return new ObjectResult(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> Post(Recipe recipe)
        {
            
            // если есть лшибки - возвращаем ошибку 400
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // если ошибок нет, сохраняем в базу данных
            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();
            return Ok(recipe);
        }

        // PUT api/users/
        [HttpPut]
        public async Task<ActionResult<Recipe>> Put(Recipe recipe)
        {
            if (recipe == null)
            {
                return BadRequest();
            }
            if (!db.Recipes.Any(x => x.Id == recipe.Id))
            {
                return NotFound();
            }

            recipe.Date = DateTime.Now;
            db.Entry(recipe).State = (System.Data.Entity.EntityState)EntityState.Modified;
            db.SaveChanges();
            await db.SaveChangesAsync();
            return Ok(recipe);
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recipe>> Delete(int id)
        {
            Recipe recipe = db.Recipes.FirstOrDefault(x => x.Id == id);
            if (recipe == null)
            {
                return NotFound();
            }
            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync();
            return Ok(recipe);
        }
    }
}