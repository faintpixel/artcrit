using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArtCrit.DAO.Models
{
    public class Image
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string URL { get; set; }
        public DateTime UploadDate { get; set; }
        public string UploadUser { get; set; }
        public ImgurData ImgurData { get; set; }

        public Image()
        {
            ImgurData = new ImgurData();
        }
    }
}
