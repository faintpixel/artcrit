using ArtCrit.DAO.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ArtCrit.DAO
{
    public class ImgurProxy
    {
        private RestClient _client;

        public ImgurProxy()
        {
            _client = new RestClient();
        }

        public Result<Image> UploadImage(string url)
        {
            var parameters = new List<Parameter>();
            parameters.Add(new Parameter("image", url, ParameterType.RequestBody));
            parameters.Add(new Parameter("type", "URL", ParameterType.RequestBody));

            return PerformUpload(parameters);
        }

        public Result<Image> UploadImage(IFormFile file)
        {
            var parameters = new List<Parameter>();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string base64 = Convert.ToBase64String(fileBytes);
                parameters.Add(new Parameter("image", base64, ParameterType.RequestBody));                
            }
            parameters.Add(new Parameter("type", "base64 ", ParameterType.RequestBody));

            return PerformUpload(parameters);
        }

        private Result<Image> PerformUpload(List<Parameter> parameters)
        {
            var result = new Result<Image>();
            try
            {
                var url = "https://api.imgur.com/3/image";
                var request = new RestRequest(url);
                request.Method = Method.POST;
                request.AddHeader("Authorization", "Client-ID " + AppSettings.ImgurClientId);

                request.Parameters.AddRange(parameters);
                                
                //request.AddParameter("name", "test.jpg", ParameterType.RequestBody);
                //request.AddParameter("title", "image title", ParameterType.RequestBody);
                //request.AddParameter("description", "image description", ParameterType.RequestBody);

                var response = _client.Execute(request);
                if (response.IsSuccessful)
                {
                    dynamic data = JObject.Parse(response.Content);
                    var success = bool.Parse((string)data.success);
                    if (success && data.data is JObject)
                    {
                        result.Success = true;
                        result.Message = "Image successfully uploaded";
                        result.Data = new Image();
                        result.Data.ImgurData.Id = data.data.id;
                        result.Data.ImgurData.DeleteHash = data.data.deletehash;
                        result.Data.UploadDate = DateTime.Now;
                        result.Data.UploadUser = "";
                        result.Data.URL = data.data.link;
                    }
                    else
                        throw new Exception("Couldn't upload image. Imgur API call failed: " + data);
                }
                else
                    throw new Exception("Couldn't upload image. Error from imgur API: " + response.StatusCode + " - " + response.StatusDescription);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        
    }
}
