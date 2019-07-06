using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Configuration.Auth.Models;

namespace WebApi.Configuration.Auth
{
    public static class StartupAuth
    {
        public static void AddAzureAdB2C(this IServiceCollection services, AzureAdConfiguration configuration)
        {
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(jwtOptions =>
            {
                jwtOptions.Audience = configuration.ClientId;
                jwtOptions.MetadataAddress = configuration.MetadataEndpoint;
            });
        }
	}
}
