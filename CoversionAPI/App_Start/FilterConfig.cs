using System.Web;
using System.Web.Mvc;

namespace CoversionAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //config.Services.Remove(typeof(IFilterProvider), defaultprovider);

            filters.Add(new HandleErrorAttribute());
        }
    }
}
