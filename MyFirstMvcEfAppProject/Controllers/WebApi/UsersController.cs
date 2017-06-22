using MyFirstMvcEfAppProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFirstMvcEfAppProject.Controllers.WebApi {
    public class UsersController : ApiController {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

        // GET api/<controller>
        public IEnumerable<User> Get() {
            return db.Users.ToList();
        }

        // GET api/<controller>/5
        public User Get(int id) {
			return db.Users.Find(id);
        }

		// POST api/<controller> (Update)
		[AcceptVerbs("POST")]
		public void Post([FromBody] User user) {
			User user2 = Get(user.ID);
			user2.UpdateAllProperties(user);
			db.SaveChanges();
        }

        // PUT api/<controller> (Insert)
        public void Put([FromBody] User user) {
			db.Users.Add(user);
			db.SaveChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
			User user = Get(id);
			db.Users.Remove(user);
			db.SaveChanges();
        }
    }
}