using ArtCrit.DAO.Models;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArtCrit.DAO
{
    public class ImageDAO
    {
        private ImgurProxy _imgur;
        private MongoClient _mongoClient;
        private IMongoDatabase _db;
        private IMongoCollection<Image> _collection;

        public ImageDAO()
        {
            _imgur = new ImgurProxy();
            _mongoClient = new MongoClient(AppSettings.MongoDBConnection);
            _db = _mongoClient.GetDatabase("artcrit");
            _collection = _db.GetCollection<Image>("images");
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
                result.Data.UploadUser = "Unknown"; // TO DO - get current user

                try
                {
                    _collection.InsertOne(result.Data);
                }
                catch(Exception ex)
                {
                    result.Success = false;
                    result.Message = "Error saving image info to database: " + ex.Message;
                }
            }

            return result;
        }
    }
}
