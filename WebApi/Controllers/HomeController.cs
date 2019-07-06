using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class HomeController : Controller
    {
	    public IActionResult Get()
	    {
		    return Json("Authentication passed!");
	    }
    }
}