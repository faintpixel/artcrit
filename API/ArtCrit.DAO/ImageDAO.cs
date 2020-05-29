using ArtCrit.DAO.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArtCrit.DAO
{
    public class ImageDAO
    {
        private ImgurProxy _imgur;

        public ImageDAO()
        {
            _imgur = new ImgurProxy();
        }

        public Result<Image> Upload(string url)
        {
            var result = _imgur.UploadImage(url);
            return ProcessImgurUploadResults(result);
        }

        public Result<Image> Upload(IFormFile file)
        {
            var result = _imgur.UploadImage(file);
            return ProcessImgurUploadResults(result);
        }

        private Result<Image> ProcessImgurUploadResults(Result<Image> result)
        {
            if (result.Success)
            {
                // TO DO - upload to database
            }

            return result;
        }
    }
}
