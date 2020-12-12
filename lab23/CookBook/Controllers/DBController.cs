using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CookBook.Controllers
{
    public class DBController : Controller
    {
        BookContext db = new BookContext();
   
        public ActionResult Index()
        {
            return View();
        }
        // Создание новой записи
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Recipe recipe)
        {
            //if (recipe.Img != null)
            //{
            //    byte[] imageData = null;
            //    // считываем переданный файл в массив байтов
            //    using (var binaryReader = new BinaryReader(recipe.Img.OpenReadStream()))
            //    {
            //        imageData = binaryReader.ReadBytes((int)recipe.Img.Length);
            //    }
            //    // установка массива байтов
            //    recipe.Img = imageData;
            //}
            recipe.Date = DateTime.Now;
            db.Recipes.Add(recipe);
            db.SaveChanges();

            return Redirect("/Home/Index");
        }
        // Удаление записи
        [HttpGet]
        public ActionResult Delete(int id)
        {
            Recipe recipe = db.Recipes.Find(id);
            if (recipe == null)
            {
                return HttpNotFound();
            }
            return View(recipe);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Recipe recipes = db.Recipes.Find(id);
            if (recipes == null)
            {
                return HttpNotFound();
            }
            db.Recipes.Remove(recipes);
            db.SaveChanges();
            return Redirect("/Home/Index");
        }
        //Изменение записи
        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Recipe recipe = db.Recipes.Find(id);
            if (recipe != null)
            {
                return View(recipe);
            }
            return HttpNotFound();
        }
        [HttpPost]
        public ActionResult Edit(Recipe recipe)
        {
            recipe.Date = DateTime.Now;
            db.Entry(recipe).State = EntityState.Modified;
            db.SaveChanges();
            return Redirect("/Home/Index");
        }
    }
}