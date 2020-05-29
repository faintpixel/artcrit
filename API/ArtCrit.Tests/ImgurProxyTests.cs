using ArtCrit.DAO;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;

namespace ArtCrit.Tests
{
    [TestClass]
    public class ImgurProxyTests
    {
        [TestInitialize]
        public void Initialize()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.test.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"connectionStrings.json", optional: true, reloadOnChange: true);

            var Configuration = builder.Build();

            var environment = Configuration["Environment"];
            AppSettings.MongoDBConnection = Configuration.GetConnectionString("MongoDB." + environment);
            AppSettings.ImgurClientId = Configuration.GetConnectionString("ImgurClientId");
            AppSettings.ImgurClientSecret = Configuration.GetConnectionString("ImgurClientSecret");
        }

        [TestMethod]
        public void UploadImage_ShouldUploadLink()
        {
            var dao = new ImageDAO();
            var result = dao.Upload("https://i.ytimg.com/vi/AZ2ZPmEfjvU/maxresdefault.jpg");

            Assert.IsTrue(result.Success);
        }
    }
}
