using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MyFirstMvcEfAppProject.Models;
using Api = System.Web.Http;

namespace MyFirstMvcEfAppProject.Controllers
{
    public class ProductsController : Controller
    {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

		public ActionResult List() {
			return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
		}

		public ActionResult Get(int? id) {
			return Json(db.Products.Find(id), JsonRequestBehavior.AllowGet);
		}

		public ActionResult Remove(int? id) {
			if (id == null) {
				var rc = new Msg { Result = "Failed", Message = "No Id supplied" };
				return Json(rc, JsonRequestBehavior.AllowGet);
			}
			Product product = db.Products.Find(id);
			if (product == null) {
				return Json(new Msg { Result = "Failed", Message = $"Vendor not found for id {id}" }, JsonRequestBehavior.AllowGet);
			}
			db.Products.Remove(product);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Add([Api.FromBody] Product product) {
			if (product.Name == null)
				return new EmptyResult();
			db.Products.Add(product);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([Api.FromBody] Product aProduct) {
			if (aProduct.ID == 0)
				return Json(new Msg { Result = "Failure", Message = "aVendor is empty" }, JsonRequestBehavior.AllowGet);
			Product product = db.Products.Find(aProduct.ID);
			product.UpdateAllProperties(aProduct);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
		}

		// GET: Products
		public ActionResult Index()
        {
            return View(db.Products.ToList());
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }
		
        // GET: Products/Create
        public ActionResult Create()
        {
			ProductEditView pev = new ProductEditView {
				Vendors = db.Vendors.ToList()
			};
            return View(pev);
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,VendorId,Name,VendorPartNumber,Price,Unit,PhotoPath")] ProductEditView pev)
        {
			Product product = new Product {
				ID = pev.ID,
				VendorId = pev.VendorId,
				Name = pev.Name,
				VendorPartNumber = pev.VendorPartNumber,
				Price = pev.Price,
				Unit = pev.Unit,
				PhotoPath = pev.PhotoPath
			};
			if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
			ProductEditView pev = new ProductEditView {
				ID = product.ID,
				Name = product.Name,
				VendorPartNumber = product.VendorPartNumber,
				Price = product.Price,
				Unit = product.Unit,
				PhotoPath = product.PhotoPath,
				VendorId = product.VendorId,
				Vendors = db.Vendors.ToList()
			};
			return View(pev);
            //return View(product);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable	the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,VendorId,Name,VendorPartNumber,Price,Unit,PhotoPath")] ProductEditView pev)
        {
			Product product = new Product {
				ID = pev.ID,
				VendorId = pev.VendorId,
				Name = pev.Name,
				VendorPartNumber = pev.VendorPartNumber,
				Price = pev.Price,
				Unit = pev.Unit,
				PhotoPath = pev.PhotoPath
			};
			if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
