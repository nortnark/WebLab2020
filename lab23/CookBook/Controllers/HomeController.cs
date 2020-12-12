using CookBook.Models;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace CookBook.Controllers
{
    public class HomeController : Controller
    {
        // создаем контекст данных
        BookContext db = new BookContext();

        public ActionResult Index()
        {
            return View(db.Recipes);
        }

        public ActionResult Show(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Recipe recipe = db.Recipes.Find(id);
            if (recipe == null)
            {
                return HttpNotFound();
            }
            return View(recipe);
        }

        [HttpPost]
        public ActionResult RecipeSearch(string name)
        {
            var allrecipes = db.Recipes.Where(a => a.Author.Contains(name)).ToList();
            if (allrecipes.Count > 0)
            {
                return PartialView(allrecipes);
            }
            else
            {
                return Redirect("Index");
            }
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult WebApi()
        {
            return View();
        }


        // закроем бд
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}