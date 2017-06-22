using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace MyFirstMvcEfAppProject.Models {

    public class User {

        public int ID { get; set; }
        [Required]
        [MaxLength(20)]
        [Index("UserNameUniqueIndex", IsUnique = true)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(10)]
        public string Password { get; set; } // 10
        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; } // 20
        [Required]
        [MaxLength(20)]
        public string LastName { get; set; } // 20
        [MaxLength(12)]
        public string Phone { get; set; } // 12
        [Required]
        [MaxLength(75)]
        public string Email { get; set; } // 75
        public bool IsReviewer { get; set; }
        public bool IsAdmin { get; set; }

		public void UpdateAllProperties(User user) {
			this.UserName = user.UserName;
			this.Password = user.Password;
			this.FirstName = user.FirstName;
			this.LastName = user.LastName;
			this.Phone = user.Phone;
			this.Email = user.Email;
			this.IsReviewer = user.IsReviewer;
			this.IsAdmin = user.IsAdmin;
		}
    }
}