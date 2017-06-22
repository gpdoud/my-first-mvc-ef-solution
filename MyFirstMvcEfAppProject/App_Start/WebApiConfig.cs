using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyFirstMvcEfAppProject {
    public static class WebApiConfig {
        public static void Register(HttpConfiguration config) {
			// Web API configuration and services

			// enable CORS
			//config.EnableCors(new EnableCorsAttribute("http://localhost:62008", "*", "*"));
			config.EnableCors();

			// Web API routes
			config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
