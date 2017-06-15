namespace MyFirstMvcEfAppProject.Migrations
{
    using MyFirstMvcEfAppProject.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyFirstMvcEfAppProject.Models.MyFirstMvcEfAppProjectContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MyFirstMvcEfAppProject.Models.MyFirstMvcEfAppProjectContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Users.AddOrUpdate(
                u => u.ID,
                new User { UserName="Greg",Password="password",FirstName="Greg",LastName="Doud",
                            Email="gdoud@maxtrain.com",Phone="513-555-1212",IsAdmin=true,IsReviewer=false }
            );
            context.SaveChanges();
        }
    }
}
