using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyFirstMvcEfAppProject.Models
{
    public class MyFirstMvcEfAppProjectContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public MyFirstMvcEfAppProjectContext() : base("name=MyFirstMvcEfAppProjectContext")
        {
        }

        public System.Data.Entity.DbSet<MyFirstMvcEfAppProject.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<MyFirstMvcEfAppProject.Models.Vendor> Vendors { get; set; }

        public System.Data.Entity.DbSet<MyFirstMvcEfAppProject.Models.Product> Products { get; set; }

        public System.Data.Entity.DbSet<MyFirstMvcEfAppProject.Models.PurchaseRequest> PurchaseRequests { get; set; }

        public System.Data.Entity.DbSet<MyFirstMvcEfAppProject.Models.PurchaseRequestLineItem> PurchaseRequestLineItems { get; set; }

    }
}
