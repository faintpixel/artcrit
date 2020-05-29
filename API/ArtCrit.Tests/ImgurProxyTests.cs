using ArtCrit.DAO;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ArtCrit.Tests
{
    [TestClass]
    public class ImgurProxyTests
    {

        [TestMethod]
        public void UploadImage_ShouldUploadLink()
        {
            var dao = new ImageDAO();
            var result = dao.Upload("https://i.ytimg.com/vi/AZ2ZPmEfjvU/maxresdefault.jpg");

            Assert.IsTrue(result.Success);
        }
    }
}
