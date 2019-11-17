using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    public class ArticleManager
    {

        List<Article> _articles = new List<Article>();
        string connectionString = "mongodb://127.0.0.1:27017";
        public ArticleManager()
        {
            try
            {
                List<Article> ArticleList = new List<Article>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase Article = server.GetDatabase("Article");

                MongoCollection<Article> articles =
                    Article.GetCollection<Article>("Article");
                foreach (Article p in articles.FindAll())
                {
                    ArticleList.Add(p);
                }

                _articles = ArticleList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public IEnumerable<Article> GetAll { get { return _articles; } }
        public IEnumerable<Article> GetArticleById(int id)
        {
            try
            {
                IEnumerable<Article> temp = _articles.Where(_ => _.ArticleId.Equals(id)).ToList();
                return temp;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Article> GetArticleByEmail(string email)
        {
            try
            {
                return _articles.Where(_ => _.Creator.Email.Equals(email)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Article> GetArticleByEmail(string email, string category)
        {
            try
            {
                return _articles.Where(_ => _.Creator.Email.Equals(email) && _.Categories.Contains(category)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Article> GetArticleByCategory(string category)
        {
            try
            {
                return _articles.Where(_ => _.Categories.Contains(category)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public void AddArticle(Article p)
        {
            try
            {
                List<Article> personList = new List<Article>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase article = server.GetDatabase("Article");
                MongoCollection<BsonDocument> articleData =
                    article.GetCollection<BsonDocument>("Article");
                BsonDocument personBson = new BsonDocument { p.ToBsonDocument() };
                articleData.Insert(personBson);
                _articles.Add(p);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception" + ex);
            }
        }

        //Should write this edited to the Mongo Databse
        public bool EditArticle(Article s)
        {
            try
            {
                var _s = _articles.FirstOrDefault(o => o.ArticleId.Equals(s.ArticleId));
                if (_s == null)
                    return false;
                _s.Categories = s.Categories;
                _s.Comments = s.Comments;
                _s.Content = s.Content;
                _s.Creator = s.Creator;
                _s.FavouritedBy = s.FavouritedBy;
                _s.Good = s.Good;
                _s.PatentStatus = s.PatentStatus;
                _s.Poor = s.Poor;
                _s.Title = s.Title;
                _s.Amazing = s.Amazing;
                _s.Image = s.Image;
                DeleteArticle(_s.ArticleId);
                AddArticle(_s);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }


        public void DeleteArticle(int id)
        {
            try
            {
                var conString = "mongodb://localhost:27017";
                var Client = new MongoClient(conString);
                var DB = Client.GetDatabase("Article");
                var collection = DB.GetCollection<BsonDocument>("Article");

                //deleting single record
                var Deleteone = collection.DeleteOneAsync(
                                Builders<BsonDocument>.Filter.Eq("ArticleId", id));

                //deleting multiple record
                //var DelMultiple =  collection.DeleteManyAsync(
                //                 Builders<BsonDocument>.Filter.Lt("EventId", 1000));

                //retrieve's data
                //collection.Find(new BsonDocument())
                //.ForEachAsync(x => Console.WriteLine(x));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }


    }
}
