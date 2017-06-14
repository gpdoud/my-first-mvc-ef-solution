using MyFirstMvcEfAppProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFirstMvcEfAppProject.Controllers {
    public class UsersApiController : ApiController {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

        // GET api/<controller>
        public IEnumerable<User> Get() {
            return db.Users.ToList();
        }

        // GET api/<controller>/5
        public string Get(int id) {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value) {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value) {
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
        }
    }
}